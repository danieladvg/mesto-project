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

        this._imageContainer.addEventListener('click', () => {
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