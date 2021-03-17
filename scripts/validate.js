function showError(selectors, form, input, errorMessage) {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.add(selectors.inputErrorClass);
  error.textContent = errorMessage;
  error.classList.add(selectors.errorClass);
};

function hideError(selectors, form, input) {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.remove(selectors.inputErrorClass);
  error.classList.remove(selectors.errorClass);
  error.textContent = '';
};

function checkInputValidity(selectors, form, input) {
  if (!input.validity.valid) {
    showError(selectors, form, input, input.validationMessage);
  } else {
    hideError(selectors, form, input);
  }
};

function hasInvalidInput(inputs) {
  return inputs.some((input) => {
    return !input.validity.valid;
  })
}

function toggleButtonState(selectors, inputs, button) {
  if (hasInvalidInput(inputs)) {
    button.classList.add(selectors.inactiveButtonClass);
    // button.setAttribute('disabled', 'disabled');
  } else {
    button.classList.remove(selectors.inactiveButtonClass);
    // button.removeAttribute('disabled');
  }
}

function setEventListeners(selectors, form) {
  const inputList = Array.from(form.querySelectorAll(selectors.inputSelector));
  const button = form.querySelector(selectors.submitButtonSelector);
  toggleButtonState(selectors, inputList, button);
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(selectors, form, input);
      toggleButtonState(selectors, inputList, button);
    })
  })
};

function enableValidation(selectors) {
  const formList = Array.from(document.querySelectorAll(selectors.formSelector));
  formList.forEach((form) => {
    form.addEventListener('submit', (event) => event.preventDefault());
    setEventListeners(selectors, form);
  });
};

const selectorSet = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active'
}

enableValidation(selectorSet);
