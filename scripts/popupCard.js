const popupCardOpenButton = document.querySelector(".traveller__add-image-btn");
const popupCardContainer = document.querySelector(".popup_type-card");
const popupCardCloseButton = popupCardContainer.querySelector(
  ".popup__container-close-btn"
);
const popupCardForm = popupCardContainer.querySelector(
  ".popup__container-form"
);
const popupCardInputName = popupCardContainer.querySelector(
  ".popup__container-input_type-name"
);
const popupCardInputLink = popupCardContainer.querySelector(
  ".popup__container-input_type-link"
);

const cardsContainer = document.querySelector(".places");
const templateCard = document
  .querySelector("#place-card")
  .content.querySelector(".place-card");

function cardToggleLike(event) {
  event.target.classList.toggle("place-card__description-like-btn_active");
}

function cardDelete(event) {
  event.target.closest(".place-card").remove();
}

function createCardElement(info) {
  const cardElement = templateCard.cloneNode(true);

  cardElement.querySelector(".place-card__illustration").src = info.link;
  cardElement.querySelector(
    ".place-card__illustration"
  ).alt = `Иллюстрация '${info.name}'`;
  cardElement.querySelector(".place-card__description-title").textContent =
    info.name;

  cardElement
    .querySelector(".place-card__description-like-btn")
    .addEventListener("click", cardToggleLike);

  cardElement
    .querySelector(".place-card__delete-btn")
    .addEventListener("click", cardDelete);

  cardElement
    .querySelector(".place-card__illustration")
    .addEventListener("click", () => popupPreviewOpen(info));

  return cardElement;
}

function appendCard(info) {
  const cardElement = createCardElement(info);
  cardsContainer.prepend(cardElement);
}

for (let i = 0; i < initialCards.length; i++) {
  appendCard(initialCards[i]);
}

function popupCardClose(event) {
  popupClose(popupCardContainer, event);
}

function popupCardOpen(event) {
  popupOpen(popupCardContainer, event);
}

function popupCardSubmitHandler(event) {
  event.preventDefault();

  const data = {
    name: popupCardInputName.value,
    link: popupCardInputLink.value,
  };

  appendCard(data);
  popupCardClose();
}

popupCardContainer.addEventListener("click", popupCardClose);
popupCardCloseButton.addEventListener("click", popupCardClose);
popupCardOpenButton.addEventListener("click", popupCardOpen);
popupCardForm.addEventListener("submit", popupCardSubmitHandler);
