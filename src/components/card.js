// import{elementsContainer, cardTemplate, userId} from '../index.js';
import { Api } from './Api.js';
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

    // добавляем слушатели событий
    _setEventListeners() {
        this._cardLikeButton.addEventListener('click', () => {
            this._handleLikeButton();
        });

        this._trashButton.addEventListener('click', (e) => {
            this._handleTrashButton(e);
        });

        this._element.querySelector('.card__image').addEventListener('click', () => this._handleCardClick());
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
            api.fetchDeleteCard(this.cardId)
            .then((res) => {
                e.target.closest('.card').remove();
            })
            .catch((err) => console.log(err));    
        })

        cardImage.addEventListener('click', () => openImagePreview(item));

//проверить, есть ли мой лайк в массиве с лайками
    _checkOwnerLike () {
        return this._likes.some(like => like._id === this._userId);
    }

    _setLikeButtonState() {
        this._likeCounter.textContent = this._likes.length;
        if(this._likes.length > 0) {
            this._likeCounter.classList.add("card__like-counter_active");
        } else {
            this._likeCounter.classList.remove("card__like-counter_active");
        };
        if(this._checkOwnerLike()) {
            this._cardLikeButton.classList.add("card__like-button_active");
        } else {
            this._cardLikeButton.classList.remove("card__like-button_active");
        }
    }

    // заполнение карточки данными
    generate() {
        this._element = this._getElement();
        this._cardLikeButton = this._element.querySelector('.card__like-button');
        this._trashButton = this._element.querySelector('.card__delete-button');
        this._likeCounter = this._element.querySelector('.card__like-counter');
        this._setEventListeners();

        this._element.dataset.id = this._cardId;
        this._element.querySelector('.card__title').textContent = this._title;
        this._element.querySelector('.card__image').src = this._image;
        this._element.querySelector('.card__image').alt = this._title;

        this._setLikeButtonState();

        if(this._ownerId !== this._userId) {
            this._element.removeChild(this._trashButton);
        }

        return this._element;
    }
}

// //функция добавления карточек в DOM
// export function renderCards (cards, userId) {
//     cards.forEach((data) => {
//     const cardNew = this.createCard(data, userId);
//     this.elementsContainer.prepend(cardNew);
// })
// }


const api = new Api({
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-26',
    headers: {
        authorization: 'd48850ee-0174-40ac-94a8-4573c8ed93c1',
        'Content-Type': 'application/json'
    }
});

