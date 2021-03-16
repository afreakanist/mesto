// кнопки редактирования профиля и добавления карточек
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

// элементы имени и описания в профиле
const userName = document.querySelector('.profile__name');
const userBio = document.querySelector('.profile__description');

// попапы и кнопки закрытия попапа
const popups = document.querySelectorAll('.popup');
const editPopup = document.querySelector('.popup_edit');
const addPopup = document.querySelector('.popup_add');
const picturePopup = document.querySelector('.popup_picture');
const hidePopupButtons = document.querySelectorAll('.popup__close-button');

// формы и поля ввода
const editForm = editPopup.querySelector('.popup__form_type_edit');
const nameField = editPopup.querySelector('#popup__input_type_name');
const bioField = editPopup.querySelector('#popup__input_type_bio');
const addForm = addPopup.querySelector('.popup__form_type_add');
const captionField = addPopup.querySelector('#popup__input_type_caption');
const linkField = addPopup.querySelector('#popup__input_type_link');

// развёрнутая картинка с подписью
const fullPicture = picturePopup.querySelector('.popup__picture');
const fullPictureCaption = picturePopup.querySelector('.popup__picture-caption');

// функции-обработчики
// открытие попапа
function showPopup(popupElement) {
  const childForm = popupElement.querySelector('.popup__form');
  if (childForm) {
    childForm.reset();
    const inputs = Array.from(childForm.querySelectorAll('.popup__input'));
    const button = childForm.querySelector('.popup__submit-button');
    toggleButtonState(inputs, button);
  }
  popupElement.classList.add('popup_opened');
}

// заполнение полей редактирующей формы
function renderEditPopup () {
  nameField.value = userName.textContent;
  bioField.value = userBio.textContent;
}

// закрытие попапа
function hidePopup(event) {
  const popup = event.target.closest('.popup');
  popup.classList.remove('popup_opened');
}

// редактирование имени и описания
function editProfile(event) {
  event.preventDefault();
  userName.textContent = nameField.value;
  userBio.textContent = bioField.value;
  hidePopup(event);
}

// генерирование, заполнение и добавление карточки на страницу
function getCard(cardData) {
  const cardTemplate = document.querySelector('#element-template').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

  const cardPicture = cardElement.querySelector('.element__picture');
  const cardCaption = cardElement.querySelector('.element__description');
  cardPicture.src = cardData.link;
  cardCaption.textContent = cardData.name;
  cardPicture.alt = cardCaption.textContent;

  cardElement.querySelector('.element__like-button').addEventListener('click', likeCard);
  cardElement.querySelector('.element__delete-button').addEventListener('click', deleteCard);
  cardPicture.addEventListener('click', showFullPicture);

  return cardElement;
}

// удаление карточки
function deleteCard(event) {
  const target = event.target;
  const parentCard = target.closest('.element');
  parentCard.remove();
}

// проставление лайков
function likeCard(event) {
  const target = event.target;
  target.classList.toggle('element__like-button_active');
}

// открытие попапа с полной картинкой и подписью
function showFullPicture(event) {
  showPopup(picturePopup);

  const target = event.target;
  const parentCard = target.closest('.element');
  const cardPicture = parentCard.querySelector('.element__picture');
  const cardCaption = parentCard.querySelector('.element__description');

  fullPicture.src = cardPicture.src;
  fullPictureCaption.textContent = cardCaption.textContent;
  fullPicture.alt = fullPictureCaption.textContent;
}

// заполнение карточки данными
function renderCard(cardData) {
  const cardElement = getCard(cardData);
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
hidePopupButtons.forEach((btn) => btn.addEventListener('click', hidePopup));
// ... на оверлей
popups.forEach((popupElement) => {
  popupElement.addEventListener('click', (event) => {
    if (event.target.classList.contains('popup_opened')) {
      hidePopup(event);
    }
    // event.stopPropagation();
  })
});
// ... на формы
editForm.addEventListener('submit', editProfile);
addForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const cardData = {};
  cardData.name = captionField.value;
  cardData.link = linkField.value;

  renderCard(cardData);

  // addForm.reset();
  hidePopup(event);
});
