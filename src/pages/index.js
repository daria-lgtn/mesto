import Api from "../components/Api.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import "../styles/index.css";
import { authorization, cohortId } from "../utils/constants.js";

const api = new Api({
  cohortId,
  authorization,
});

//________________________________________________________________________________
//________________________________________  validation
//________________________________________________________________________________

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

//________________________________________________________________________________
//________________________________________  popupProfile avatar
//________________________________________________________________________________

const popupProfileAvatarOpenButton = document.querySelector(".traveller-image");

function openPopupAvatarProfile() {
  formValidators["avatar-edit"].resetValidation();
}

function submitPopupAvatarProfile(form, { onFinally }) {
  return api
    .profileAvatarUpdate({
      avatar: form.get("link"),
    })
    .then((result) => {
      userInfo.setUserInfo({
        name: result.name,
        description: result.about,
        avatar: result.avatar,
      });
    })
    .catch((e) => console.log(e))
    .finally(() => {
      formValidators["avatar-edit"].clearValidation();
      onFinally();
    });
}

const popupProfileAvatar = new PopupWithForm(".popup_type-avatar", {
  onSubmit: submitPopupAvatarProfile,
  onOpen: openPopupAvatarProfile,
});
popupProfileAvatar.setEventListeners();

popupProfileAvatarOpenButton.addEventListener(
  "click",
  popupProfileAvatar.open.bind(popupProfileAvatar)
);
//________________________________________________________________________________
//________________________________________  popupProfile
//________________________________________________________________________________

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
  selectorAvatar: ".traveller-image__illustration",
  selectorDescription: ".traveller__info-description",
});

function openPopupProfile() {
  const data = userInfo.getUserInfo();

  popupProfileInputName.value = data.name.trim();
  popupProfileInputDescription.value = data.description.trim();

  formValidators["profile-edit"].resetValidation();
}

function submitPopupProfile(form, { onFinally }) {
  return api
    .profileUpdate({
      name: form.get("name"),
      about: form.get("description"),
    })
    .then((result) => {
      userInfo.setUserInfo({
        name: result.name,
        description: result.about,
        avatar: result.avatar,
      });
    })
    .catch((e) => console.log(e))
    .finally(() => {
      formValidators["profile-edit"].clearValidation();
      onFinally();
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

//________________________________________________________________________________
//________________________________________  popupCard confirm
//________________________________________________________________________________

const popupConfirmInputId = document.querySelector(
  ".popup__container-form .popup__container-input_type-id"
);

function openPopupSubmit(data) {
  popupConfirmInputId.value = data.id;

  formValidators["card-confirm"].resetValidation();
}

function submitDeleteCard(form, { data, onFinally }) {
  const id = form.get("id");
  return api
    .cardDelete(id)
    .then(() => {
      data.onConfirm();
    })
    .catch((e) => console.log(e))
    .finally(() => {
      formValidators["card-confirm"].clearValidation();
      onFinally();
    });
}

const popupConfirm = new PopupWithForm(".popup_type-confirm", {
  onSubmit: submitDeleteCard,
  onOpen: openPopupSubmit,
});
popupConfirm.setEventListeners();

//________________________________________________________________________________
//________________________________________  popupCard image
//________________________________________________________________________________

const popupImage = new PopupWithImage(".popup_type-preview", {
  imageSelector: ".popup__container-preview-illustration",
  labelSelector: ".popup__container-preview-name",
});
popupImage.setEventListeners();

//________________________________________________________________________________
//________________________________________  popupCard submit
//________________________________________________________________________________

function submitPopupCard(form, { onFinally }) {
  return api
    .cardSubmit({
      name: form.get("name"),
      link: form.get("link"),
    })
    .then((result) => {
      const cardElement = createCard(result);
      cardList.addItem(cardElement);
    })
    .catch((e) => console.log(e))
    .finally(() => {
      formValidators["card-edit"].clearValidation();
      onFinally();
    });
}

const popupCard = new PopupWithForm(".popup_type-card", {
  onSubmit: submitPopupCard,
});
popupCard.setEventListeners();

const popupCardOpenButton = document.querySelector(".traveller__add-image-btn");
popupCardOpenButton.addEventListener("click", popupCard.open.bind(popupCard));

//________________________________________________________________________________
//________________________________________  popupCard list
//________________________________________________________________________________

function cardLike(id, callback) {
  api
    .cardLike(id)
    .then(callback)
    .catch((e) => console.log(e));
}

function cardLikeUndo(id, callback) {
  api
    .cardLikeUndo(id)
    .then(callback)
    .catch((e) => console.log(e));
}

function createCard(info) {
  const card = new Card(info, {
    me: userInfo.getUserInfo().id,
    selector: "place-card",
    handleCardClick: popupImage.open.bind(popupImage),
    handleCardDelete: popupConfirm.open.bind(popupConfirm),
    handleCardLikeUndo: cardLikeUndo,
    handleCardLike: cardLike,
  });
  const cardElement = card.createCardElement();

  return cardElement;
}

const cardList = new Section(
  {
    renderer: (item) => {
      const cardElement = createCard(item);
      cardList.addItem(cardElement);
    },
  },
  ".places"
);

Promise.all([
  api.me().then((result) => {
    userInfo.setUserInfo({
      name: result.name,
      description: result.about,
      avatar: result.avatar,
      id: result._id,
    });
  }),

  api.cardGetAll().then((result) => {
    console.log(result);
    cardList.renderItems(result);
  }),
]).catch((e) => console.log(e));
