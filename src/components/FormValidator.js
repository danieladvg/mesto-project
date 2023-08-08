import { validationConfig} from '../utils/constants.js';

export class FormValidator {
    constructor(validationConfig, form) {
        this._formSelector = validationConfig.formSelector;
        this._inputSelector = validationConfig.inputSelector;
        this._submitButtonSelector = validationConfig.submitButtonSelector;
        this._inactiveButtonClass = validationConfig.inactiveButtonClass;
        this._inputErrorClass = validationConfig.inputErrorClass;
        this._errorClass = validationConfig.errorClass;
        this._form = form;
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
        this._saveButton = this._form.querySelector(this._submitButtonSelector);
    }

    _setEventListeners() {
        // const buttonElement = this._form.querySelector(this._submitButtonSelector); //элемент кнопки submit
        // const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
        this._inputList.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkInputValidity(this._formSelector, this._inputSelector);
                this._toggleButtonState(this._inputList, this._saveButton);
            })
        })    
    }
    _checkInputValidity() {
        console.log(this._inputSelector);

        if(this._inputSelector.validity.patternMismatch) {
            this._inputSelector.setCustomValidity(this._inputSelector.dataset.errorMessage);
        } else {
            this._inputSelector.setCustomValidity("");
        }

        if (!this._inputSelector.validity.valid) {
            this._showInputError(this._formSelector, this._inputSelector, this._inputSelector.validationMessage);
        } else {
            this._hideInputError(this._formSelector, this._inputSelector);
        }
    }

    _showInputError() {
        const inputErrorText = this._formSelector.querySelector(`.${this._inputSelector.id}-error`);
        this._inputSelector.classList.add(this._inputErrorClass);
        inputErrorText.textContent = errorMessage;
        inputErrorText.classList.add(this._errorClass);
    }
    
    _hideInputError () {
        const inputErrorText = this._formSelector.querySelector(`.${this._inputSelector.id}-error`);
        this._inputSelector.classList.remove(this._inputErrorClass);
        inputErrorText.classList.remove(this._errorClass);
        inputErrorText.textContent = '';
    }

    _toggleButtonState() {
        if(this._hasInvalidInput(this._inputList)) {
            this._submitButtonSelector.disabled = true;
            this._submitButtonSelector.classList.add(this._inactiveButtonClass);
        } else {
            this._submitButtonSelector.disabled = false;
            this._submitButtonSelector.classList.remove(this._inactiveButtonClass);
        }
    }

    _hasInvalidInput() {
        return this._inputList.some((input) => {
            return !this._inputSelector.validity.valid;
        })
    }

    enableValidation() {
        this._setEventListeners();
    }
}





//валидация форм
const showInputError = (formElement, inputElement, errorMessage) => {
    const inputError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    inputError.textContent = errorMessage;
    inputError.classList.add(validationConfig.errorClass);
}

const hideInputError = (formElement, inputElement) => {
    const inputError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    inputError.classList.remove(validationConfig.errorClass);
    inputError.textContent = '';
}

const checkInputValidity = (formElement, inputElement) => {
    if(inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
}

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

export const toggleButtonState = (inputList, buttonElement) => {
    if(hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(validationConfig.inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    }
}

export const handleSubmitButton = (buttonElement) => {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
};

const setEventListeners = (formElement) => {
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector); //элемент кнопки submit
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        })
    })
}

const enableValidation = (validationConfig) => {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach((formElement => {
        setEventListeners(formElement, validationConfig)
    }));
};

export{enableValidation};