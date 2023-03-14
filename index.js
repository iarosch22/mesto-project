let container = document.querySelector('.page');

let userbox = container.querySelector('.userbox');
let popup = container.querySelector('.popup');

let editBtn = userbox.querySelector('.userbox__edit-btn');

editBtn.addEventListener('click', openPopup)

function openPopup() {
    popup.classList.add('popup_opened');
}