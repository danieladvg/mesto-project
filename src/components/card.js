import{initialCards} from './cards.js';
import{elementsContainer, popupAddCard, formElementAddCard, cardTemplate, cardNameInput, cardUrlInput, page} from './index.js';
import{openImagePreview, closePopup} from './modal.js';


//функция добавления карточки
function addCard(data, container) {
    const card = createCard(data);
    elementsContainer.prepend(card);
};

initialCards.forEach(function(item) {
    addCard(item, elementsContainer);
});

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



export{createCard, addCard };