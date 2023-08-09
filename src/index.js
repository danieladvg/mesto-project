import './pages/index.css';

import {sectionProfile,
    profileName,
    profileDescription,
    profileEditButton,
    avatarImage,
    avatarEditButton,
    popupUpdateAvatar,
    formElementUpdateAvatar,
    avatarUrlInput,
    buttonSaveAvatar,
    popupEditProfile,
    formElementEditProfile,
    nameInput,
    jobInput,
    buttonSaveProfileInfo,
    popupAddCard,
    buttonAddCard,
    cardNameInput,
    cardUrlInput,
    formElementAddCard,
    buttonCreateCard,
    elementsContainer,
    cardTemplate,
    popupImagePreview,
    bigImageName,
    imageUrl,
    formElement,
    inputElement,
    saveButton,
    validationConfig
} from './utils/constants.js';

import{enableValidation, handleSubmitButton} from './components/FormValidator.js'
import{openPopup, closePopup} from './components/modal.js';
// import{renderCards, createCard} from './components/card.js';
// import{initialCards} from './components/cards.js'

// import {fetchPostCard, fetchEditProfileInfo, fetchEditAvatar, fetchGetProfileInfo, fetchGetCards} from './components/api.js';
import { Api } from './components/api.js';
import { Card } from './components/card.js';
import { toggleSaveButtonText } from './components/utils';

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
        userId = userData._id;
        cards.forEach((data) => {
            const cardNew = new Card('.elements-container', '#cardTemplate');
            cardNew.createCard(data, userId);
        });
    })
    .catch((error) => {
        console.error(error);
    })
}


const api = new Api();
const card = new Card('.elements-container', '#cardTemplate');
getPage();

//функция сохранить (отправить) обновленный аватар
function handleUpdateAvatarFormSubmit (evt) {
    evt.preventDefault();
    toggleSaveButtonText(buttonSaveAvatar, true);

    api.fetchEditAvatar(avatarUrlInput.value)
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
    const button = evt.submitter;
    toggleSaveButtonText(button, true);

    api.fetchEditProfileInfo({name: nameInput.value, about: jobInput.value})
    .then((res) => {
        profileName.textContent = nameInput.value;
        profileDescription.textContent = jobInput.value;
        handleSubmitButton(buttonSaveProfileInfo);
        closePopup(popupEditProfile);
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
        console.log(res);
        const cardNew = card.createCard(res, userId);
        elementsContainer.prepend(cardNew);
        formElementAddCard.reset();
        handleSubmitButton(buttonCreateCard);
        closePopup(popupAddCard);
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

//слушатель на форме добавления карточки
formElementAddCard.addEventListener('submit', handleAddCardFormSubmit);

//слушатель на форме обновления аватара
formElementUpdateAvatar.addEventListener('submit', handleUpdateAvatarFormSubmit);

//вызов функции валидации форм
enableValidation(validationConfig);