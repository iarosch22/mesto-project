let container = document.querySelector('.page');

let userbox = container.querySelector('.userbox');
let popup = container.querySelector('.popup');

let editBtn = userbox.querySelector('.userbox__edit-btn');
let closeBtn = popup.querySelector('.popup__close-btn');


editBtn.addEventListener('click', openPopup);
closeBtn.addEventListener('click', closePopup);


function openPopup() {
    popup.classList.add('popup_opened');
}
function closePopup() {
    popup.classList.remove('popup_opened');
}