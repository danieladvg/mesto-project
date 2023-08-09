export class Popup {
    constructor(popup) {
        this.popup = popup;
    }

    open() {
        this.popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this.popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if(evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        document.querySelectorAll('.popup__close-button').forEach(button => {
            const closeButtonsPopup = button.closest('.popup');
            button.addEventListener('click', () => closePopup(closeButtonsPopup));
            closeButtonsPopup.addEventListener('click', e => closePopupByOverlay(e));
            }); 
    }
}