import Popup from './Popup.js';
export default class PopupWithForm extends Popup{
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._button = this._form.querySelector('.popup__submit-button');
    this._buttonText = this._button.textContent;
    this._submitHandler = submitHandler;
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(field => this._formValues[field.name] = field.value);

    return this._formValues;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._button.textContent = 'Сохранение...'
    } else {
      this._button.textContent = this._buttonText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.renderLoading(true);
      this._submitHandler(this._getInputValues());
    });
  }

  hide() {
    super.hide();
    this._form.reset();
  }
}
