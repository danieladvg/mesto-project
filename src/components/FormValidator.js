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
        this._inputList = Array.from(this.form.querySelectorAll(this.inputSelector));
        this._saveButton = this.form.querySelector(this.submitButtonSelector);
    }

    _setEventListeners() {
        const buttonElement = this._form.querySelector(this._submitButtonSelector); //элемент кнопки submit
        const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(formElement, inputElement);
                this._toggleButtonState(inputList, buttonElement);
            })
        })    
    }
    _checkInputValidity(formElement, inputElement) {
        if(inputElement.validity.patternMismatch) {
            inputElement.setCustomValidity(inputElement.dataset.errorMessage);
        } else {
            inputElement.setCustomValidity("");
        }

        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(formElement, inputElement);
        }
    }

    _showInputError(formElement, inputElement, errorMessage) {
        const inputError = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        inputError.textContent = errorMessage;
        inputError.classList.add(this._errorClass);
    }
    
    _hideInputError (formElement, inputElement) {
        const inputError = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        inputError.classList.remove(this._errorClass);
        inputError.textContent = '';
    }

    _toggleButtonState(inputList, buttonElement) {
        if(this._hasInvalidInput(inputList)) {
            buttonElement.disabled = true;
            buttonElement.classList.add(this._inactiveButtonClass);
        } else {
            buttonElement.disabled = false;
            buttonElement.classList.remove(this._inactiveButtonClass);
        }
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
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