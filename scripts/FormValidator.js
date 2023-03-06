export class FormValidator {
  constructor(options, form) {
    this._form = form;

    this._inputList = Array.from(form.querySelectorAll(options.inputSelector));
    this._buttonSubmit = form.querySelector(options.submitButtonSelector);

    this._inactiveButtonClass = options.inactiveButtonClass;
    this._inputErrorClass = options.inputErrorClass;
    this._errorSelector = options.errorSelector;
    this._errorClass = options._errorClass;
  }

  enableValidation() {
    this._toggleButtonState();

    this._form.addEventListener("submit", function (event) {
      event.preventDefault();
    });

    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._toggleInputState(input);
        this._toggleButtonState();
      });
      input.addEventListener("change", () => {
        this._toggleButtonState();
      });
    });
  }

  _toggleInputState(input) {
    const error = this._form.querySelector(this._errorSelector(input.name));

    if (!input.validity.valid) {
      input.classList.add(this._inputErrorClass);

      error.textContent = input.validationMessage;
      error.classList.add(this._errorClass);
    } else {
      input.classList.remove(this._inputErrorClass);

      error.textContent = "";
      error.classList.add(this._errorClass);
    }
  }

  _toggleButtonState() {
    if (this._inputList.some((input) => !input.validity.valid)) {
      this._buttonSubmit.classList.add(this._inactiveButtonClass);
      this._buttonSubmit.disabled = true;
    } else {
      this._buttonSubmit.classList.remove(this._inactiveButtonClass);
      this._buttonSubmit.removeAttribute("disabled");
    }
  }
}
