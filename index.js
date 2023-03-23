const container = document.querySelector('.page');

const userbox = container.querySelector('.userbox');
const popup = container.querySelector('.popup');
const popupEdit = container.querySelector('.popup_edit');
const popupAdd = container.querySelector('.popup_add');
const popups = container.getElementsByClassName('popup');

const editBtn = userbox.querySelector('.userbox__edit-btn');
const addBtn = userbox.querySelector('.userbox__add-btn');
const closeBtns = container.getElementsByClassName('popup__close-btn');

editBtn.addEventListener('click', function() {
    popupEdit.classList.add('popup_opened');
});
addBtn.addEventListener('click', function() {
    popupAdd.classList.add('popup_opened');
})

for(let i = 0;i < closeBtns.length;i++) {
    closeBtns[i].addEventListener('click', closePopup)
}

function closePopup() {
    for(let i = 0;i < popups.length;i++) {
        if(popups[i].classList.contains('popup_opened')) {
            popups[i].classList.remove('popup_opened');
        }
    }
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

    cardContainer.append(cardElement);
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