import './pages/index.css';

import{enableValidation, handleSubmitButton} from './components/validate.js'
import{openPopup, closePopup} from './components/modal.js';
import{addCard} from './components/card.js';
// import{initialCards} from './components/cards.js'

import {fetchDeleteCard, fetchPostCard, fetchEditProfileInfo, fetchEditAvatar, fetchGetProfileInfo, fetchGetCards } from './components/api.js';



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
// export const cardLikeCounter = document.querySelector('.card__like-counter'); //счетчик лайков карточки

export const popupImagePreview = document.querySelector('.popup_type_image-preview');// модальное окно (увеличить изображение карточки)
export const bigImageName = document.querySelector('.popup__image-name'); //название большого изображения
export const imageUrl = document.querySelector('.popup__image'); //ссылка на большое изображение

export const formElement = document.querySelector('.popup__form'); //элемент формы
export const inputElement = formElement.querySelector('.popup__input'); //элемент поля ввода

export let userId;

export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};


//получение данных пользователя
export function getUserData () {
    fetchGetProfileInfo()
    .then(function (userData) {
        profileName.textContent = userData.name;
        profileDescription.textContent = userData.about;
        avatarImage.src = userData.avatar;
        userId = userData._id
    })
    .catch(function (error) {
        console.error(error)}
    )
};
// getProfileData();


//получение карточек с сервера
export function getInitialCardsData () {
    fetchGetCards()
    .then(function (data) {
        data.forEach(function (item) {
            addCard(item, elementsContainer);
        });
    })
    .catch(function (error) {
        console.error(error)}
    );
};
// getInitialCardsData();

//получение страницы (данные пользователя + карточки)
export function getPageData () {
    const profileData = getUserData();
    const initialCardsData = getInitialCardsData();
    Promise.all([profileData, initialCardsData])
    .then((results) => {
        const [data, cards] = results;
    })
    .catch((error) => {
        console.error(error);
    })
}
getPageData();



//функция загрузки (обновления) аватара
function loadAvatar (data) {
    avatarImage.src = avatarUrlInput.value;
};

//функция сохранить (отправить) обновленный аватар
function handleUpdateAvatarFormSubmit (evt) {
    evt.preventDefault();
    fetchEditAvatar()
    .then((data) => {
        loadAvatar();
        formElementUpdateAvatar.reset();
        handleSubmitButton(buttonSaveAvatar);
        closePopup(popupUpdateAvatar);
    })
    .catch((error) => {
        console.error(error);
    })
    
};

//функция сохранить (отправить) инфо профиля
function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    fetchEditProfileInfo()
    .then((data) => {
        profileName.textContent = nameInput.value;
        profileDescription.textContent = jobInput.value;
        handleSubmitButton(buttonSaveProfileInfo);
        closePopup(popupEditProfile);
    })
    .catch((error) => {
        console.error(error);
    })
    
};

// initialCards.forEach(function(item) {
//     addCard(item, elementsContainer);
// });

//добавление новой карточки 
formElementAddCard.addEventListener('submit', function(evt) {
    evt.preventDefault();
    fetchPostCard()
    .then((data) => {
        const cardData = {
            name: cardNameInput.value,
            link: cardUrlInput.value
        }
    
        formElementAddCard.reset();
        handleSubmitButton(buttonCreateCard);
        addCard(cardData, elementsContainer);
        closePopup(popupAddCard);
    })
    .catch((error) => {
        console.error(error);
    })
    
});

//удаление карточки
function deleteCard(card) {
    fetchDeleteCard()
    .then((data) => {
        card.remove();
    })
}





//открытие модального окна (редактировать профиль)
profileEditButton.addEventListener('click', function () {
    openPopup(popupEditProfile);
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
});

//открытие модального окна (обновить аватар)
avatarEditButton.addEventListener('click', function () {
    openPopup(popupUpdateAvatar);
});

//открытие модального окна (добавить карточку)
buttonAddCard.addEventListener('click', function () {
    openPopup(popupAddCard);
}) 

//слушатель на форме редактировать профиль
formElementEditProfile.addEventListener('submit', handleProfileFormSubmit);

//слушатель на форме обновления аватара
formElementUpdateAvatar.addEventListener('submit', handleUpdateAvatarFormSubmit);

//вызов функции валидации форм
enableValidation(validationConfig);