import { cardContainer, cardTemplate, popupImg, popupImgCaption, popupImgItem } from ".";
import { deleteCard, deleteLike, setLike } from "./api";
import { openPopup } from "./utils";

let myID = '';

function setImageData(src, caption) {
  popupImgItem.setAttribute('src', '');
  popupImgItem.setAttribute('alt', '');

  popupImgItem.setAttribute('src', src);
  popupImgItem.setAttribute('alt', caption);
  popupImgCaption.textContent = caption;
}

function createCard(enteredData, ownerCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const likesArray = enteredData.likes;
  const likeCount = cardElement.querySelector('.card__like-count');

  cardImage.setAttribute('src', enteredData.link);
  cardImage.setAttribute('alt', enteredData.name);
  cardElement.querySelector('.card__title').textContent = enteredData.name;
  likeCount.textContent = likesArray.length;

  cardElement.querySelector('.card__like-btn').addEventListener('click', (evt) => {
      setLikes(enteredData._id, evt.target, likeCount);
  });

  cardImage.addEventListener('click', function() {
      setImageData(enteredData.link, enteredData.name);
      openPopup(popupImg);
  });

  if(!(ownerCard._id === myID)) {
    cardElement.querySelector('.card__trash-btn').classList.add('card__trash-btn_hidden');
  } else {
    cardElement.querySelector('.card__trash-btn').addEventListener('click', () => {
      deleteCard(enteredData._id)
      .then(() => {
        cardElement.remove();
      })
      .catch((err) => {
        console.log(err);
      })
    });
  }

  return cardElement;
}

function addCard(enteredData) {
  const cardElement = createCard(enteredData, enteredData.owner);

  cardContainer.prepend(cardElement);
}

function renderCards(initialCards) {
  initialCards.forEach(function(item) {
      addCard(item);
  })
}

function setMyId(data) {
  myID = data._id;
}

function setLikes(cardID, btnLike, likeCount) {
  if(btnLike.classList.contains('card__like-btn_active')) {

    deleteLike(cardID)
    .then(res => {
      btnLike.classList.remove('card__like-btn_active');
      likeCount.textContent = res.likes.length;
    })
    .catch((err) => {
      console.log(err);
    })
  } else {
    setLike(cardID)
    .then(res => {
      btnLike.classList.add('card__like-btn_active');
      likeCount.textContent = res.likes.length;
    })
    .catch((err) => {
      console.log(err);
    })
  }
}

export { renderCards, addCard, setMyId }