import { validationConfig} from '../utils/constants.js';

export class FormValidator {
    constructor(validationConfig, form) {
        this.formSelector = validationConfig.formSelector;
        this.inputSelector = validationConfig.inputSelector;
        this.submitButtonSelector = validationConfig.submitButtonSelector;
        this.inactiveButtonClass = validationConfig.inactiveButtonClass;
        this.inputErrorClass = validationConfig.inputErrorClass;
        this.errorClass = validationConfig.errorClass;
        this.form = form;
        this.inputList = Array.from(this.form.querySelectorAll(this.inputSelector));
        this.saveButton = this.form.querySelector(this.submitButtonSelector);
    }

    enableValidation() {
        
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