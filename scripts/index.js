function onEscapeKeyDown(container) {
  return (event) => {
    if (event.key === "Escape") {
      container.classList.remove("popup_opened");
    }
  };
}

function popupClose(container, event) {
  if (!event || event.target === event.currentTarget) {
    container.classList.remove("popup_opened");
    document.addEventListener("keydown", onEscapeKeyDown);
  }
}

function popupOpen(container) {
  container.focus();
  container.classList.add("popup_opened");
  document.addEventListener("keydown", onEscapeKeyDown);
}

function setInputValue(input, value) {
  input.value = value;
  input.dispatchEvent(new Event("change"));
}

//  popupCard

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

function appendCard(container, info) {
  const cardElement = createCardElement(info);
  container.prepend(cardElement);
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

  setInputValue(popupCardInputName, "");
  setInputValue(popupCardInputLink, "");

  appendCard(data);
  popupCardClose();
}

popupCardContainer.addEventListener("click", popupCardClose);
popupCardCloseButton.addEventListener("click", popupCardClose);
popupCardOpenButton.addEventListener("click", popupCardOpen);
popupCardForm.addEventListener("submit", popupCardSubmitHandler);

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

for (let i = 0; i < initialCards.length; i++) {
  appendCard(cardsContainer, initialCards[i]);
}

//  popupPreview

const popupPreviewContainer = document.querySelector(".popup_type-preview");
const popupPreviewImage = popupPreviewContainer.querySelector(
  ".popup__container-preview-illustration"
);
const popupPreviewName = popupPreviewContainer.querySelector(
  ".popup__container-preview-name"
);
const popupPreviewCloseButton = popupPreviewContainer.querySelector(
  ".popup__container-close-btn"
);

function popupPreviewOpen(data) {
  popupPreviewImage.src = data.link;
  popupPreviewImage.alt = `Иллюстрация '${data.name}'`;
  popupPreviewName.textContent = data.name;

  popupOpen(popupPreviewContainer);
}

function popupPreviewClose(event) {
  popupClose(popupPreviewContainer, event);
}

popupPreviewContainer.addEventListener("click", popupPreviewClose);
popupPreviewCloseButton.addEventListener("click", popupPreviewClose);

//  popupProfile

const popupProfileOpenButton = document.querySelector(
  ".traveller__info-full-name-edit-btn"
);
const pageProfileInputName = document.querySelector(
  ".traveller__info-full-name-label"
);
const pageProfileInputDescription = document.querySelector(
  ".traveller__info-description"
);

const popupProfileContainer = document.querySelector(".popup_type-profile");
const popupProfileCloseButton = popupProfileContainer.querySelector(
  ".popup__container-close-btn"
);
const popupProfileForm = popupProfileContainer.querySelector(
  ".popup__container-form"
);
const popupProfileInputName = popupProfileContainer.querySelector(
  ".popup__container-input_type-name"
);
const popupProfileInputDescription = popupProfileContainer.querySelector(
  ".popup__container-input_type-description"
);

function popupProfileClose(event) {
  return popupClose(popupProfileContainer, event);
}

function popupProfileOpen() {
  setInputValue(popupProfileInputName, pageProfileInputName.textContent.trim());
  setInputValue(
    popupProfileInputDescription,
    pageProfileInputDescription.textContent.trim()
  );

  popupOpen(popupProfileContainer);
}

function popupProfileSubmitHandler(event) {
  event.preventDefault();

  pageProfileInputName.textContent = popupProfileInputName.value;
  pageProfileInputDescription.textContent = popupProfileInputDescription.value;

  popupProfileClose();
}

popupProfileContainer.addEventListener("click", popupProfileClose);
popupProfileCloseButton.addEventListener("click", popupProfileClose);
popupProfileOpenButton.addEventListener("click", popupProfileOpen);
popupProfileForm.addEventListener("submit", popupProfileSubmitHandler);
