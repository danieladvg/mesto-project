export class Popup {
    constructor(popup) {
        this._popup = document.querySelector(popup);
        this._buttonClose = this._popup.querySelector('.popup__close-button');

        this._handleEscClose = this._handleEscClose.bind(this);
        this.setEventListeners = this.setEventListeners.bind(this);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
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
        this._buttonClose.addEventListener('click', () => this.close());
        this._buttonClose.closest('.popup').addEventListener('mousedown', e => this._closePopupByOverlay(e));
    }
}