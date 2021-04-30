import Popup from './Popup.js';
export default class PopupWithConfirmButton extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._button = this._popup.querySelector('.popup__submit-button');
  }

  setArguments(card) {
    this._card = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._button.addEventListener('click', () => {
      this._submitHandler(this._card._id)
        .then(() => {
          this._card.deleteCard();
          this.hide();
        })
        .catch(error => console.log(error));
    })
  }
}
