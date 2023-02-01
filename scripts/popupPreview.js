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

function popupPreviewOpen(event) {
  const card = event.target.parentElement;
  const link = card.querySelector(".place-card__illustration").src;
  const name = card.querySelector(".place-card__description-title").textContent;

  popupPreviewImage.src = link;
  popupPreviewImage.alt = `Иллюстрация '${name}'`;
  popupPreviewName.textContent = name;

  popupOpen(popupPreviewContainer);
}

function popupPreviewClose() {
  popupClose(popupPreviewContainer);
}

popupPreviewCloseButton.addEventListener("click", popupPreviewClose);
