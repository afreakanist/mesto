const editButton = document.querySelector('.profile__button_action_edit');
const popup = document.querySelector('.popup');
const hidePopupButton = popup.querySelector('.popup__close-button');

function showPopup() {
  popup.classList.add('popup_opened');
};

function hidePopup() {
  popup.classList.remove('popup_opened');
}

const userName = document.querySelector('.profile__name');
const userBio = document.querySelector('.profile__description');
const nameField = popup.querySelector('.popup__input_type_name');
const bioField = popup.querySelector('.popup__input_type_bio');
nameField.value = userName.textContent;
bioField.value = userBio.textContent;
const submitButton = popup.querySelector('.popup__submit-button');

function editProfile() {
  userName.textContent = nameField.value;
  userBio.textContent = bioField.value;
  hidePopup();
}

/* function editProfile() {
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

editButton.addEventListener('click', showPopup);
hidePopupButton.addEventListener('click', hidePopup);
submitButton.addEventListener('click', editProfile);

/* function togglePopup() {
  popup.classList.toggle('.popup_opened');
}

editButton.addEventListener('click', togglePopup);
hidePopupButton.addEventListener('click', togglePopup); */
