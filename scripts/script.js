// данные для карточек "из коробки"
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// кнопки редактирования профиля и добавления карточек
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

// элементы имени и описания в профиле
const userName = document.querySelector('.profile__name');
const userBio = document.querySelector('.profile__description');

// попапы и кнопки закрытия попапа
const editPopup = document.querySelector('.popup_edit');
const addPopup = document.querySelector('.popup_add');
const picturePopup = document.querySelector('.popup_picture');
const hidePopupButtons = document.querySelectorAll('.popup__close-button');

// формы и поля ввода
const editForm = editPopup.querySelector('.edit-form');
const nameField = editPopup.querySelector('.popup__input_type_name');
const bioField = editPopup.querySelector('.popup__input_type_bio');
const addForm = addPopup.querySelector('.add-form');
const captionField = addPopup.querySelector('.popup__input_type_caption');
const linkField = addPopup.querySelector('.popup__input_type_link');

// развёрнутая картинка с подписью
const fullPicture = picturePopup.querySelector('.popup__picture');
const fullPictureCaption = picturePopup.querySelector('.popup__picture-caption');

// функции-обработчики
// открытие попапа
function showPopup(popupElement) {
  popupElement.classList.toggle('popup_opened');
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
function addCard(cardData) {
  const cardTemplate = document.querySelector('#element-template').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

  const cardPicture = cardElement.querySelector('.element__picture');
  const cardCaption = cardElement.querySelector('.element__description');
  cardPicture.src = cardData.link;
  cardCaption.textContent = cardData.name;
  cardPicture.alt = cardCaption.textContent;

  const cards = document.querySelector('.elements__list');
  cardElement.querySelector('.element__like-button').addEventListener('click', function (event) {
    const target = event.target;
    target.classList.toggle('element__like-button_active');
  });
  cardElement.querySelector('.element__delete-button').addEventListener('click', function (event) {
    const target = event.target;
    const parentCard = target.closest('.element');
    parentCard.remove();
  });
  cards.prepend(cardElement);

  cardPicture.addEventListener('click', function () {
    showPopup(picturePopup);

    fullPicture.src = cardPicture.src;
    fullPictureCaption.textContent = cardCaption.textContent;
  });
}

// добавляем на страницу набор карточек "из коробки"
initialCards.forEach((cardData) => {
  addCard(cardData);
});

// вешаем обработчики событий
editButton.addEventListener('click', () => showPopup(editPopup));
editButton.addEventListener('click', renderEditPopup);
addButton.addEventListener('click', () => showPopup(addPopup));
hidePopupButtons.forEach((btn) => btn.addEventListener('click', hidePopup));
editForm.addEventListener('submit', editProfile);
addForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const cardData = {};
  cardData.name = captionField.value;
  cardData.link = linkField.value;

  addCard(cardData);

  captionField.value = '';
  linkField.value = '';
  hidePopup(event);
});

/*
// генерирование "рыбы" карточки
function generateCard() {
  const cardTemplate = document.querySelector('#element-template').content;
  const card = cardTemplate.querySelector('.element').cloneNode(true);
  return card;
}

// cбор данных о новой карточке
function collectNewCardData() {
  const cardData = {};
  cardData.name = captionField.value;
  cardData.link = linkField.value;
  return cardData;
}

// заполнение карточки данными
function fillInCard(cardElement, cardData) {
  const cardPicture = cardElement.querySelector('.element__picture');
  const cardCaption = cardElement.querySelector('.element__description');
  cardPicture.src = cardData.link;
  cardCaption.textContent = cardData.name;
}

//добавление к. в блок с карточками
function addCard(card) {
  const cards = document.querySelector('.elements__list');
  cards.prepend(card);
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

// редактирование профиля
 function editProfile() {
  const nameField = popup.querySelector('.popup__input_type_name');
  const bioField = popup.querySelector('.popup__input_type_bio');
  if (nameField.value !== '') {
    userName.textContent = nameField.value;
    nameField.value = '';
  }
  if (bioField.value !== '') {
    userBio.textContent = bioField.value;
    bioField.value = '';
  }

  hidePopup();
} */
