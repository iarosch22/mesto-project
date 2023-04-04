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
const popup = container.querySelector('.popup');
const popupEdit = container.querySelector('.popup_edit');
const popupAdd = container.querySelector('.popup_add');
const popupImg = container.querySelector('.popup_img');
const popups = container.getElementsByClassName('popup');

const editBtn = userbox.querySelector('.userbox__edit-btn');
const addBtn = userbox.querySelector('.userbox__add-btn');
const closeBtns = container.getElementsByClassName('popup__close-btn');

editBtn.addEventListener('click', function() {
    openPopup(popupEdit);
});
addBtn.addEventListener('click', function() {
    openPopup(popupAdd);
})

for(let i = 0;i < closeBtns.length;i++) {
    closeBtns[i].addEventListener('click', closePopup)
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup() {
    for(let i = 0;i < popups.length;i++) {
        if(popups[i].classList.contains('popup_opened')) {
            popups[i].classList.remove('popup_opened');
        }
    }
}

function setValues(src, caption) {
    popupImg.querySelector('.popup__img-item').setAttribute('src', '');
    popupImg.querySelector('.popup__img-item').setAttribute('alt', '');

    popupImg.querySelector('.popup__img-item').setAttribute('src', src);
    popupImg.querySelector('.popup__img-item').setAttribute('alt', caption);
    popupImg.querySelector('.popup__caption-img').textContent = caption;
}

/* form-edit */
const userboxName = userbox.querySelector('.userbox__name');
const userboxStatus = userbox.querySelector('.userbox__status');

const formEdit = popupEdit.querySelector('.form');
const nameInput = popupEdit.querySelector('#username');
const statusInput = popupEdit.querySelector('#status');

nameInput.value = userboxName.textContent;
statusInput.value = userboxStatus.textContent;

function handleFormEdit(evt) {
    evt.preventDefault();
    const enteredName = nameInput.value;
    const enteredStatus = statusInput.value;

    userboxName.textContent = enteredName;
    userboxStatus.textContent = enteredStatus;

    closePopup();
}

formEdit.addEventListener('submit', handleFormEdit);

/* form-add */

const cardContainer = container.querySelector('.cards');

function addCard(nameValue, urlValue) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').setAttribute('src', urlValue);
    cardElement.querySelector('.card__image').setAttribute('alt', nameValue);
    cardElement.querySelector('.card__title').textContent = nameValue;

    cardElement.querySelector('.card__like-btn').addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__like-btn_active');
    });
    cardElement.querySelector('.card__trash-btn').addEventListener('click', function (evt) {
        const parentElem = evt.target.parentElement;
        parentElem.remove();
    });
    cardElement.querySelector('.card__image').addEventListener('click', function(evt) {
        const elem = evt.target;
        const srcImg = elem.getAttribute('src');
        const captionImg = elem.getAttribute('alt');

        setValues(srcImg, captionImg);
        openPopup(popupImg);
    });

    cardContainer.prepend(cardElement);
}

const fordAdd = popupAdd.querySelector('.form');
const nameValue = popupAdd.querySelector('#placename');
const urlValue = popupAdd.querySelector('#url-place');

nameValue.value = nameValue.textContent;
urlValue.value = urlValue.textContent;

function handleFormAdd(evt) {
    evt.preventDefault();
    const enteredPlacename = nameValue.value;
    const enteredUrl = urlValue.value;

    addCard(enteredPlacename, enteredUrl);

    closePopup();
}

fordAdd.addEventListener('submit', handleFormAdd)

/* render cards */

function renderCard() {
    initialCards.forEach(function(item) {
        addCard(item.name, item.link);
    })
}

renderCard();