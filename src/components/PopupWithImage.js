import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup);
        this._bigImageName = this._popup.querySelector('.popup__image-name');
        this._imageUrl = this._popup.querySelector('.popup__image');
    }

    open(item) {
        super.open();
        this._bigImageName.textContent = item.name;
        this._imageUrl.alt = item.name;
        this._imageUrl.src = item.link;
    }
}