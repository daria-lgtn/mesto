import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards } from "../utils/constants.js";
import "../styles/index.css";

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

//  popupCard

const popupCardOpenButton = document.querySelector(".traveller__add-image-btn");

const popupImage = new PopupWithImage(".popup_type-preview", {
  imageSelector: ".popup__container-preview-illustration",
  labelSelector: ".popup__container-preview-name",
});
popupImage.setEventListeners();

function createCard(info) {
  const card = new Card(info, "place-card", popupImage.open.bind(popupImage));
  const cardElement = card.createCardElement();

  return cardElement;
}

const cardList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardList.addItem(cardElement);
    },
  },
  ".places"
);

cardList.renderItems();

function submitPopupCard(form) {
  const data = {
    name: form.get("name"),
    link: form.get("link"),
  };

  const cardElement = createCard(data);
  cardList.addItem(cardElement);

  formValidators["card-edit"].resetValidation();
}

const popupCard = new PopupWithForm(".popup_type-card", {
  onSubmit: submitPopupCard,
});
popupCard.setEventListeners();
popupCardOpenButton.addEventListener("click", popupCard.open.bind(popupCard));

//  popupProfile

const popupProfileOpenButton = document.querySelector(
  ".traveller__info-full-name-edit-btn"
);
const popupProfileInputName = document.querySelector(
  ".popup__container-form .popup__container-input_type-name"
);
const popupProfileInputDescription = document.querySelector(
  ".popup__container-form .popup__container-input_type-description"
);

const userInfo = new UserInfo({
  selectorName: ".traveller__info-full-name-label",
  selectorDescription: ".traveller__info-description",
});

function openPopupProfile() {
  const data = userInfo.getUserInfo();

  popupProfileInputName.value = data.name.trim();
  popupProfileInputDescription.value = data.description.trim();

  formValidators["profile-edit"].resetValidation();
}

function submitPopupProfile(form) {
  userInfo.setUserInfo({
    name: form.get("name"),
    description: form.get("description"),
  });
}

const popupProfile = new PopupWithForm(".popup_type-profile", {
  onSubmit: submitPopupProfile,
  onOpen: openPopupProfile,
});
popupProfile.setEventListeners();

popupProfileOpenButton.addEventListener(
  "click",
  popupProfile.open.bind(popupProfile)
);
