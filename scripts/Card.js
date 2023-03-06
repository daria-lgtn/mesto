export class Card {
  constructor(data, selector) {
    this._name = data.name;
    this._link = data.link;

    this._selector = selector;
  }

  _getTemplateNode() {
    const templateCard = document
      .querySelector(`#${this._selector}`)
      .content.querySelector(`.${this._selector}`)
      .cloneNode(true);

    return templateCard;
  }

  _cardToggleLike(event) {
    event.target.classList.toggle("place-card__description-like-btn_active");
  }

  _cardDelete(event) {
    event.target.closest(`.${this._selector}`).remove();
  }

  _setData() {
    this._cardElement.querySelector(".place-card__illustration").src =
      this._link;
    this._cardElement.querySelector(
      ".place-card__illustration"
    ).alt = `Иллюстрация '${this._name}'`;
    this._cardElement.querySelector(
      ".place-card__description-title"
    ).textContent = this._name;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".place-card__description-like-btn")
      .addEventListener("click", this._cardToggleLike);

    this._cardElement
      .querySelector(".place-card__delete-btn")
      .addEventListener("click", (event) => this._cardDelete(event));
  }

  createCardElement() {
    this._cardElement = this._getTemplateNode();

    this._setData();
    this._setEventListeners();

    return this._cardElement;
  }
}
