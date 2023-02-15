const showInputError = (form, input, message, options) => {
    input.classList.add(options.inputErrorClass);

    const error = form.querySelector(options.errorSelector(input.name));
    error.textContent = message;
    error.classList.add(options.errorClass);
};

const hideInputError = (form, input, options) => {
    input.classList.remove(options.inputErrorClass);

    const error = form.querySelector(options.errorSelector(input.name));
    error.textContent = '';
    error.classList.add(options.errorClass);
};

const hasInvalidInput = (inputList) => {
    return inputList.some((input) => !input.validity.valid);
};

const toggleInputState = (form, input, options) => {
    if (!input.validity.valid) {
        showInputError(form, input, input.validationMessage, options);
    } else {
        hideInputError(form, input, options);
    }
};

const toggleButtonState = (buttonSubmit, inputList, options) => {
    if (hasInvalidInput(inputList)) {
        buttonSubmit.classList.add(options.inactiveButtonClass);
        buttonSubmit.disabled = true;
    } else {
        buttonSubmit.classList.remove(options.inactiveButtonClass);
        buttonSubmit.removeAttribute("disabled");
    }
};

const setEventListeners = (form, options) => {
    const inputList = Array.from(form.querySelectorAll(options.inputSelector));
    const buttonSubmit = form.querySelector(options.submitButtonSelector);

    toggleButtonState(buttonSubmit, inputList, options);

    inputList.forEach((input) => {
        input.addEventListener('input', () => {
            toggleInputState(form, input, options);
            toggleButtonState(buttonSubmit, inputList, options);
        });
    });
};

const enableValidation = (options) => {
    const formList = Array.from(document.querySelectorAll(options.formSelector));

    formList.forEach((form) => {
        form.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });

        setEventListeners(form, options);
    });
};

enableValidation({
    formSelector: '.popup__container-form',
    inputSelector: '.popup__container-input',
    submitButtonSelector: '.popup__container-save-btn',
    inactiveButtonClass: 'popup__container-save-btn_inactive',
    inputErrorClass: 'popup__container-input_error',
    errorClass: 'popup__container-input-error_active',
    errorSelector: (name) => `.popup__container-input_type-${name}-error`
});
