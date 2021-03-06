export default class Card {
  constructor({ userData, name, link, _id, likes, owner }, templateSelector, handleCardClick, handleDeleteClick, api) {
    this._caption = name;
    this._link = link;
    this._id = _id;
    this._likes = likes;
    this._owner = owner;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this.api = api;
    this._myId = userData._id;
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
    this._cardLikes = this._cardElement.querySelector('.element__like-count');
    this._likeButton = this._cardElement.querySelector('.element__like-button');
    this._cardPicture.src = this._link;
    this._cardPicture.alt = this._caption;
    this._cardCaption.textContent = this._caption;
    this._cardLikes.textContent = this._likes.length;
    const isLikedByMe = this._likes.some((user) => user._id === this._myId);
    if (isLikedByMe) this._likeButton.classList.add('element__like-button_active');

    this._setEventListeners();
    return this._cardElement;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      if (!this._likeButton.classList.contains('element__like-button_active')) {
        this.api.like(this._id)
          .then(data => {
            this._cardLikes.textContent = data.likes.length;
            this._likeButton.classList.add('element__like-button_active');
          })
          .catch(error => console.log(error));
      } else {
        this.api.unlike(this._id)
          .then(data => {
            this._cardLikes.textContent = data.likes.length;
            this._likeButton.classList.remove('element__like-button_active');
          })
          .catch(error => console.log(error));
      }
    });

    const deleteButton = this._cardElement.querySelector('.element__delete-button');
    if (this._owner._id !== this._myId) {
      deleteButton.remove();
    } else {
      deleteButton.addEventListener('click', () => {
        this._handleDeleteClick.show();
        this._handleDeleteClick.setArguments(this);
      });
    }

    this._cardPicture.addEventListener('click', () => {
      this._handleCardClick.show(this._cardPicture, this._cardCaption);
    });
  }

  deleteCard() {
    this._cardElement.remove();
  }

  getCard() {
    return this._generateCardElement();
  }
}
