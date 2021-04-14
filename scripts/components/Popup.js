export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this.hide = this.hide.bind(this);
  }

  show() {
    this._popup.classList.add('popup_opened');
    this._popup.addEventListener('click', this._handleOverlayClick);
    document.addEventListener('keydown', this._handleEscClose);
  }

  hide() {
    this._popup.classList.remove('popup_opened');
    this._popup.removeEventListener('click', this._handleOverlayClick);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose = (event) => {
    if (event.key === 'Escape') this.hide();
  }

  _handleOverlayClick = (event) => {
    if (event.target.classList.contains('popup_opened')) this.hide();
  }

  setEventListeners() {
    const hideButton = this._popup.querySelector('.popup__close-button');
    hideButton.addEventListener('click', this.hide);
  }
}
