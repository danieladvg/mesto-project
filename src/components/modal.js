import{bigImageName, imageUrl, popupImagePreview} from '../index.js';

//открытие модального окна
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEsc);
}

//закрытие модального окна
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEsc);
}

//закрытие модального окна кликом по фону
function closePopupByOverlay(e) {
    if(e.target.classList.contains('popup_opened')) {
        closePopup(e.target);
    }
}

//закрытие модального окна по нажатию Escape
function closePopupByEsc(e) {
    if(e.key === 'Escape') {
        const overlay = document.querySelectorAll('.popup_opened');
        overlay.forEach(popup => {
            closePopup(popup);
        })
    };
}

//закрытие модальных окон по клику на крестик
document.querySelectorAll('.popup__close-button').forEach(button => {
    const closeButtonsPopup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(closeButtonsPopup));
    closeButtonsPopup.addEventListener('click', e => closePopupByOverlay(e));
    }); 


//открытие модального окна (увеличить изображение карточки)
const openImagePreview = function(data) {
    bigImageName.textContent = data.name;
    imageUrl.src = data.link;
    imageUrl.alt = data.name;
    
    openPopup(popupImagePreview);
}

export{openPopup, closePopup, closePopupByOverlay, closePopupByEsc, openImagePreview};