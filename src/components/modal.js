import { formAdd, nameInput, nameValue, popupAdd, popupEdit, statusInput, urlValue, userboxName, userboxStatus } from ".";
import { createNewCard, setUserData } from "./api";
import { addCard } from "./card";
import { closePopup } from "./utils";

/* form-edit */

function handleFormEdit(evt) {
    evt.preventDefault();
    const enteredName = nameInput.value;
    const enteredStatus = statusInput.value;

    setUserData(enteredName, enteredStatus)
    .then((res) => {
        userboxName.textContent = res.name;
        userboxStatus.textContent = res.about;
    })
    .catch((err) => {
        console.log(err);
        userboxName.textContent = enteredName;
        userboxStatus.textContent = enteredStatus;
    })

    closePopup(popupEdit);
}

function handleFormAdd(evt) {
    evt.preventDefault();
    const enteredPlacename = nameValue.value;
    const enteredUrl = urlValue.value;
    const submitBtn = formAdd.querySelector('.form__btn');

    createNewCard(enteredPlacename, enteredUrl)
    .then((res) => {
        addCard(res);
    })
    .catch((err) => {
        console.log(err);
    })

    formAdd.reset();

    submitBtn.disabled = true;

    closePopup(popupAdd);
}

export { handleFormEdit, handleFormAdd }