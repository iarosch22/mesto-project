import { cardContainer, cardTemplate, popupImg, popupImgCaption, popupImgItem } from ".";
import { openPopup } from "./utils";

function setImageData(src, caption) {
  popupImgItem.setAttribute('src', '');
  popupImgItem.setAttribute('alt', '');

  popupImgItem.setAttribute('src', src);
  popupImgItem.setAttribute('alt', caption);
  popupImgCaption.textContent = caption;
}

function createCard(nameValue, urlValue, likesArray) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');

  cardImage.setAttribute('src', urlValue);
  cardImage.setAttribute('alt', nameValue);
  cardElement.querySelector('.card__title').textContent = nameValue;
  cardElement.querySelector('.card__like-count').textContent = likesArray.length;

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

function addCard(enteredData) {
  const cardElement = createCard(enteredData.name, enteredData.link, enteredData.likes);

  cardContainer.prepend(cardElement);
}

function renderCards(initialCards) {
  initialCards.forEach(function(item) {
      addCard(item);
  })
}

export { renderCards, addCard }