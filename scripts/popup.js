function popupClose(container, event) {
  if (!event || event.target === event.currentTarget) {
    container.classList.remove("popup_opened");
  }
}

function popupOpen(container) {
  container.focus();
  container.classList.add("popup_opened");
}

function setInputValue(input, value) {
  input.value = value;
  input.dispatchEvent(new Event('input'));
}

function onEscapeKeyDown(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup) {
      openedPopup.classList.remove("popup_opened");
    }
  }
}

document.addEventListener("keydown", onEscapeKeyDown)

