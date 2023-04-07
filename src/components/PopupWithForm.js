import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { onSubmit, onOpen }) {
    super(popupSelector);

    this._form = this._container.querySelector("form");
    this._submitBtn = this._form.querySelector(".popup__container-save-btn");
    this._onSubmit = onSubmit;
    this._onOpen = onOpen;
  }

  _getInputValues() {
    return new FormData(this._form);
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();

      this._text = this._submitBtn.textContent.trim();
      this._submitBtn.textContent = "Сохранение...";

      this._onSubmit(this._getInputValues(), {
        data: this._data,
        onSuccess: () => {
          this.close();
        },
        onFinally: () => {
          this._submitBtn.textContent = this._text;
        }
      });
    });
  }

  open(data) {
    this._data = data;

    if (this._onOpen) {
      this._onOpen(data);
    }

    super.open();
  }

  close() {
    this._form.reset();
    super.close();
  }
}
