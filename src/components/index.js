import '../pages/index.css';
import { getInitialCards, getUserInfo } from './api';
import { renderCards, setMyId } from './card';
import { handleFormAdd, handleFormEdit, handleFormUpdateAvatar } from './modal';
import { closePopup, openPopup } from './utils';
import { enableValidation } from './validate';

const container = document.querySelector('.page');

export const userbox = container.querySelector('.userbox');
export const popupEdit = container.querySelector('.popup_edit');
export const popupAdd = container.querySelector('.popup_add');
export const popupImg = container.querySelector('.popup_img');
export const popupUpdateAvatar = container.querySelector('.popup_update-avatar');
export const popups = container.querySelectorAll('.popup');

export const editBtn = userbox.querySelector('.userbox__edit-btn');
export const addBtn = userbox.querySelector('.userbox__add-btn');
export const updateAvatar = userbox.querySelector('.userbox__avatar-container');

export const popupImgItem = popupImg.querySelector('.popup__img-item');
export const popupImgCaption = popupImg.querySelector('.popup__caption-img');

export const userboxName = userbox.querySelector('.userbox__name');
export const userboxStatus = userbox.querySelector('.userbox__status');
export const userboxAvatar = userbox.querySelector('.userbox__avatar');

export const formEdit = document.forms['edit-form'];
export const nameInput = formEdit.username;
export const statusInput = formEdit.status;

export const cardContainer = container.querySelector('.cards');
export const cardTemplate = document.querySelector('#card-template').content;

export const formAdd = document.forms['add-form'];
export const nameValue = formAdd.placename;
export const urlValue = formAdd['url-place'];

export const formUpdateAvatar = document.forms['update_avatar-form'];
export const urlAvatar = formUpdateAvatar['url-avatar'];

editBtn.addEventListener('click', function() {
    nameInput.value = userboxName.textContent;
    statusInput.value = userboxStatus.textContent;
    openPopup(popupEdit);
});
addBtn.addEventListener('click', function() {
    openPopup(popupAdd);
})
updateAvatar.addEventListener('click', function() {
    openPopup(popupUpdateAvatar);
})

popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        const elem = evt.target;

        if(elem.classList.contains('popup') || elem.classList.contains('popup__close-btn')) {
            popups.forEach(function(popup) {
                if(popup.classList.contains('popup_opened')) {
                    closePopup(popup);
                }
            })
        }
    })
})

/* form-edit */

formEdit.addEventListener('submit', handleFormEdit);

/* form-add */

formAdd.addEventListener('submit', handleFormAdd);

/* form-update-avatar */

formUpdateAvatar.addEventListener('submit', handleFormUpdateAvatar);

/* validation */

enableValidation({
    formSelector: '.form',
    inputSelector: '.form__item',
    submitButtonSelector: '.form__btn',
    inactiveButtonClass: 'form__btn_state_inactive',
    inputErrorClass: 'form__item_type_error',
    errorClass: 'form__item-error_active'
});

/* render cards */

getInitialCards()
    .then((res) => {
        renderCards(res);
    })
    .catch((err) => {
        console.log(err);
    });

/* create userbox */

getUserInfo()
    .then((res) => {
        userboxName.textContent = res.name;
        userboxStatus.textContent = res.about;
        userboxAvatar.src = res.avatar;
        setMyId(res);
    })
    .catch((err) => {
        console.log(err);
        userboxName.textContent = 'Жак-Ив Кусто';
        userboxStatus.textContent = 'Исследователь океана';
        userboxAvatar.src = '<%=require("./images/avatar.png")%>';
    })

