const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
    ];

const profile = document.querySelector('.profile'); //секция profile
const profileName = profile.querySelector('.profile__name'); //имя профиля
const profileDescription = profile.querySelector('.profile__description'); //информация о себе
const profileEditButton = profile.querySelector('.profile__edit-button'); //кнопка редактирования профиля

const popup = document.querySelector('.popup'); //модальное окно
const popupEditProfile = document.querySelector('.popup_type_editProfile'); //модальное окно (редактировать профиль)
const formElement = document.querySelector('.popup__form'); //форма
const nameInput = popup.querySelector('#popup__profile-name'); //поле ввода имени профиля
const jobInput = popup.querySelector('#popup__description'); //поле ввода информации о себе
const saveButton = popup.querySelector('.popup__save-button'); //кнопка сохранить
const closeButtonEditProfile = document.querySelector('#editProfile-close-button'); //кнопка закрыть окно редактировать профиль


const popupAddCard = document.querySelector('.popup_type_addCard'); //модальное окно (добавить карточку)
const addCardButton = profile.querySelector('.profile__add-button'); //кнопка добавить карточку
const cardNameInput = document.querySelector('#popup__card-name'); //поле ввода названия карточки
const cardUrlInput = document.querySelector('#popup__card-url'); //поле ввода ссылки на карточку
const closeButtonAddCard = document.querySelector('#addCard-close-button') //кнопка закрыть окно добавить карточку
const formElementAddCard = document.querySelector('#cardFormPopup');//форма 

const cardTitle = document.querySelector('.card__title'); //название карточки
const cardImage = document.querySelector('.card__image'); //изображение карточки


const elementsContainer = document.querySelector('.elements-container'); //контейнер для карточек
const cardTemplate = document.querySelector('#cardTemplate').content; //шаблон карточки

const popupImagePreview = document.querySelector('.popup_type_image-preview');// модальное окно (увеличить изображение карточки)
const closeButtonImagePreview = document.querySelector('#imagePreview-close-button');//кнопка закрыть окно просмотра изображения карточки

const bigImageName = document.querySelector('.popup__image-name'); //название большого изображения
const imageUrl = document.querySelector('.popup__image'); //ссылка на большое изображение




function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

profileEditButton.addEventListener('click', function () {
    openPopup(popupEditProfile);
    nameInput.setAttribute('value', profileName.textContent);
    jobInput.setAttribute('value', profileDescription.textContent);
});

addCardButton.addEventListener('click', function () {
    openPopup(popupAddCard);
}) 

closeButtonEditProfile.addEventListener('click', function () {
    closePopup(popupEditProfile)
});

closeButtonAddCard.addEventListener('click', function () {
    closePopup(popupAddCard)
});

closeButtonImagePreview.addEventListener('click', function () {
    closePopup(popupImagePreview)
});

const openImagePreview = function(data) {
    bigImageName.textContent = data.name;
    imageUrl.src = data.link;
    imageUrl.alt = data.name;
    
    openPopup(popupImagePreview);
}

//функция сохранить инфо профиля
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(popupEditProfile);
}

formElement.addEventListener('submit', formSubmitHandler);

// функция создания карточки
function createCard(data) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const trashButton = cardElement.querySelector('.card__delete-button');

    cardElement.querySelector('.card__title').textContent = data.name;
    cardImage.src = data.link;
    cardImage.alt = data.name;

    //функция лайк карточки
    cardLikeButton.addEventListener("click", function (e) {
            e.target.classList.toggle("card__like-button_active");
        });

    //функция удаления карточки
    trashButton.addEventListener('click', function (e) {
        e.target.closest('.card').remove();
    });    

    cardImage.addEventListener('click', () => openImagePreview(data));


    return cardElement; 
}



//функция добавления карточки
function addCard(data, container) {
    const card = createCard(data);
    elementsContainer.prepend(card);
}

initialCards.forEach(function(item) {
    addCard(item, elementsContainer);
})

//функция создать новую карточку 
formElementAddCard.addEventListener('submit', function(evt) {
    evt.preventDefault();
    const cardData = {
        name: cardNameInput.value,
        link: cardUrlInput.value
    }

    formElementAddCard.reset();

    addCard(cardData, elementsContainer);
    closePopup(popupAddCard)
});

