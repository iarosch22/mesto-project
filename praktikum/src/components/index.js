import '../pages/index.css';
import { enableValidation } from './validate';

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

const container = document.querySelector('.page');

const userbox = container.querySelector('.userbox');
const popupEdit = container.querySelector('.popup_edit');
const popupAdd = container.querySelector('.popup_add');
const popupImg = container.querySelector('.popup_img');
const popups = container.querySelectorAll('.popup');

const editBtn = userbox.querySelector('.userbox__edit-btn');
const addBtn = userbox.querySelector('.userbox__add-btn');

const popupImgItem = popupImg.querySelector('.popup__img-item');
const popupImgCaption = popupImg.querySelector('.popup__caption-img');

const userboxName = userbox.querySelector('.userbox__name');
const userboxStatus = userbox.querySelector('.userbox__status');

const formEdit = document.forms['edit-form'];
const nameInput = formEdit.username;
const statusInput = formEdit.status;

const cardContainer = container.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template').content;

const formAdd = document.forms['add-form'];
const nameValue = formAdd.placename;
const urlValue = formAdd['url-place'];

document.addEventListener('keydown', function(evt) {
    if(evt.key === 'Escape') {
        popups.forEach(function(popup) {
            if(popup.classList.contains('popup_opened')) {
                closePopup(popup);
            }
        })
    }
})

editBtn.addEventListener('click', function() {
    nameInput.value = userboxName.textContent;
    statusInput.value = userboxStatus.textContent;
    openPopup(popupEdit);
});
addBtn.addEventListener('click', function() {
    openPopup(popupAdd);
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

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function setImageData(src, caption) {
    popupImgItem.setAttribute('src', '');
    popupImgItem.setAttribute('alt', '');

    popupImgItem.setAttribute('src', src);
    popupImgItem.setAttribute('alt', caption);
    popupImgCaption.textContent = caption;
}

/* form-edit */

function handleFormEdit(evt) {
    evt.preventDefault();
    const enteredName = nameInput.value;
    const enteredStatus = statusInput.value;

    userboxName.textContent = enteredName;
    userboxStatus.textContent = enteredStatus;

    closePopup(popupEdit);
}

formEdit.addEventListener('submit', handleFormEdit);

/* form-add */

function addCard(nameValue, urlValue) {
    const cardElement = createCard(nameValue, urlValue);

    cardContainer.prepend(cardElement);
}

function createCard(nameValue, urlValue) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');

    cardImage.setAttribute('src', urlValue);
    cardImage.setAttribute('alt', nameValue);
    cardElement.querySelector('.card__title').textContent = nameValue;

    cardElement.querySelector('.card__like-btn').addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__like-btn_active');
    });
    cardElement.querySelector('.card__trash-btn').addEventListener('click', function (evt) {
        cardElement.remove();
    });
    cardImage.addEventListener('click', function(evt) {
        setImageData(urlValue, nameValue);
        openPopup(popupImg);
    });

    return cardElement;
}

nameValue.value = nameValue.textContent;
urlValue.value = urlValue.textContent;

function handleFormAdd(evt) {
    evt.preventDefault();
    const enteredPlacename = nameValue.value;
    const enteredUrl = urlValue.value;

    addCard(enteredPlacename, enteredUrl);

    formAdd.reset();

    closePopup(popupAdd);
}

formAdd.addEventListener('submit', handleFormAdd)

/* render cards */

function renderCards() {
    initialCards.forEach(function(item) {
        addCard(item.name, item.link);
    })
}

renderCards();


// validation 

enableValidation({
    formSelector: '.form',
    inputSelector: '.form__item',
    submitButtonSelector: '.form__btn',
    inactiveButtonClass: 'form__btn_state_inactive',
    inputErrorClass: 'form__item_type_error',
    errorClass: 'form__item-error_active'
  }); 