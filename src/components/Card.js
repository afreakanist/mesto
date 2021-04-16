export default class Card {
  constructor(cardData, templateSelector, handleCardClick) {
    this._caption = cardData.caption;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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

    this._cardPicture = this._cardElement.querySelector('.element__picture');
    this._cardCaption = this._cardElement.querySelector('.element__description');
    this._cardPicture.src = this._link;
    this._cardPicture.alt = this._caption;
    this._cardCaption.textContent = this._caption;

    this._setEventListeners();
    return this._cardElement;
  }

  _setEventListeners() {
    const likeButton = this._cardElement.querySelector('.element__like-button');
    likeButton.addEventListener('click', () => likeButton.classList.toggle('element__like-button_active'));

    const deleteButton = this._cardElement.querySelector('.element__delete-button');
    deleteButton.addEventListener('click', () => this._cardElement.remove());

    this._cardPicture.addEventListener('click', () => {
      this._handleCardClick.show(this._cardPicture, this._cardCaption);
    });
  }

  getCard() {
    return this._generateCardElement();
  }
}
