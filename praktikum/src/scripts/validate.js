const showInputError = (formElem, inputElem, errorMessage) => {
    const errorElement = formElem.querySelector(`.${inputElem.id}-error`);
    inputElem.classList.add('form__item_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__item-error_active');
};

const hideInputError = (formElem, inputElem) => {
    const errorElement = formElem.querySelector(`.${inputElem.id}-error`);
    inputElem.classList.remove('form__item_type_error');
    errorElement.classList.remove('form__item-error_active');
    errorElement.textContent = '';
};

const checkInputValidity = (formElem, inputElem) => {
    if(inputElem.validity.patternMismatch) {
        inputElem.setCustomValidity(inputElem.dataset.errorMessage);
    } else {
        inputElem.setCustomValidity('');
    }

    if(!inputElem.validity.valid) {
      showInputError(formElem, inputElem, inputElem.validationMessage);
    } else {
      hideInputError(formElem, inputElem);
    }
};

const setEventListeners = (formElem) => {
    const inputList = Array.from(formElem.querySelectorAll('.form__item'));
    const btnElem = formElem.querySelector('.form__btn');
    toggleButtonState(inputList, btnElem);

    inputList.forEach(inputElem => {
        inputElem.addEventListener('input', function() {
            checkInputValidity(formElem, inputElem);
            toggleButtonState(inputList, btnElem);
        })
    })
}

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.form'));

    formList.forEach(formElem => {
        formElem.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElem);
    })
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
}

function toggleButtonState(inputList, btnElem) {
    if(hasInvalidInput(inputList)) {
        btnElem.disabled = true;
        btnElem.classList.add('form__btn_state_inactive');
    } else {
        btnElem.disabled = false;
        btnElem.classList.remove('form__btn_state_inactive');
    }
}

export { enableValidation };