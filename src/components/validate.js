
//валидация форм
const showInputError = (formElement, inputElement, errorMessage) => {
    const inputError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    inputError.textContent = errorMessage;
    inputError.classList.add('popup__input-error_active');
}

const hideInputError = (formElement, inputElement) => {
    const inputError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    inputError.classList.remove('popup__input-error_active');
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

const toggleButtonState = (inputList, buttonElement) => {
    if(hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add('.popup__save-button_inactive');
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove('.popup__save-button_inactive');
    }
}

const setEventListeners = (formElement) => {
    const buttonElement = formElement.querySelector('.popup__save-button'); //элемент кнопки submit
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        })
    })
}

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement => {
        setEventListeners(formElement)
    }));
};

export{enableValidation};