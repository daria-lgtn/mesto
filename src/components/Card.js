export class Card {
  constructor(data, selector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes.length;

    this._selector = selector;
    this._handleCardClick = handleCardClick;
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

  _cardDelete() {
    this._cardElement.remove();
  }

  _setData() {
    this._cardElementIllustration.src = this._link;
    this._cardElementLikeCount.textContent = this._likes;
    this._cardElementIllustration.alt = `Иллюстрация '${this._name}'`;
    this._cardElementTitle.textContent = this._name;
  }

  _setEventListeners() {
    this._cardElementButtonLike.addEventListener("click", (event) =>
      this._cardToggleLike(event)
    );
    this._cardElementButtonDelete.addEventListener("click", () =>
      this._cardDelete()
    );
    this._cardElementIllustration.addEventListener("click", () =>
      this._handleCardClick(this._link, this._name)
    );
  }

  createCardElement() {
    this._cardElement = this._getTemplateNode();
    this._cardElementButtonLike = this._cardElement.querySelector(
      ".place-card__description-like-btn"
    );
    this._cardElementLikeCount = this._cardElement.querySelector(
      ".place-card__description-like-count"
    );
    this._cardElementButtonDelete = this._cardElement.querySelector(
      ".place-card__delete-btn"
    );
    this._cardElementTitle = this._cardElement.querySelector(
      ".place-card__description-title"
    );
    this._cardElementIllustration = this._cardElement.querySelector(
      ".place-card__illustration"
    );

    this._setData();
    this._setEventListeners();

    return this._cardElement;
  }
}
