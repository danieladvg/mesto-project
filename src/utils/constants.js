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
// export const cardTemplate = document.querySelector('#cardTemplate').content; //шаблон карточки

export const popupImagePreview = document.querySelector('.popup_type_image-preview');// модальное окно (увеличить изображение карточки)
export const bigImageName = document.querySelector('.popup__image-name'); //название большого изображения
export const imageUrl = document.querySelector('.popup__image'); //ссылка на большое изображение

export const formElement = document.querySelector('.popup__form'); //элемент формы
export const inputElement = formElement.querySelector('.popup__input'); //элемент поля ввода
export const saveButton = formElement.querySelector('.popup__save-button'); //элемент кнопки сохранить

// export let userId;

//объект настроек валидации форм
export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};