import { formAdd, formEdit, formUpdateAvatar, nameInput, nameValue, popupAdd, popupEdit, popupUpdateAvatar, statusInput, urlAvatar, urlValue, userboxAvatar, userboxName, userboxStatus } from ".";
import { createNewCard, setUserData, updateAvatar } from "./api";
import { addCard } from "./card";
import { closePopup } from "./utils";

/* form-edit */

function handleFormEdit(evt) {
    evt.preventDefault();
    const submitBtn = formEdit.querySelector('.form__btn');

    submitBtn.value = 'Сохранение...';

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
    .finally(() => {
        console.log('tutut');
        submitBtn.value = 'Сохранить';
    })

    closePopup(popupEdit);
}

function handleFormAdd(evt) {
    evt.preventDefault();
    const enteredPlacename = nameValue.value;
    const enteredUrl = urlValue.value;
    const submitBtn = formAdd.querySelector('.form__btn');
    submitBtn.value = 'Создание...';

    createNewCard(enteredPlacename, enteredUrl)
    .then((res) => {
        addCard(res);
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        submitBtn.value = 'Создание...';
    })

    formAdd.reset();

    submitBtn.disabled = true;

    closePopup(popupAdd);
}

function handleFormUpdateAvatar(evt) {
    evt.preventDefault();
    const enteredUrlAvatar = urlAvatar.value;
    const submitBtn = formUpdateAvatar.querySelector('.form__btn');
    submitBtn.value = 'Сохранение...';

    updateAvatar(enteredUrlAvatar)
    .then((res) => {
        userboxAvatar.src = res.avatar;
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        submitBtn.value = 'Сохранить';
    })


    formUpdateAvatar.reset();

    submitBtn.disabled = true;

    closePopup(popupUpdateAvatar);
}

export { handleFormEdit, handleFormAdd, handleFormUpdateAvatar }