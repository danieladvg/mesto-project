const sectionProfile = document.querySelector('.profile'); //секция profile
const profileName = sectionProfile.querySelector('.profile__name'); //имя профиля
const profileDescription = sectionProfile.querySelector('.profile__description'); //информация о себе
const profileEditButton = sectionProfile.querySelector('.profile__edit-button'); //кнопка редактирования профиля


const popupEditProfile = document.querySelector('.popup_type_editProfile'); //модальное окно (редактировать профиль)
const formElementEditProfile = popupEditProfile.querySelector('.popup__form'); //форма (редактировать профиль)
const nameInput = popupEditProfile.querySelector('#popup__profile-name'); //поле ввода имени профиля
const jobInput = popupEditProfile.querySelector('#popup__description'); //поле ввода информации о себе


const popupAddCard = document.querySelector('.popup_type_addCard'); //модальное окно (добавить карточку)
const buttonAddCard = sectionProfile.querySelector('.profile__add-button'); //кнопка добавить карточку
const cardNameInput = popupAddCard.querySelector('#popup__card-name'); //поле ввода названия карточки
const cardUrlInput = popupAddCard.querySelector('#popup__card-url'); //поле ввода ссылки на карточку
const formElementAddCard = popupAddCard.querySelector('#cardFormPopup');//форма (добавить карточку)


const elementsContainer = document.querySelector('.elements-container'); //контейнер для карточек
const cardTemplate = document.querySelector('#cardTemplate').content; //шаблон карточки

const popupImagePreview = document.querySelector('.popup_type_image-preview');// модальное окно (увеличить изображение карточки)

const bigImageName = document.querySelector('.popup__image-name'); //название большого изображения
const imageUrl = document.querySelector('.popup__image'); //ссылка на большое изображение


function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

//кнопки закрыть (крестики) модальных окон
document.querySelectorAll('.popup__close-button').forEach(button => {
    const closeButtonsPopup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(closeButtonsPopup));
    }); 

profileEditButton.addEventListener('click', function () {
    openPopup(popupEditProfile);
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
});

buttonAddCard.addEventListener('click', function () {
    openPopup(popupAddCard);
}) 


const openImagePreview = function(data) {
    bigImageName.textContent = data.name;
    imageUrl.src = data.link;
    imageUrl.alt = data.name;
    
    openPopup(popupImagePreview);
}

//функция сохранить (отправить) инфо профиля
function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(popupEditProfile);
}
formElementEditProfile.addEventListener('submit', handleFormSubmit);


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

