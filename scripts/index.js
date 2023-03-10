import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const formValidators = {};
const enableValidation = (options) => {
  const formList = Array.from(document.querySelectorAll(options.formSelector));

  formList.forEach((entry) => {
    const form = new FormValidator(options, entry);
    form.enableValidation();

    const formName = entry.getAttribute("name");
    formValidators[formName] = form;
  });
};

enableValidation({
  formSelector: ".popup__container-form",
  inputSelector: ".popup__container-input",
  submitButtonSelector: ".popup__container-save-btn",
  inactiveButtonClass: "popup__container-save-btn_inactive",
  inputErrorClass: "popup__container-input_error",
  errorClass: "popup__container-input-error_active",
  errorSelector: (name) => `.popup__container-input-${name}-error`,
});

function onEscapeKeyDown(event) {
  if (event.key === "Escape") {
    closePopup(event.target, event);
  }
}

function closePopup(container, event) {
  if (!event || event.target === event.currentTarget) {
    container.classList.remove("popup_opened");
    container.removeEventListener("keydown", onEscapeKeyDown);
  }
}

function openPopup(container) {
  container.focus();
  container.classList.add("popup_opened");
  container.addEventListener("keydown", onEscapeKeyDown);
}

//  popupCard

const popupCardOpenButton = document.querySelector(".traveller__add-image-btn");
const popupCardContainer = document.querySelector(".popup_type-card");
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

function createCard(info) {
  const card = new Card(info, "place-card", openPopupPreview);
  const cardElement = card.createCardElement();

  return cardElement;
}

function openPopupCard(event) {
  formValidators["card-edit"].resetValidation();
  openPopup(popupCardContainer, event);
}

function submitPopupCard(event) {
  event.preventDefault();

  const data = {
    name: popupCardInputName.value,
    link: popupCardInputLink.value,
  };

  const cardElement = createCard(data);
  cardsContainer.prepend(cardElement);

  event.target.reset();
  closePopup(popupCardContainer, event);
}

popupCardOpenButton.addEventListener("click", openPopupCard);
popupCardForm.addEventListener("submit", submitPopupCard);

const initialCards = [
  {
    name: "??????????",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "?????????????????????? ??????????????",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "??????????????",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "????????????????",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "???????????????????????? ??????????",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "????????????",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

for (let i = 0; i < initialCards.length; i++) {
  const cardElement = createCard(initialCards[i]);
  cardsContainer.prepend(cardElement);
}

//  popupPreview

const popupPreviewContainer = document.querySelector(".popup_type-preview");
const popupPreviewImage = popupPreviewContainer.querySelector(
  ".popup__container-preview-illustration"
);
const popupPreviewName = popupPreviewContainer.querySelector(
  ".popup__container-preview-name"
);

function openPopupPreview(link, name) {
  popupPreviewImage.src = link;
  popupPreviewImage.alt = `?????????????????????? '${name}'`;
  popupPreviewName.textContent = name;

  openPopup(popupPreviewContainer);
}

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
const popupProfileForm = popupProfileContainer.querySelector(
  ".popup__container-form"
);
const popupProfileInputName = popupProfileContainer.querySelector(
  ".popup__container-input_type-name"
);
const popupProfileInputDescription = popupProfileContainer.querySelector(
  ".popup__container-input_type-description"
);

function openPopupProfile() {
  popupProfileInputName.value = pageProfileInputName.textContent.trim();
  popupProfileInputDescription.value =
    pageProfileInputDescription.textContent.trim();

  formValidators["profile-edit"].resetValidation();
  openPopup(popupProfileContainer);
}

function submitPopupProfile(event) {
  event.preventDefault();

  pageProfileInputName.textContent = popupProfileInputName.value;
  pageProfileInputDescription.textContent = popupProfileInputDescription.value;

  closePopup(popupProfileContainer, event);
}

popupProfileOpenButton.addEventListener("click", openPopupProfile);
popupProfileForm.addEventListener("submit", submitPopupProfile);

const popups = document.querySelectorAll(".popup");
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (
      evt.target.classList.contains("popup_opened") ||
      evt.target.classList.contains("popup__container-close-btn")
    ) {
      closePopup(popup);
    }
  });
});
