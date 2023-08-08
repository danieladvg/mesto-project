export class Popup {
    constructor(popup) {
        this._popup = document.querySelector(popup);
        this._handleEscClose = this._handleEscClose.bind(this);
        this.setEventListeners = this.setEventListeners.bind(this);
    }

    open() {
        this._popup.classList.add('popup_opened');
        this.setEventListeners();
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if(evt.key === 'Escape') {
            this.close();
        }
    }

    _closePopupByOverlay(e) {
        if(e.target.classList.contains('popup_opened')) {
            this.close();
        }
    }
    

    setEventListeners() {
        document.querySelectorAll('.popup__close-button').forEach(button => {
            const closeButtonsPopup = button.closest('.popup');
            button.addEventListener('click', () => this.close());
            closeButtonsPopup.addEventListener('mousedown', e => this._closePopupByOverlay(e));
            }); 
        document.addEventListener('keydown', this._handleEscClose);
    }
}