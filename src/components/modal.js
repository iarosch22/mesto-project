import { formAdd, nameInput, nameValue, popupAdd, popupEdit, statusInput, urlValue, userboxName, userboxStatus } from ".";
import { addCard } from "./card";
import { closePopup } from "./utils";
import { enableValidation } from "./validate";

/* form-edit */

function handleFormEdit(evt) {
    evt.preventDefault();
    const enteredName = nameInput.value;
    const enteredStatus = statusInput.value;

    userboxName.textContent = enteredName;
    userboxStatus.textContent = enteredStatus;

    closePopup(popupEdit);
}

function handleFormAdd(evt) {
    evt.preventDefault();
    const enteredPlacename = nameValue.value;
    const enteredUrl = urlValue.value;

    addCard(enteredPlacename, enteredUrl);

    formAdd.reset();

    enableValidation({
        formSelector: '.form',
        inputSelector: '.form__item',
        submitButtonSelector: '.form__btn',
        inactiveButtonClass: 'form__btn_state_inactive',
        inputErrorClass: 'form__item_type_error',
        errorClass: 'form__item-error_active'
      });

    closePopup(popupAdd);
}

export { handleFormEdit, handleFormAdd }