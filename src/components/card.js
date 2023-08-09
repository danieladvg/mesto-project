import{elementsContainer, cardTemplate, userId} from '../index.js';
import { fetchDeleteCard, fetchLikeCard, fetchUnlikeCard } from './api.js';
import{openImagePreview} from './modal.js';


//функция добавления карточки в DOM
export function renderCards (cards, userId) {
    cards.forEach((data) => {
    const card = createCard(data, userId);
    elementsContainer.prepend(card);
    })
}

//проверить, есть ли мой лайк в массиве с лайками
function checkOwnerLike (likes) {
    return likes.some(like => like._id === userId);
}

// функция создания карточки
function createCard(item, userId) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const trashButton = cardElement.querySelector('.card__delete-button');
    const cardLikeCounter = cardElement.querySelector('.card__like-counter');
    
    const cardId = cardElement.querySelector('.card').dataset.id = item._id;
    cardTitle.textContent = item.name;
    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardLikeCounter.textContent = item.likes.length;
    
    if(checkOwnerLike(item.likes)) {
        cardLikeButton.classList.add("card__like-button_active");
    }

    if(item.owner._id !== userId) {
        cardElement.querySelector('.card').removeChild(trashButton);
    }


    if(item.likes.length > 0) {
        cardLikeCounter.classList.add("card__like-counter_active");
    } else {
        cardLikeCounter.classList.remove("card__like-counter_active");
    }

    // //функция лайк карточки
    // cardLikeButton.addEventListener("click", function (e) {
    //     e.target.classList.toggle("card__like-button_active");
    // });

    //проверить, есть ли на карточке лайк
    const checkLikeOnCard = (cardLikeButton) => {
        if (cardLikeButton.classList.contains ('card__like-button_active')) {
            return true;
    }
    }

    cardLikeButton.addEventListener('click', function(e) {
        if(checkLikeOnCard(cardLikeButton)) {
            fetchUnlikeCard(cardId)
            .then((res) => {
                cardLikeCounter.textContent = res.likes.length;
                cardLikeButton.classList.remove("card__like-button_active");
            })
            .catch((err) => console.log(err));
        } else {
            fetchLikeCard(cardId)
            .then((res) => {
                cardLikeCounter.textContent = res.likes.length;
                cardLikeButton.classList.add("card__like-button_active");
                cardLikeCounter.classList.add("card__like-counter_active");
        })
        .catch((err) => console.log(err));
        }
    })

    // //функция удаления карточки
    trashButton.addEventListener('click', function (e) {
        fetchDeleteCard(cardId)
        .then((res) => {
            e.target.closest('.card').remove();
        })
        .catch((err) => console.log(err));    
    })

    cardImage.addEventListener('click', () => openImagePreview(item));

    return cardElement; 
}

export {createCard}