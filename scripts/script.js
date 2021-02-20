const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const hidePopupButton = popup.querySelector('.popup__close-button');

const userName = document.querySelector('.profile__name');
const userBio = document.querySelector('.profile__description');
const form = document.querySelector('.form');
const nameField = form.querySelector('.popup__input_type_name');
const bioField = form.querySelector('.popup__input_type_bio');
// const submitButton = form.querySelector('.popup__submit-button'); //

function showPopup() {
  popup.classList.add('popup_opened');
  nameField.value = userName.textContent;
  bioField.value = userBio.textContent;
};

function hidePopup() {
  popup.classList.remove('popup_opened');
}

function editProfile() {
  userName.textContent = nameField.value;
  userBio.textContent = bioField.value;
  hidePopup();
}

editButton.addEventListener('click', showPopup);
hidePopupButton.addEventListener('click', hidePopup);
form.addEventListener('submit', (event) => {
  event.preventDefault();
  editProfile();
});

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

/* function togglePopup() {
  popup.classList.toggle('.popup_opened');
}

editButton.addEventListener('click', togglePopup);
hidePopupButton.addEventListener('click', togglePopup); */
