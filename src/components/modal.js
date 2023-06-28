import{bigImageName, imageUrl, popupImagePreview, page} from './index.js';

//открытие модального окна
function openPopup(popup) {
    popup.classList.add('popup_opened');
    page.addEventListener('keydown', closePopupByEsc);
}

//закрытие модального окна
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    page.removeEventListener('keydown', closePopupByEsc);
}

//закрытие модального окна кликом по фону
function closePopupByOverlay(e) {
    if(e.target.classList.contains('popup')) {
        closePopup(e.target);
    }
}

//закрытие модального окна по нажатию Escape
function closePopupByEsc(e) {
    console.log(e.target)
    if(e.key === 'Escape') {
        const overlay = document.querySelectorAll('.popup');
        overlay.forEach(popup => {
            closePopup(popup);
        })
    }
}

//закрытие модальных окон по клику на крестик
document.querySelectorAll('.popup__close-button').forEach(button => {
    const closeButtonsPopup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(closeButtonsPopup));
    }); 


//открытие модального окна (увеличить изображение карточки)
const openImagePreview = function(data) {
    bigImageName.textContent = data.name;
    imageUrl.src = data.link;
    imageUrl.alt = data.name;
    
    openPopup(popupImagePreview);
}

export{openPopup, closePopup, closePopupByOverlay, closePopupByEsc, openImagePreview};