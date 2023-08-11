import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popup , handleSubmitForm) {
        super(popup);
        this._handleSubmitForm = handleSubmitForm;
        this._form = this._popup.querySelector('.popup__form');
        this._saveButton = this._form.querySelector('.popup__save-button');
        this._inputList = this._form.querySelectorAll('.popup__input');
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value; 
        });
        return this._formValues;
    }

    _toggleSaveButtonText = (state) => {
        if (state) {
            this._saveButton.textContent = 'Сохранение...';
        } else {
            this._saveButton.textContent = 'Сохранить';
        };
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._toggleSaveButtonText(true);
            this._handleSubmitForm(this._getInputValues())
                .then(res => this.close())
                .finally(() => this._toggleSaveButtonText(false));
        });
    }

    close() {
        super.close();
        this._form.reset();
    }

    open() {
        super.open();
        this._toggleSaveButtonText(false);
    }
}