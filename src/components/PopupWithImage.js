import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, { imageSelector, labelSelector }) {
    super(popupSelector);

    this._image = this._container.querySelector(imageSelector);
    this._label = this._container.querySelector(labelSelector);
  }

  open(link, name) {
    this._image.src = link;
    this._image.alt = `Иллюстрация '${name}'`;
    this._label.textContent = name;
    super.open();
  }
}
