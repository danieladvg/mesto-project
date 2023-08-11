import './pages/index.css';

import { 
    profileName,
    profileDescription,
    profileEditButton,
    avatarImage,
    avatarEditButton,
    formElementUpdateAvatar,
    formElementEditProfile,
    nameInput,
    jobInput,
    buttonAddCard,
    formElementAddCard,
    validationConfig
} from './utils/constants.js';

import { Api } from './components/Api.js';
import { Card } from './components/card.js';
import { Section } from './components/Section.js';
import { PopupWithImage } from './components/PopupWithImage.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { UserInfo } from './components/UserInfo';
import { FormValidator } from './components/FormValidator';


let userId;
let cardList;

//получение страницы (данные пользователя + карточки)
function getPage () {
    const profileInfo = api.fetchGetProfileInfo();
    const cards = api.fetchGetCards();
    Promise.all([profileInfo, cards])
    .then(([userData, cards]) => {
        userInfo.setUserInfo({
            name: userData.name,
            about: userData.about
        })
        userInfo.setAvatar(userData.avatar);
        userId = userData._id;
        cardList = new Section({
            items: cards, 
            renderer: (card) => {
                cardList.addItem(addNewCard(card));
            }
            }
            , '.elements-container'
        );
        cardList.renderItems();
    })
    .catch((error) => {
        console.error(error);
    })
}


const api = new Api({
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-26',
    headers: {
        authorization: 'd48850ee-0174-40ac-94a8-4573c8ed93c1',
        'Content-Type': 'application/json'
    }
});

getPage();


const userInfo = new UserInfo(profileName, profileDescription, avatarImage, editProfileInfo, editAvatar);

const popupUpdateAvatar = new PopupWithForm('.popup_type_update-avatar', handleUpdateAvatarFormSubmit);
popupUpdateAvatar.setEventListeners();
const popupEditProfile = new PopupWithForm('.popup_type_editProfile', handleProfileFormSubmit);
popupEditProfile.setEventListeners();
const popupAddCard = new PopupWithForm('.popup_type_addCard', handleAddCardFormSubmit);
popupAddCard.setEventListeners();
const popupImagePreview = new PopupWithImage('.popup_type_image-preview');
popupImagePreview.setEventListeners();

function addNewCard(card) {
    const cardNew = new Card(card, userId, '#cardTemplate', openImagePreview, likeCard, deleteCard);
    const element = cardNew.generate();
    return element;
}
function likeCard(cardId, isUnlike) {
    let result;
    if (isUnlike) {
        result = api.fetchUnlikeCard(cardId);
    } else {   
        result = api.fetchLikeCard(cardId);
    }
    return result;
}

function deleteCard(cardId) {
    let result;
    result = api.fetchDeleteCard(this._cardId);
    return result;
}

//функция сохранить (отправить) обновленный аватар
function handleUpdateAvatarFormSubmit (formValues) {
    return userInfo.setAvatar(formValues['update-avatar']);
};

function editProfileInfo(data) {
    return api.fetchEditProfileInfo(data);
}

function editAvatar(data) {
    return api.fetchEditAvatar(data);
}

//функция сохранить (отправить) инфо профиля
function handleProfileFormSubmit (formValues) {
    return userInfo.setUserInfo({name: formValues['profile-name'], about: formValues['profile-description']});
};

//добавление новой карточки 
function handleAddCardFormSubmit (formValues) {
    const item = {
        name: formValues['card-name'],
        link: formValues['card-url'],
        owner: {
            _id: userId
        },
        likes: []
    }

    return api.fetchPostCard(item)
        .then((res) => {
            cardList.addItem(addNewCard(res));
            popupAddCard.close();    
            })
        .catch((error) => {
            console.error(error);
        })
}

function openImagePreview(data) {
    popupImagePreview.open(data);
}

//открытие модального окна (редактировать профиль)
profileEditButton.addEventListener('click', function () {
    popupEditProfile.open();
    const {name, about} = userInfo.getUserInfo();
    nameInput.value = name;
    jobInput.value = about;
});

//открытие модального окна (обновить аватар)
avatarEditButton.addEventListener('click', function () {
    popupUpdateAvatar.open();
});

//открытие модального окна (добавить карточку)
buttonAddCard.addEventListener('click', function () {
    popupAddCard.open();
})

const updateAvatarValidator = new FormValidator(validationConfig, formElementUpdateAvatar);
updateAvatarValidator.enableValidation();

const editProfileValidator = new FormValidator(validationConfig, formElementEditProfile);
editProfileValidator.enableValidation();

const addCardValidator = new FormValidator(validationConfig, formElementAddCard);
addCardValidator.enableValidation();