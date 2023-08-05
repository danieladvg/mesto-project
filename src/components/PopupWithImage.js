import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup);
        this.bigImageName = this.popup.querySelector('.popup__image-name');
        this.imageUrl = this.popup.querySelector('.popup__image');
    }

    open() {
        super.open(item);
        this.bigImageName.textContent = item.name;
        this.imageUrl.alt = item.name;
        this.imageUrl.src = item.link;
    }
}