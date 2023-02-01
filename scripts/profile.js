const popupProfileOpenButton = document.querySelector(
  ".traveller__info-full-name-edit-btn"
);
const pageProfileInputName = document.querySelector(
  ".traveller__info-full-name-label"
);
const pageProfileInputDescription = document.querySelector(
  ".traveller__info-description"
);

const popupProfileContainer = document.querySelector(".popup_type_profile");
const popupProfileCloseButton = popupProfileContainer.querySelector(
  ".popup__container-close-btn"
);
const popupProfileForm = popupProfileContainer.querySelector(
  ".popup__container-form"
);
const popupProfileInputName = popupProfileContainer.querySelector(
  ".popup__container-input_type_name"
);
const popupProfileInputDescription = popupProfileContainer.querySelector(
  ".popup__container-input_type_description"
);

function popupProfileClose() {
  popupProfileContainer.classList.remove("popup_opened");
}

function popupProfileOpen() {
  popupProfileContainer.classList.add("popup_opened");

  popupProfileInputName.value = pageProfileInputName.textContent.trim();
  popupProfileInputDescription.value =
    pageProfileInputDescription.textContent.trim();
}

function popupProfileSubmitHandler(event) {
  event.preventDefault();

  pageProfileInputName.textContent = popupProfileInputName.value;
  pageProfileInputDescription.textContent = popupProfileInputDescription.value;

  popupProfileClose();
}

popupProfileCloseButton.addEventListener("click", popupProfileClose);
popupProfileOpenButton.addEventListener("click", popupProfileOpen);
popupProfileForm.addEventListener("submit", popupProfileSubmitHandler);
