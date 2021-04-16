import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import { initialCards, configSet, templateSelector, cardContainerSelector,
  editPopupSelector, addPopupSelector, picturePopupSelector,
  editButton, addButton, editForm, nameField, bioField, addForm,
  userName as username, userBio as bio } from '../utils/constants.js';

  // информация пользователя
const userInfo = new UserInfo({ username, bio });

// экземпляры попапов
const picturePopup = new PopupWithImage(picturePopupSelector);
const editProfilePopup = new PopupWithForm(editPopupSelector, handleEditFormSubmit);
const addCardPopup = new PopupWithForm(addPopupSelector, handleAddFormSubmit);

//экземпляры валидаторов
const editFormValidator = new FormValidator(configSet, editForm);
const addFormValidator = new FormValidator(configSet, addForm);

// функция создания экземпляра карточки
function createCard(cardData) {
  return new Card(cardData, templateSelector, picturePopup).getCard();
}

// колбэки сабмита ...
// ... формы редактирования профиля
function handleEditFormSubmit(userData) {
  userInfo.setUserInfo(userData);
  editProfilePopup.hide();
}

// ... формы добавления карточки
function handleAddFormSubmit(cardData) {
  const newCard = createCard(cardData);
  cardContainer.addItem(newCard);
  addCardPopup.hide();
}

// добавляем в контейнер набор карточек "из коробки"
const cardContainer = new Section({
  items: initialCards,
  renderer: (cardData) => {
    const cardElement = createCard(cardData);
    cardContainer.addItem(cardElement);
  }
}, cardContainerSelector);

cardContainer.renderItems();

// активируем валидацию форм
editFormValidator.enableValidation();
addFormValidator.enableValidation();

// вешаем обработчики событий...
// ... на попапы
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
picturePopup.setEventListeners();
// ... на кнопки
editButton.addEventListener('click', () => {
  editProfilePopup.show();
  const userData = userInfo.getUserInfo();
  nameField.value = userData.username;
  bioField.value = userData.bio;
  editFormValidator.resetButtonState();
  editFormValidator.resetErrors();
});
addButton.addEventListener('click', () => {
  addCardPopup.show();
  addFormValidator.resetButtonState();
  addFormValidator.resetErrors();
});
