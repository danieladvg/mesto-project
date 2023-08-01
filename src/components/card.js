// import{elementsContainer, cardTemplate, userId} from '../index.js';
import { Api } from './api.js';
import{openImagePreview} from './modal.js';

export class Card {
    constructor(elementsContainer, cardTemplate){
        this.elementsContainer = document.querySelector(elementsContainer);
        this.cardTemplate = document.querySelector(cardTemplate).content;
        // this.userId = userId;
    }

//проверить, есть ли мой лайк в массиве с лайками
    _checkOwnerLike (likes, userId) {
        return likes.some(like => like._id === userId);
    }

    //функция добавления карточки в DOM
    renderCards (cards, userId) {
        cards.forEach((data) => {
        const cardNew = this.createCard(data, userId);
        this.elementsContainer.prepend(cardNew);
    })
    }

// функция создания карточки
    createCard(item, userId) {

        const cardElement = this.cardTemplate.cloneNode(true);
        const cardTitle = cardElement.querySelector('.card__title');
        const cardImage = cardElement.querySelector('.card__image');
        const cardLikeButton = cardElement.querySelector('.card__like-button');
        const trashButton = cardElement.querySelector('.card__delete-button');
        const cardLikeCounter = cardElement.querySelector('.card__like-counter');
        
        
        this.cardId = cardElement.querySelector('.card').dataset.id = item._id;
        
        cardTitle.textContent = item.name;
        cardImage.src = item.link;
        cardImage.alt = item.name;
        cardLikeCounter.textContent = item.likes.length;
        
        if(this._checkOwnerLike(item.likes, userId)) {
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

        //проверить, есть ли на карточке лайк
        const checkLikeOnCard = (cardLikeButton) => {
            if (cardLikeButton.classList.contains ('card__like-button_active')) {
                return true;
            }
        }

        cardLikeButton.addEventListener('click', (e) => {
            if(checkLikeOnCard(cardLikeButton)) {
                api.fetchUnlikeCard(this.cardId)
                .then((res) => {
                    cardLikeCounter.textContent = res.likes.length;
                    cardLikeButton.classList.remove("card__like-button_active");
                })
                .catch((err) => console.log(err));
            } else {
                api.fetchLikeCard(this.cardId)
                .then((res) => {
                    cardLikeCounter.textContent = res.likes.length;
                    cardLikeButton.classList.add("card__like-button_active");
                    cardLikeCounter.classList.add("card__like-counter_active");
            })
            .catch((err) => console.log(err));
            }
        })

        //функция удаления карточки
        trashButton.addEventListener('click', (e) => {
            console.log(this.cardId);
            api.fetchDeleteCard(this.cardId)
            .then((res) => {
                e.target.closest('.card').remove();
            })
            .catch((err) => console.log(err));    
        })

        cardImage.addEventListener('click', () => openImagePreview(item));

        return cardElement; 
    }
}

const api = new Api();