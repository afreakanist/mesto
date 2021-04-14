import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  show(cardPicture, cardCaption) {
    super.show();
    const fullPicture = this._popup.querySelector('.popup__picture');
    const fullPictureCaption = this._popup.querySelector('.popup__picture-caption');

    fullPicture.src = cardPicture.src;
    fullPictureCaption.textContent = cardCaption.textContent;
    fullPicture.alt = fullPictureCaption.textContent;
  }
}
