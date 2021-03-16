function showError(form, input, errorMessage) {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.add('popup__input_type_error');
  error.textContent = errorMessage;
  error.classList.add('popup__error_active');
};

function hideError(form, input) {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.remove('popup__input_type_error');
  error.classList.remove('popup__error_active');
  error.textContent = '';
};

function checkInputValidity(form, input) {
  if (!input.validity.valid) {
    showError(form, input, input.validationMessage);
  } else {
    hideError(form, input);
  }
};

function hasInvalidInput(inputs) {
  return inputs.some((input) => {
    return !input.validity.valid;
  })
}

function toggleButtonState(inputs, button) {
  if (hasInvalidInput(inputs)) {
    button.classList.add('popup__submit-button_disabled');
    // button.setAttribute('disabled', 'disabled');
  } else {
    button.classList.remove('popup__submit-button_disabled');
    // button.removeAttribute('disabled');
  }
}

function setEventListeners(form) {
  const inputList = Array.from(form.querySelectorAll('.popup__input'));
  const button = form.querySelector('.popup__submit-button');
  toggleButtonState(inputList, button);
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(form, input);
      toggleButtonState(inputList, button);
    })
  })
};

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((form) => {
    form.addEventListener('submit', (event) => event.preventDefault());
    setEventListeners(form);
  });
};

enableValidation();
