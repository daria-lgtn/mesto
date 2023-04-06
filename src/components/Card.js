export class Card {
  constructor(
    data,
    {
      me,
      selector,
      handleCardClick,
      handleCardLike,
      handleCardLikeUndo,
      handleCardDelete,
    }
  ) {
    this._me = me;
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._likesCount = data.likes.length;
    this._owner = data.owner._id;

    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._handleCardLike = handleCardLike;
    this._handleCardLikeUndo = handleCardLikeUndo;
    this._handleCardDelete = handleCardDelete;

    this._likeClass = "place-card__description-like-btn_active";
  }

  _getTemplateNode() {
    const templateCard = document
      .querySelector(`#${this._selector}`)
      .content.querySelector(`.${this._selector}`)
      .cloneNode(true);

    return templateCard;
  }

  _cardLike() {}

  _cardToggleLike(event) {
    if (event.target.classList.contains(this._likeClass)) {
      this._handleCardLikeUndo(this._id, () => {
        event.target.classList.remove(this._likeClass);
        this._cardElementLikeCount.textContent = --this._likesCount;
      });
    } else {
      this._handleCardLike(this._id, () => {
        event.target.classList.add(this._likeClass);
        this._cardElementLikeCount.textContent = ++this._likesCount;
      });
    }
  }

  _cardDelete() {
    this._cardElement.remove();
  }

  _setData() {
    this._cardElementIllustration.src = this._link;
    this._cardElementLikeCount.textContent = this._likesCount;
    this._cardElementIllustration.alt = `Иллюстрация '${this._name}'`;
    this._cardElementTitle.textContent = this._name;

    if (this._me !== this._owner) {
      this._cardElementButtonDelete.remove();
    }

    if (this._likes.find((e) => e._id === this._me)) {
      this._cardElementButtonLike.classList.add(this._likeClass);
    }
  }

  _setEventListeners() {
    this._cardElementButtonLike.addEventListener("click", (event) =>
      this._cardToggleLike(event)
    );
    this._cardElementButtonDelete.addEventListener("click", () => {
      this._handleCardDelete({
        id: this._id,
        onConfirm: () => this._cardDelete(),
      });
    });
    this._cardElementIllustration.addEventListener("click", () =>
      this._handleCardClick(this._link, this._name)
    );
  }

  createCardElement(me) {
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

    this._setData(me);
    this._setEventListeners();

    return this._cardElement;
  }
}
