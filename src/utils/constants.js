// данные для карточек "из коробки"
const initialCards = [
  {
    caption: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    caption: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    caption: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    caption: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    caption: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    caption: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// набор классов и селекторов для валидации форм
const configSet = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active'
}

// селектор шаблона карточки
const templateSelector = '#element-template';

// селектор контейнера с карточками
const cardContainerSelector = '.elements__list';

// селекторы попапов
const editPopupSelector = '.popup_edit';
const addPopupSelector = '.popup_add';
const picturePopupSelector = '.popup_picture';

// кнопки редактирования профиля и добавления карточек
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

// элементы имени и описания в профиле
const userName = document.querySelector('.profile__name');
const userBio = document.querySelector('.profile__description');

// формы и поля ввода
const formList = document.querySelectorAll('.popup__form');
const editForm = document.querySelector('.popup__form_type_edit');
const nameField = document.querySelector('#name');
const bioField = document.querySelector('#bio');
const addForm = document.querySelector('.popup__form_type_add');

export { initialCards, configSet, templateSelector, cardContainerSelector, editPopupSelector, addPopupSelector, picturePopupSelector, editButton, addButton, formList, editForm, nameField, bioField, addForm, userName, userBio }
