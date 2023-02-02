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

function popupPreviewClose() {
  popupClose(popupPreviewContainer);
}

popupPreviewCloseButton.addEventListener("click", popupPreviewClose);
