import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards, configSet } from './data.js';

// кнопки редактирования профиля и добавления карточек
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

// элементы имени и описания в профиле
const userName = document.querySelector('.profile__name');
const userBio = document.querySelector('.profile__description');

// попапы и кнопки закрытия попапа
const editPopup = document.querySelector('.popup_edit');
const addPopup = document.querySelector('.popup_add');
const hideEditPopupButton = editPopup.querySelector('.popup__close-button_type_edit');
const hideAddPopupButton = addPopup.querySelector('.popup__close-button_type_add');

// формы и поля ввода
const formList = document.querySelectorAll('.popup__form');
const editForm = editPopup.querySelector('.popup__form_type_edit');
const nameField = editPopup.querySelector('#name');
const bioField = editPopup.querySelector('#bio');
const addForm = addPopup.querySelector('.popup__form_type_add');
const captionField = addPopup.querySelector('#caption');
const linkField = addPopup.querySelector('#link');

// функции-обработчики
// открытие попапа (а также сброс форм и переключение состояния кнопки)
function showPopup(popupElement) {
  const formElement = popupElement.querySelector('.popup__form');
  if (formElement) {
    formElement.reset();
    new FormValidator(configSet, formElement).enableValidation();
  }

  popupElement.classList.add('popup_opened');
  popupElement.addEventListener('click', handleOverlay);
  document.addEventListener('keydown', handleEsc);
}

// заполнение полей редактирующей формы
function renderEditPopup () {
  nameField.value = userName.textContent;
  bioField.value = userBio.textContent;
}

// закрытие попапа
function hidePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  popupElement.removeEventListener('click', handleOverlay);
  document.removeEventListener('keydown', handleEsc);
  hideErrors(popupElement);
}

// закрытие попапа по нажатию на Escape
function handleEsc (event) {
  const openedPopup = document.querySelector('.popup_opened');
  if (event.key === 'Escape') hidePopup(openedPopup);
};

// закрытие попапа по нажатию на оверлей
function handleOverlay (event) {
  if (event.target.classList.contains('popup_opened')) hidePopup(event.target);
}

// скрытие/удаление ошибок при закрытии попапа
function hideErrors(popupElement) {
  if (popupElement.querySelector('.popup__form')) {
    const activeErrors = popupElement.querySelectorAll('.popup__error_active');
    const invalidInputs = popupElement.querySelectorAll('.popup__input_type_error');
    activeErrors.forEach((el) => el.classList.remove('popup__error_active'));
    invalidInputs.forEach((el) => el.classList.remove('popup__input_type_error'));
  }
}

// редактирование имени и описания
function editProfile(event) {
  event.preventDefault();
  userName.textContent = nameField.value;
  userBio.textContent = bioField.value;
  hidePopup(editPopup);
}

// сборка и добавление карточки на страницу
function renderCard(cardData) {
  const templateSelector = '#element-template';
  const cardElement = new Card(cardData, templateSelector, showPopup, hidePopup).getCard();
  const cards = document.querySelector('.elements__list');
  cards.prepend(cardElement);
}

// добавляем на страницу набор карточек "из коробки"
initialCards.forEach((cardData) => {
  renderCard(cardData);
});

// вешаем обработчики событий ...
// ... на кнопки
editButton.addEventListener('click', () => showPopup(editPopup));
editButton.addEventListener('click', renderEditPopup);
addButton.addEventListener('click', () => showPopup(addPopup));
hideEditPopupButton.addEventListener('click', () => hidePopup(editPopup));
hideAddPopupButton.addEventListener('click', () => hidePopup(addPopup));
// ... на формы
editForm.addEventListener('submit', editProfile);
addForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const cardData = {};
  cardData.name = captionField.value;
  cardData.link = linkField.value;

  renderCard(cardData);
  hidePopup(addPopup);
});
