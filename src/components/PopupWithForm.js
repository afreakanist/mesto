import Popup from './Popup.js';
export default class PopupWithForm extends Popup{
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._submitHandler = submitHandler;
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(field => this._formValues[field.name] = field.value);

    return this._formValues;
  }

  _innerSubmitHandler = (event) => {
    event.preventDefault();
    this._submitHandler(this._getInputValues());
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._innerSubmitHandler);
  }

  hide() {
    super.hide();
    this._form.reset();
  }
}
