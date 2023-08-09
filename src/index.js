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

import {fetchPostCard, fetchEditProfileInfo, fetchEditAvatar, fetchGetProfileInfo, fetchGetCards} from './components/api.js';
import { toggleSaveButtonText } from './components/utils';

export const sectionProfile = document.querySelector('.profile'); //секция profile
export const profileName = sectionProfile.querySelector('.profile__name'); //имя профиля
export const profileDescription = sectionProfile.querySelector('.profile__description'); //информация о себе
export const profileEditButton = sectionProfile.querySelector('.profile__edit-button'); //кнопка редактирования профиля
export const avatarImage = sectionProfile.querySelector('.profile__avatar-image'); //аватар тег img
export const avatarEditButton = sectionProfile.querySelector('.profile__edit-avatar-button'); //кнопка редактирования аватара

export const popupUpdateAvatar = document.querySelector('.popup_type_update-avatar'); //модальное окно (обновить аватар)
export const formElementUpdateAvatar = popupUpdateAvatar.querySelector('#avatarFormPopup'); //форма (обновить аватар)
export const avatarUrlInput = popupUpdateAvatar.querySelector('#update-avatar-input'); //поле ввода ссылки на аватар
export const buttonSaveAvatar = popupUpdateAvatar.querySelector('#updateAvatar-save-button'); //кнопка сохранить новый аватар

export const popupEditProfile = document.querySelector('.popup_type_editProfile'); //модальное окно (редактировать профиль)
export const formElementEditProfile = popupEditProfile.querySelector('#editProfileFormPopup'); //форма (редактировать профиль)
export const nameInput = popupEditProfile.querySelector('#profile-name-input'); //поле ввода имени профиля
export const jobInput = popupEditProfile.querySelector('#description-input'); //поле ввода информации о себе
export const buttonSaveProfileInfo = popupEditProfile.querySelector('#editProfile-save-button'); //кнопка сохранить информацию профиля

export const popupAddCard = document.querySelector('.popup_type_addCard'); //модальное окно (добавить карточку)
export const buttonAddCard = sectionProfile.querySelector('.profile__add-button'); //кнопка добавить карточку
export const cardNameInput = popupAddCard.querySelector('#card-name-input'); //поле ввода названия карточки
export const cardUrlInput = popupAddCard.querySelector('#card-url-input'); //поле ввода ссылки на карточку
export const formElementAddCard = popupAddCard.querySelector('#cardFormPopup');//форма (добавить карточку)
export const buttonCreateCard = popupAddCard.querySelector('#addCard-save-button'); //кнопка создать карточку

export const elementsContainer = document.querySelector('.elements-container'); //контейнер для карточек
export const cardTemplate = document.querySelector('#cardTemplate').content; //шаблон карточки

export const popupImagePreview = document.querySelector('.popup_type_image-preview');// модальное окно (увеличить изображение карточки)
export const bigImageName = document.querySelector('.popup__image-name'); //название большого изображения
export const imageUrl = document.querySelector('.popup__image'); //ссылка на большое изображение

export const formElement = document.querySelector('.popup__form'); //элемент формы
export const inputElement = formElement.querySelector('.popup__input'); //элемент поля ввода

export let userId;

// import { toggleSaveButtonText } from './components/utils';
// import { forEach } from 'core-js/core/array';

// let userId;

//получение страницы (данные пользователя + карточки)
function getPage () {
    const profileInfo = fetchGetProfileInfo();
    const cards = fetchGetCards();
    Promise.all([profileInfo, cards])
    .then(([userData, cards]) => {
        profileName.textContent = userData.name;
        profileDescription.textContent = userData.about;
        avatarImage.src = userData.avatar;
        // userId = userData._id;
        const cardList = new Section({
            items: cards, 
            renderer: (card) => {
                const cardNew = new Card(card, userData._id, '#cardTemplate');
                const element = cardNew.generate();
                cardList.addItem(element);
            }
            }
            , '.elements-container');
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

//функция сохранить (отправить) обновленный аватар
function handleUpdateAvatarFormSubmit (evt) {
    evt.preventDefault();
    toggleSaveButtonText(buttonSaveAvatar, true);

    fetchEditAvatar(avatarUrlInput.value)
    .then((data) => {
        avatarImage.src = avatarUrlInput.value;
        formElementUpdateAvatar.reset();
        handleSubmitButton(buttonSaveAvatar);
        closePopup(popupUpdateAvatar);
    })
    .catch((error) => {
        console.error(error);
    })
    .finally(() => {
        toggleSaveButtonText(buttonSaveAvatar, false);
    })
    
};

//функция сохранить (отправить) инфо профиля
function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    // const form = evt.target;
    const button = evt.submitter;
    toggleSaveButtonText(button, true);

    fetchEditProfileInfo({name: nameInput.value, about: jobInput.value})
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
    .finally(() => {
        toggleSaveButtonText(button, false);
    })
};

// initialCards.forEach(function(item) {
//     addCard(item, elementsContainer);
// });

//добавление новой карточки 
function handleAddCardFormSubmit (evt, settings) {
    evt.preventDefault();
    const button = evt.submitter;
    const cardName = cardNameInput.value;
    const cardUrl = cardUrlInput.value;
    const item = {
        name: cardName,
        link: cardUrl,
        owner: {
            _id: userId
        },
        likes: []
    }
    toggleSaveButtonText(button, true);

    fetchPostCard(item)
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
    .finally(() => {
        toggleSaveButtonText(button, false);
    })
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
    openPopup(popupUpdateAvatar);
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
formElementEditProfile.addEventListener('submit', handleProfileFormSubmit);

//слушатель на форме добавления карточки
formElementAddCard.addEventListener('submit', handleAddCardFormSubmit);

//слушатель на форме обновления аватара
formElementUpdateAvatar.addEventListener('submit', handleUpdateAvatarFormSubmit);

//вызов функции валидации форм
enableValidation(validationConfig);