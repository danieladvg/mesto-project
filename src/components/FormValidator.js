export class FormValidator {
    constructor(validationConfig, form) {
        this._formSelector = validationConfig.formSelector;
        this._inactiveButtonClass = validationConfig.inactiveButtonClass;
        this._inputErrorClass = validationConfig.inputErrorClass;
        this._errorClass = validationConfig.errorClass;
        this._form = form;
        this._inputList = Array.from(this._form.querySelectorAll(validationConfig.inputSelector));
        this._saveButton = this._form.querySelector(this._submitButtonSelector);
        this._submitButton = this._form.querySelector(validationConfig.submitButtonSelector);
    }

    _setEventListeners() {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(this._inputList, this._saveButton);
            })
        })    
    }
    _checkInputValidity(inputElement) {
        if(inputElement.validity.patternMismatch) {
            inputElement.setCustomValidity(inputElement.dataset.errorMessage);
        } else {
            inputElement.setCustomValidity("");
        }

        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _showInputError(inputElement, errorMessage) {
        const inputErrorText = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        inputErrorText.textContent = errorMessage;
        inputErrorText.classList.add(this._errorClass);
    }
    
    _hideInputError (inputElement, errorMessage) {
        const inputErrorText = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        inputErrorText.classList.remove(this._errorClass);
        inputErrorText.textContent = '';
    }

    _toggleButtonState() {
        if(this._hasInvalidInput(this._inputList)) {
            this._submitButton.disabled = true;
            this._submitButton.classList.add(this._inactiveButtonClass);
        } else {
            this._submitButton.disabled = false;
            this._submitButton.classList.remove(this._inactiveButtonClass);
        }
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }

    enableValidation() {
        this._setEventListeners();
    }
}