const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
}

const toggleButtonState = (settings, inputList, btnElem) => {
    if(hasInvalidInput(inputList)) {
        btnElem.disabled = true;
        btnElem.classList.add(settings.inactiveButtonClass);
    } else {
        btnElem.disabled = false;
        btnElem.classList.remove(settings.inactiveButtonClass);
    }
}

const showInputError = (settings, formElem, inputElem, errorMessage) => {
    const errorElement = formElem.querySelector(`.${inputElem.id}-error`);
    inputElem.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
};

const hideInputError = (settings, formElem, inputElem) => {
    const errorElement = formElem.querySelector(`.${inputElem.id}-error`);
    inputElem.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (settings, formElem, inputElem) => {
    if(inputElem.validity.patternMismatch) {
        inputElem.setCustomValidity(inputElem.dataset.errorMessage);
    } else {
        inputElem.setCustomValidity('');
    }

    if(!inputElem.validity.valid) {
      showInputError(settings, formElem, inputElem, inputElem.validationMessage);
    } else {
      hideInputError(settings, formElem, inputElem);
    }
};

const setEventListeners = (settings, formElem) => {
    const inputList = Array.from(formElem.querySelectorAll(settings.inputSelector));
    const btnElem = formElem.querySelector(settings.submitButtonSelector);
    toggleButtonState(settings, inputList, btnElem);

    inputList.forEach(inputElem => {
        inputElem.addEventListener('input', function() {
            checkInputValidity(settings, formElem, inputElem);
            toggleButtonState(settings, inputList, btnElem);
        })
    })
}

const enableValidation = (settings) => {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));

    formList.forEach(formElem => {
        formElem.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(settings, formElem);
    })
}

export { enableValidation };