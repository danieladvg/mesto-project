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

// функция создания карточки в DOM
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

    _handleLikeButton() {
        if (this._checkOwnerLike()) {
            api.fetchUnlikeCard(this._cardId)
            .then((res) => {
                this._likes = res.likes.slice();
                this._setLikeButtonState();
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
        });

        cardImage.addEventListener('click', () => openImagePreview(item));

        this.elementsContainer.prepend(cardElement);

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


const api = new Api();