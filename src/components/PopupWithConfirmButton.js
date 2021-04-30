import Popup from './Popup.js';
export default class PopupWithConfirmButton extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._button = this._popup.querySelector('.popup__submit-button');
  }

  getArguments(id, element) {
    this._id = id;
    this._element = element;
  }

  setEventListeners() {
    super.setEventListeners();
    this._button.addEventListener('click', () => {
      this._submitHandler(this._id)
        .then(() => {
          this._element.remove();
          this.hide();
        })
        .catch(error => console.log(error));
    })
  }
}
