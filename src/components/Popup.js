export default class Popup {
  constructor(popupSelector) {
    this._container = document.querySelector(popupSelector);

    this._handleEscCloseBind = this._handleEscClose.bind(this);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  open() {
    this._container.focus();
    this._container.classList.add("popup_opened");
    this._container.addEventListener("keydown", this._handleEscCloseBind);
  }

  close() {
    this._container.classList.remove("popup_opened");
    this._container.removeEventListener("keydown", this._handleEscCloseBind);
  }

  setEventListeners() {
    this._container.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains("popup_opened") ||
        evt.target.classList.contains("popup__container-close-btn")
      ) {
        this.close();
      }
    });
  }
}
