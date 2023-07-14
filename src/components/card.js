import{elementsContainer, cardTemplate} from '../index.js';
import { fetchPostCard } from './api.js';
import{openImagePreview} from './modal.js';





//функция добавления карточки в DOM
function addCard(data, container) {
    const card = createCard(data);
    elementsContainer.prepend(card);
};

// функция создания карточки
function createCard(data) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const trashButton = cardElement.querySelector('.card__delete-button');
    const cardLikeCounter = cardElement.querySelector('.card__like-counter');

    cardElement.querySelector('.card__title').textContent = data.name;
    cardImage.src = data.link;
    cardImage.alt = data.name;
    
    // cardLikeCounter.textContent = data.likes.length;
    // if(data.likes.length > 0) {
    //     cardLikeCounter.classList.add('card__like-counter_active');
    // } else {
    //     cardLikeCounter.classList.remove('card__like-counter_active')
    // }

    //функция лайк карточки
    cardLikeButton.addEventListener("click", function (e) {
        e.target.classList.toggle("card__like-button_active");
        cardLikeCounter.classList.toggle("card__like-counter_active");
    });

    //функция удаления карточки
    trashButton.addEventListener('click', function (e) {
        e.target.closest('.card').remove();
    })

    cardImage.addEventListener('click', () => openImagePreview(data));

    return cardElement; 
}

export{addCard};