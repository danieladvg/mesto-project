import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor({popup , handleSubmitForm}) {
        super(popup);
        this.handleSubmitForm = handleSubmitForm;
        this.form = this.popup.querySelector('.popup__form');
        this.inputList = this.form.querySelectorAll('.popup__input');
        this.saveButton = this.form.querySelector('.popup__save-button');
    }

    _getInputValues() {

    }

    setEventListeners() {
        super.setEventListeners();
        
    }

    close() {
        super.close();
        this.form.reset();
    }
}