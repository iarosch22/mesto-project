import { cardContainer, cardTemplate, popupImg, popupImgCaption, popupImgItem } from ".";
import { openPopup } from "./utils";

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

function setImageData(src, caption) {
  popupImgItem.setAttribute('src', '');
  popupImgItem.setAttribute('alt', '');

  popupImgItem.setAttribute('src', src);
  popupImgItem.setAttribute('alt', caption);
  popupImgCaption.textContent = caption;
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
  cardElement.querySelector('.card__trash-btn').addEventListener('click', function () {
      cardElement.remove();
  });
  cardImage.addEventListener('click', function() {
      setImageData(urlValue, nameValue);
      openPopup(popupImg);
  });

  return cardElement;
}

function addCard(nameValue, urlValue) {
  const cardElement = createCard(nameValue, urlValue);

  cardContainer.prepend(cardElement);
}

function renderCards() {
  initialCards.forEach(function(item) {
      addCard(item.name, item.link);
  })
}

export { renderCards, addCard }