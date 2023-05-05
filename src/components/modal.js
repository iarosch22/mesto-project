import { formAdd, nameInput, nameValue, popupAdd, popupEdit, statusInput, urlValue, userboxName, userboxStatus } from ".";
import { addCard } from "./card";
import { closePopup } from "./utils";

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

    closePopup(popupAdd);
}

export { handleFormEdit, handleFormAdd }