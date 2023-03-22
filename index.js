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

const userboxName = userbox.querySelector('.userbox__name');
const userboxStatus = userbox.querySelector('.userbox__status');

const form = popupEdit.querySelector('.form');
const nameInput = popupEdit.querySelector('#username');
const statusInput = popupEdit.querySelector('#status');

nameInput.value = userboxName.textContent;
statusInput.value = userboxStatus.textContent;

function handleFormSubmit(evt) {
    evt.preventDefault();
    const enteredName = nameInput.value;
    const enteredStatus = statusInput.value;

    userboxName.textContent = enteredName;
    userboxStatus.textContent = enteredStatus;

    closePopup();
}

form.addEventListener('submit', handleFormSubmit);