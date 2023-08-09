export class Card {
    constructor(item, userId, cardTemplate, handleCardClick, handleLikeButton, handleTrashButton){
        this._cardId = item._id;
        this._title = item.name;
        this._image = item.link;
        this._likes = item.likes;        
        this._cardTemplate = cardTemplate;
        this._userId = userId;
        this._ownerId = item.owner._id;
        this._handleCardClick = handleCardClick;
        this._handleLikeButton = handleLikeButton;
        this._handleTrashButton = handleTrashButton;
    }

    //функция добавления карточки в DOM
    renderCards (cards, userId) {
        cards.forEach((data) => {
        const cardNew = this.createCard(data, userId);
        this.elementsContainer.prepend(cardNew);
    })
    }

    // добавляем слушатели событий
    _setEventListeners() {
        this._cardLikeButton.addEventListener('click', () => {
            this._handleLikeButton();
        });

        this._trashButton.addEventListener('click', (e) => {
            this._handleTrashButton(e);
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
        });
 
        this._trashButton.addEventListener('click', (e) => {
            Promise.all([this._handleTrashButton(this._cardId)])
            .then (([res]) => {
                e.target.closest('.card').remove();
            })
            .catch((err) => console.log(err));
        });

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

    _getCardData() {
        console.log('_getCardData');
        const cardData = {name: this._title, link: this._image};
        return cardData;
    }

    // заполнение карточки данными
    generate() {
        this._element = this._getElement();
        this._cardLikeButton = this._element.querySelector('.card__like-button');
        this._trashButton = this._element.querySelector('.card__delete-button');
        this._likeCounter = this._element.querySelector('.card__like-counter');
        this._image = this._element.querySelector('.card__image');
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

const api = new Api({
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-26',
    headers: {
        authorization: 'd48850ee-0174-40ac-94a8-4573c8ed93c1',
        'Content-Type': 'application/json'
    }
});


const api = new Api();