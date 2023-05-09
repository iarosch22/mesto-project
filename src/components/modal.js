import { formAdd, formUpdateAvatar, nameInput, nameValue, popupAdd, popupEdit, popupUpdateAvatar, statusInput, submitBtnAdd, submitBtnEdit, submitBtnUpdate, urlAvatar, urlValue, userboxAvatar, userboxName, userboxStatus } from ".";
import { createNewCard, setUserData, updateAvatar } from "./api";
import { addCard } from "./card";
import { closePopup, renderLoading } from "./utils";

/* form-edit */

function handleFormEdit(evt) {
    evt.preventDefault();

    submitBtnEdit.value = renderLoading(true);

    const enteredName = nameInput.value;
    const enteredStatus = statusInput.value;

    setUserData(enteredName, enteredStatus)
    .then((res) => {
        userboxName.textContent = res.name;
        userboxStatus.textContent = res.about;
        closePopup(popupEdit);
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        submitBtnEdit.value = renderLoading(false);
    })
}

function handleFormAdd(evt) {
    evt.preventDefault();
    const enteredPlacename = nameValue.value;
    const enteredUrl = urlValue.value;

    submitBtnAdd.value = renderLoading(true);

    createNewCard(enteredPlacename, enteredUrl)
    .then((res) => {
        addCard(res);

        closePopup(popupAdd);
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        submitBtnAdd.value = renderLoading(false);
    })

    formAdd.reset();

    submitBtnAdd.disabled = true;
}

function handleFormUpdateAvatar(evt) {
    evt.preventDefault();
    const enteredUrlAvatar = urlAvatar.value;

    submitBtnUpdate.value = renderLoading(true);

    updateAvatar(enteredUrlAvatar)
    .then((res) => {
        userboxAvatar.src = res.avatar;

        closePopup(popupUpdateAvatar);
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        submitBtnUpdate.value = renderLoading(false);
    })

    formUpdateAvatar.reset();

    submitBtnUpdate.disabled = true;
}

export { handleFormEdit, handleFormAdd, handleFormUpdateAvatar }