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
            Promise.all([this._handleLikeButton(this._cardId, this._checkOwnerLike())])
            .then(([res]) => {
                this._likes = res.likes.slice();
                this._setLikeButtonState();
            })
            .catch((err) => console.log(err));
        });
 
        this._trashButton.addEventListener('click', (e) => {
            Promise.all([this._handleTrashButton(this._cardId)])
            .then (([res]) => {
                e.target.closest('.card').remove();
            })
            .catch((err) => console.log(err));
        });

        this._image.addEventListener('click', () => {
            this._handleCardClick(this._getCardData());
        });
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

    _getCardData() {
        const cardData = {name: this._title, link: this._image};
        return cardData;
    }

    // заполнение карточки данными
    generate() {
        this._element = this._getElement();
        this._cardLikeButton = this._element.querySelector('.card__like-button');
        this._trashButton = this._element.querySelector('.card__delete-button');
        this._likeCounter = this._element.querySelector('.card__like-counter');
        this._imageContainer = this._element.querySelector('.card__image');
        this._setEventListeners();

        this._element.dataset.id = this._cardId;
        this._element.querySelector('.card__title').textContent = this._title;
        this._element.querySelector('.card__image').src = this._image;
        this._element.querySelector('.card__image').alt = this._title;

        this._setLikeButtonState();

        if(this._ownerId !== this._userId) {
            this._element.removeChild(this._trashButton);
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

// //функция добавления карточек в DOM
// export function renderCards (cards, userId) {
//     cards.forEach((data) => {
//     const cardNew = this.createCard(data, userId);
//     this.elementsContainer.prepend(cardNew);
// })
// }


// //функция добавления карточек в DOM
// export function renderCards (cards, userId) {
//     cards.forEach((data) => {
//     const cardNew = this.createCard(data, userId);
//     this.elementsContainer.prepend(cardNew);
// })
// }


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