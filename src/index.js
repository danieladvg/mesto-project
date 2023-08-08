import './pages/index.css';

import {sectionProfile,
    profileName,
    profileDescription,
    profileEditButton,
    avatarImage,
    avatarEditButton,
    // popupUpdateAvatar,
    formElementUpdateAvatar,
    avatarUrlInput,
    buttonSaveAvatar,
    // popupEditProfile,
    formElementEditProfile,
    nameInput,
    jobInput,
    buttonSaveProfileInfo,
    // popupAddCard,
    buttonAddCard,
    cardNameInput,
    cardUrlInput,
    formElementAddCard,
    buttonCreateCard,
    elementsContainer,
    cardTemplate,
    // popupImagePreview,
    bigImageName,
    imageUrl,
    formElement,
    inputElement,
    saveButton,
    validationConfig
} from './utils/constants.js';

import{enableValidation, handleSubmitButton} from './components/FormValidator.js'
// import{openPopup, closePopup} from './components/modal.js';
// import{renderCards, createCard} from './components/card.js';
// import{initialCards} from './components/cards.js'

// import {fetchPostCard, fetchEditProfileInfo, fetchEditAvatar, fetchGetProfileInfo, fetchGetCards} from './components/api.js';
import { Api } from './components/Api.js';
import { Card } from './components/card.js';
import { Section } from './components/Section.js';
import { Popup } from './components/Popup.js';
import { PopupWithImage } from './components/PopupWithImage.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { UserInfo } from './components/UserInfo';
import { FormValidator } from './components/FormValidator';

// import { toggleSaveButtonText } from './components/utils';
// import { forEach } from 'core-js/core/array';

let userId;

//получение страницы (данные пользователя + карточки)
function getPage () {
    const profileInfo = api.fetchGetProfileInfo();
    const cards = api.fetchGetCards();
    Promise.all([profileInfo, cards])
    .then(([userData, cards]) => {
        userInfo.setUserInfo({
            profileName: userData.name,
            profileDescription: userData.about
        })
        // profileName.textContent = userData.name;
        // profileDescription.textContent = userData.about;
        avatarImage.src = userData.avatar;
        userId = userData._id;
        const cardList = new Section({
            items: cards, 
            renderer: (card) => {
                const cardNew = new Card(card, userId, '#cardTemplate', openImagePreview, likeCard, deleteCard);
                const element = cardNew.generate();
                cardList.addItem(element);
            }
            }, '.elements-container');
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


const userInfo = new UserInfo(profileName, profileDescription);

const popupUpdateAvatar = new PopupWithForm('.popup_type_update-avatar', handleUpdateAvatarFormSubmit);
const popupEditProfile = new PopupWithForm('.popup_type_editProfile', handleProfileFormSubmit);
const popupAddCard = new PopupWithForm('.popup_type_addCard', handleAddCardFormSubmit);
const popupImagePreview = new PopupWithImage('.popup_type_image-preview');

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
    // evt.preventDefault();
    // toggleSaveButtonText(buttonSaveAvatar, true);

    api.fetchEditAvatar(formValues['update-avatar'])
    .then((data) => {
        avatarImage.src = data.avatar;
        // avatarImage.src = avatarUrlInput.value;
        // formElementUpdateAvatar.reset();
        // handleSubmitButton(buttonSaveAvatar);
        // closePopup(popupUpdateAvatar);
        popupUpdateAvatar.close();
    })
    .catch((error) => {
        console.error(error);
    })
    // .finally(() => {
    //     toggleSaveButtonText(buttonSaveAvatar, false);
    // })
    
};

//функция сохранить (отправить) инфо профиля
function handleProfileFormSubmit (formValues) {
    // evt.preventDefault();
    // const button = evt.submitter;
    // toggleSaveButtonText(button, true);

    api.fetchEditProfileInfo({name: formValues['profile-name'], about: formValues['profile-description']})
    .then((res) => {
        // userInfo.setUserInfo(formValues);

        profileName.textContent = formValues['profile-name'];
        profileDescription.textContent = formValues['profile-description'];

        // handleSubmitButton(buttonSaveProfileInfo);
        // closePopup(popupEditProfile);
        popupEditProfile.close();
    })
    .catch((error) => {
        console.error(error);
    })
    // .finally(() => {
    //     toggleSaveButtonText(buttonSaveProfileInfo, false);
    // })
};

// initialCards.forEach(function(item) {
//     addCard(item, elementsContainer);
// });

//добавление новой карточки 
function handleAddCardFormSubmit (formValues) {
    // evt.preventDefault();
    // const button = evt.submitter;

    const item = {
        name: formValues['card-name'],
        link: formValues['card-url'],
        owner: {
            _id: userId
        },
        likes: []
    }
    // toggleSaveButtonText(button, true);

    api.fetchPostCard(item)
    .then((res) => {
        const cardList = new Section({
            items: [res], 
            renderer: (card) => {
                const cardNew = new Card(card, userId, '#cardTemplate', {openImagePreview, likeCard, deleteCard});
                const element = cardNew.generate();
                cardList.addItem(element);
            }
            }
            , '.elements-container');
        cardList.renderItems();
        // handleSubmitButton(buttonCreateCard);
        // closePopup(popupAddCard);
        popupAddCard.close();    
        })
    .catch((error) => {
        console.error(error);
    })
    // .finally(() => {
    //     toggleSaveButtonText(button, false);
    // })
}

function openImagePreview(data) {
    popupImagePreview.open(data);

    // bigImageName.textContent = data.name;
    // imageUrl.src = data.link;
    // imageUrl.alt = data.name;
    
    // openPopup(popupImagePreview);
}


//открытие модального окна (редактировать профиль)
profileEditButton.addEventListener('click', function () {
    // openPopup(popupEditProfile);
    popupEditProfile.open();
    const {name, about} = userInfo.getUserInfo();
    nameInput.value = name;
    jobInput.value = about;
});

//открытие модального окна (обновить аватар)
avatarEditButton.addEventListener('click', function () {
    // openPopup(popupUpdateAvatar);
    popupUpdateAvatar.open();
});

//открытие модального окна (добавить карточку)
buttonAddCard.addEventListener('click', function () {
    // openPopup(popupAddCard);
    popupAddCard.open();
})


const updateAvatarValidator = new FormValidator(validationConfig, formElementUpdateAvatar);
updateAvatarValidator.enableValidation();

// const editProfileValidator = new FormValidator(validationConfig, formElementEditProfile);
// editProfileValidator.enableValidation();

// const addCardValidator = new FormValidator(validationConfig, formElementAddCard);
// addCardValidator.enableValidation();



//слушатель на форме редактировать профиль
// formElementEditProfile.addEventListener('submit', handleProfileFormSubmit);

//слушатель на форме добавления карточки
// formElementAddCard.addEventListener('submit', handleAddCardFormSubmit);

//слушатель на форме обновления аватара
// formElementUpdateAvatar.addEventListener('submit', handleUpdateAvatarFormSubmit);

//вызов функции валидации форм
// enableValidation(validationConfig);