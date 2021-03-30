export default class FormValidator {
  constructor(configSet, formElement) {
    this._configSet = configSet;
    this._formElement = formElement;
  }

  _showError(input, errorMessage) {
    const error = this._formElement.querySelector(`.${input.id}-error`);
    input.classList.add(this._configSet.inputErrorClass);
    error.textContent = errorMessage;
    error.classList.add(this._configSet.errorClass);
  }

  _hideError(input) {
    const error = this._formElement.querySelector(`.${input.id}-error`);
    input.classList.remove(this._configSet.inputErrorClass);
    error.classList.remove(this._configSet.errorClass);
    error.textContent = '';
  };

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showError(input, input.validationMessage);
    } else {
      this._hideError(input);
    }
  };

  _hasInvalidInput(inputs) {
    return inputs.some((input) => {
      return !input.validity.valid;
    })
  }

  _toggleButtonState(inputs, button) {
    if (this._hasInvalidInput(inputs)) {
      button.classList.add(this._configSet.inactiveButtonClass);
      button.setAttribute('disabled', 'disabled');
    } else {
      button.classList.remove(this._configSet.inactiveButtonClass);
      button.removeAttribute('disabled');
    }
  }

  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._configSet.inputSelector));
    const button = this._formElement.querySelector(this._configSet.submitButtonSelector);
    this._toggleButtonState(inputList, button);
    inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState(inputList, button);
      })
    })
  }

  enableValidation() {
    this._setEventListeners();
  }
}
