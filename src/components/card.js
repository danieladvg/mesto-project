import { Api } from './Api.js';
import{openImagePreview} from './modal.js';
import { PopupWithImage } from './PopupWithImage.js';

export class Card {
    constructor(item, userId, cardTemplate){
        this._cardId = item._id;
        this._title = item.name;
        this._image = item.link;
        this._likes = item.likes;        
        this._cardTemplate = cardTemplate;
        this._userId = userId;
        this._ownerId = item.owner._id;
    }

    // создание экземпляра карточки
    _getElement() {
        const cardElement = document
            .querySelector(this._cardTemplate)
            .content
            .querySelector('.card')
            .cloneNode(true);
        return cardElement; 
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

    _handleLikeButton() {
        if (this._checkOwnerLike()) {
            api.fetchUnlikeCard(this._cardId)
            .then((res) => {
                this._likes = res.likes.slice();
                this._setLikeButtonState();
            })
            .catch((err) => console.log(err));
        } else {
            api.fetchLikeCard(this._cardId)
            .then((res) => {
                this._likes = res.likes.slice();
                this._setLikeButtonState();
            })
            .catch((err) => console.log(err));
        }
    }

    _handleTrashButton(e) {
        api.fetchDeleteCard(this._cardId)
            .then((res) => {
                e.target.closest('.card').remove();
            })
            .catch((err) => console.log(err)); 
    }

    _handleCardClick() {
        const popupImage = new PopupWithImage(this._element);
        popupImage.open();
    }

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

