const container = document.querySelector('.page');

const userbox = container.querySelector('.userbox');
const popup = container.querySelector('.popup');

const editBtn = userbox.querySelector('.userbox__edit-btn');
const closeBtn = popup.querySelector('.popup__close-btn');


editBtn.addEventListener('click', openPopup);
closeBtn.addEventListener('click', closePopup);


function openPopup() {
    popup.classList.add('popup_opened');
}
function closePopup() {
    popup.classList.remove('popup_opened');
}

const userboxName = userbox.querySelector('.userbox__name');
const userboxStatus = userbox.querySelector('.userbox__status');

const form = popup.querySelector('.form');
const nameInput = popup.querySelector('#username');
const statusInput = popup.querySelector('#status');

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