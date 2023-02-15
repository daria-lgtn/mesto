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
  setInputValue(popupProfileInputDescription, pageProfileInputDescription.textContent.trim());
  
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
