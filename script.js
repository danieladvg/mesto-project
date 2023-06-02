const profile = document.querySelector('.profile'); //секция profile
const profileName = profile.querySelector('.profile__name'); //имя профиля
const profileDescription = profile.querySelector('.profile__description'); //информация о себе
const profileEditButton = profile.querySelector('.profile__edit-button'); //кнопка редактирования профиля

const popup = document.querySelector('.popup'); //модальное окно
const formElement = popup.querySelector('.popup__form'); //форма
const nameInput = popup.querySelector('#popup__profile-name'); //поле ввода имени профиля
const jobInput = popup.querySelector('#popup__description'); //поле ввода информации о себе
const saveButton = popup.querySelector('.popup__save-button'); //кнопка сохранить
const closeButton = popup.querySelector('.popup__close-button'); //кнопка закрыть

function openPopup() {
    popup.classList.add('popup_opened');
    nameInput.setAttribute('value', profileName.textContent);
    jobInput.setAttribute('value', profileDescription.textContent);
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

profileEditButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);


function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler);

saveButton.addEventListener('click', closePopup);
