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

const popupCardOpenButton = document.querySelector(".traveller__add-image-btn");
const popupCardContainer = document.querySelector(".popup_type_card");
const popupCardCloseButton = popupCardContainer.querySelector(
  ".popup__container-close-btn"
);
const popupCardForm = popupCardContainer.querySelector(
  ".popup__container-form"
);
const popupCardInputName = popupCardContainer.querySelector(
  ".popup__container-input_type_name"
);
const popupCardInputLink = popupCardContainer.querySelector(
  ".popup__container-input_type_link"
);

const popupPreviewContainer = document.querySelector(".popup_type_preview");
const popupPreviewImage = popupPreviewContainer.querySelector(
  ".popup__container-preview-illustration"
);
const popupPreviewName = popupPreviewContainer.querySelector(
  ".popup__container-preview-name"
);
const popupPreviewCloseButton = popupPreviewContainer.querySelector(
  ".popup__container-close-btn"
);

function appendCard(info) {
  const cardTemplate = document.querySelector("#place-card").content;

  const cardElement = cardTemplate.querySelector(".place-card").cloneNode(true);

  cardElement.querySelector(".place-card__illustration").src = info.link;
  cardElement.querySelector(
    ".place-card__illustration"
  ).alt = `Иллюстрация '${info.name}'`;
  cardElement.querySelector(".place-card__description-title").textContent =
    info.name;

  cardElement
    .querySelector(".place-card__description-like-btn")
    .addEventListener("click", function (event) {
      event.target.classList.toggle("place-card__description-like-btn_active");
    });

  cardElement
    .querySelector(".place-card__delete-btn")
    .addEventListener("click", function (event) {
      event.target.parentElement.remove();
    });

  cardElement
    .querySelector(".place-card__illustration")
    .addEventListener("click", function () {
      popupPreviewImage.src = info.link;
      popupPreviewImage.alt = `Иллюстрация '${info.name}'`;

      popupPreviewName.textContent = info.name;
      popupPreviewContainer.classList.add("popup_opened");
    });

  const cardsContainer = document.querySelector(".places");
  cardsContainer.prepend(cardElement);
}

for (let i = 0; i < initialCards.length; i++) {
  appendCard(initialCards[i]);
}

function popupCardClose() {
  popupCardContainer.classList.remove("popup_opened");
}

function popupCardOpen() {
  popupCardContainer.classList.add("popup_opened");
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

popupCardCloseButton.addEventListener("click", popupCardClose);
popupCardOpenButton.addEventListener("click", popupCardOpen);
popupCardForm.addEventListener("submit", popupCardSubmitHandler);

function popupPreviewClose() {
  popupPreviewContainer.classList.remove("popup_opened");
}

popupPreviewCloseButton.addEventListener("click", popupPreviewClose);
