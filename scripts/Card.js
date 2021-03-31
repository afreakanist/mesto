export default class Card {
  constructor(cardData, templateSelector, showPopup, hidePopup) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
    this._showPopup = showPopup;
    this._hidePopup = hidePopup;
  }

  _getCardTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _generateCardElement() {
    this._cardElement = this._getCardTemplate();
    this._setEventListeners();

    this._cardElement.querySelector('.element__picture').src = this._link;
    this._cardElement.querySelector('.element__picture').alt = this._name;
    this._cardElement.querySelector('.element__description').textContent = this._name;

    return this._cardElement;
  }

  _setEventListeners() {
    const likeButton = this._cardElement.querySelector('.element__like-button');
    likeButton.addEventListener('click', () => likeButton.classList.toggle('element__like-button_active'));

    const deleteButton = this._cardElement.querySelector('.element__delete-button');
    deleteButton.addEventListener('click', () => this._cardElement.remove());

    const picturePopup = document.querySelector('.popup_picture');
    const cardPicture = this._cardElement.querySelector('.element__picture');
    const cardCaption = this._cardElement.querySelector('.element__description');
    cardPicture.addEventListener('click', () => this._showPopup(picturePopup, cardPicture, cardCaption));

    const hidePopupButton = document.querySelector('.popup__close-button_type_pic');
    hidePopupButton.addEventListener('click', () => this._hidePopup(picturePopup));
  }

  getCard() {
    return this._generateCardElement();
  }
}
