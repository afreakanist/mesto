import 'regenerator-runtime/runtime';
import './index.css';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithConfirmButton from '../components/PopupWithConfirmButton.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import { configSet, templateSelector, cardContainerSelector,
  editPopupSelector, addPopupSelector, picturePopupSelector,
  confirmPopupSelector, updateAvatarPopupSelector, editButton,
  addButton, editForm, nameField, bioField, addForm, updateForm,
  userName, userBio, userAvatar, avatarOverlay } from '../utils/constants.js';

// API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-23',
  headers: {
    authorization: '4e889ddc-d2d9-4f86-9d14-e5fd9f0022dc',
    'Content-Type': 'application/json'
  }
});

  // информация пользователя
const userInfo = new UserInfo({ name: userName, about: userBio, avatar: userAvatar });

// экземпляры попапов
const picturePopup = new PopupWithImage(picturePopupSelector);
const editProfilePopup = new PopupWithForm(editPopupSelector, handleEditFormSubmit);
const updateAvatarPopup = new PopupWithForm(updateAvatarPopupSelector, handleAvatarSubmit);
const confirmPopup = new PopupWithConfirmButton(confirmPopupSelector, api.deleteCard);

// экземпляры валидаторов
const editFormValidator = new FormValidator(configSet, editForm);
const addFormValidator = new FormValidator(configSet, addForm);
const updateAvatarFormValidator = new FormValidator(configSet, updateForm);

// колбэки сабмита ...
// ... формы редактирования профиля
function handleEditFormSubmit(userData) {
  api.editUserInfo(userData)
    .then(data => {
      userInfo.setUserInfo(data);
      editProfilePopup.hide();
    })
    .catch(error => console.log(error))
    .finally(() => {
      editProfilePopup.renderLoading(false);
    });
}

// ... формы обновления аватара
function handleAvatarSubmit({avatar}) {
  api.updateAvatar(avatar)
    .then(data => {
      userAvatar.src = data.avatar;
      updateAvatarPopup.hide();
    })
    .catch(error => console.log(error))
    .finally(() => {
      updateAvatarPopup.renderLoading(false);
    });
}

// получаем данные при загрузке, затем отрисовываем профиль и карточки
Promise.all([
  api.getUserInfo(),
  api.getInitialCards()
])
  .then(([userData, cardsData]) => {
    userInfo.setUserInfo(userData);
    userInfo.updateAvatar(userData);

    // функция создания экземпляра карточки
    function createCard(cardData) {
      return new Card({ userData, ...cardData }, templateSelector, picturePopup, confirmPopup, api).getCard();
    };

    // ... формы добавления карточки
    function handleAddFormSubmit(cardData) {
      api.postNewCard(cardData)
        .then(data => {
        const newCard = createCard(data);
        cardContainer.addItem(newCard);
        addCardPopup.hide();
        })
        .catch(error => console.log(error))
        .finally(() => {
          addCardPopup.renderLoading(false);
        });
    };

    // контейнер с карточками
    const cardContainer = new Section((cardData) => {
      const cardElement = createCard(cardData);
      cardContainer.addItem(cardElement);
    }, cardContainerSelector);

    // отрисовываем карточки
    cardContainer.renderItems(cardsData);

    // экземпляр попапа добавления карточки
    const addCardPopup = new PopupWithForm(addPopupSelector, handleAddFormSubmit);
    // вешаем связанные слушатели
    addCardPopup.setEventListeners();
    addButton.addEventListener('click', () => {
      addCardPopup.show();
      addFormValidator.resetButtonState();
      addFormValidator.resetErrors();
    });
  })
  .catch(error => console.log(error));

// активируем валидацию форм
editFormValidator.enableValidation();
addFormValidator.enableValidation();
updateAvatarFormValidator.enableValidation();

// вешаем обработчики событий...
// ... на попапы
editProfilePopup.setEventListeners();
updateAvatarPopup.setEventListeners();
picturePopup.setEventListeners();
confirmPopup.setEventListeners();
// ... на аватар
avatarOverlay.addEventListener('click', () => {
  updateAvatarPopup.show();
  updateAvatarFormValidator.resetButtonState();
  updateAvatarFormValidator.resetErrors();
})
// ... на кнопки
editButton.addEventListener('click', () => {
  editProfilePopup.show();
  const userData = userInfo.getUserInfo();
  nameField.value = userData.name;
  bioField.value = userData.about;
  editFormValidator.resetButtonState();
  editFormValidator.resetErrors();
});
