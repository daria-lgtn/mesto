import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { onSubmit, onOpen }) {
    super(popupSelector);

    this._form = this._container.querySelector("form");
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

      this._onSubmit(this._getInputValues());
      this.close();
    });
  }

  open() {
    if (this._onOpen) {
      this._onOpen();
    }

    super.open();
  }

  close() {
    this._form.reset();
    super.close();
  }
}
