const popupOpenButton = document.querySelector(".traveller__info-full-name-edit-btn");
const popupCloseButton = document.querySelector(".popup__container-close-btn");

const popupContainer = document.querySelector(".popup");
const popupForm = document.querySelector(".popup__container-form");
const popupInputName = document.querySelector(".popup__container-input_type_name");
const popupInputDescription = document.querySelector(".popup__container-input_type_description");

const pageInputName = document.querySelector(".traveller__info-full-name-label");
const pageInputDescription = document.querySelector(".traveller__info-description");

popupCloseButton.addEventListener("click", function () {
    popupContainer.classList.remove("popup_opened");
});

popupOpenButton.addEventListener("click", function () {
    popupContainer.classList.add("popup_opened");

    popupInputName.value = pageInputName.textContent.trim();
    popupInputDescription.value = pageInputDescription.textContent.trim();
});

popupForm.addEventListener('submit', function (event) {
    event.preventDefault();

    pageInputName.textContent = popupInputName.value;
    pageInputDescription.textContent = popupInputDescription.value;

    popupContainer.classList.remove("popup_opened");
});
