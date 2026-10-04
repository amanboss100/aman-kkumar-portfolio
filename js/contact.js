/* =========================================
   CONTACT / HIRE FORM
========================================= */

const hireForm =
    document.getElementById("hireForm");

const nameInput =
    document.getElementById("name");

const emailInput =
    document.getElementById("email");

const projectType =
    document.getElementById("projectType");

const messageInput =
    document.getElementById("message");

const consent =
    document.getElementById("consent");

const formStatus =
    document.getElementById("formStatus");

const submitButton =
    document.getElementById("formSubmit");


/* =========================================
   MESSAGE PRESETS
========================================= */

const presetButtons =
    document.querySelectorAll(
        ".preset-btn"
    );


presetButtons.forEach((button) => {

    button.addEventListener(
        "click",
        () => {

            const presetMessage =
                button.dataset.message;

            if (!messageInput) {
                return;
            }


            messageInput.value =
                presetMessage;


            presetButtons.forEach(
                (item) => {

                    item.classList.remove(
                        "active"
                    );

                }
            );


            button.classList.add(
                "active"
            );


            messageInput.focus();

        }
    );

});


/* =========================================
   HELPERS
========================================= */

function setError(
    input,
    errorElement,
    message
) {

    input.classList.add(
        "input-error"
    );

    errorElement.textContent =
        message;

}


function clearError(
    input,
    errorElement
) {

    input.classList.remove(
        "input-error"
    );

    errorElement.textContent =
        "";

}


/* =========================================
   VALIDATION
========================================= */

if (hireForm) {

    hireForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            const nameError =
                document.getElementById(
                    "nameError"
                );

            const emailError =
                document.getElementById(
                    "emailError"
                );

            const messageError =
                document.getElementById(
                    "messageError"
                );


            let valid = true;


            /* NAME */

            if (
                nameInput.value
                    .trim()
                    .length < 2
            ) {

                setError(
                    nameInput,
                    nameError,
                    "Please enter your name."
                );

                valid = false;

            } else {

                clearError(
                    nameInput,
                    nameError
                );

            }


            /* EMAIL */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !emailPattern.test(
                    emailInput.value.trim()
                )
            ) {

                setError(
                    emailInput,
                    emailError,
                    "Please enter a valid email."
                );

                valid = false;

            } else {

                clearError(
                    emailInput,
                    emailError
                );

            }


            /* MESSAGE */

            if (
                messageInput.value
                    .trim()
                    .length < 10
            ) {

                setError(
                    messageInput,
                    messageError,
                    "Please write at least a short description."
                );

                valid = false;

            } else {

                clearError(
                    messageInput,
                    messageError
                );

            }


            /* CONSENT */

            if (!consent.checked) {

                formStatus.className =
                    "form-status error";

                formStatus.textContent =
                    "Please agree to be contacted.";

                valid = false;

            }


            if (!valid) {
                return;
            }


            /*
             * Temporary frontend success state.
             *
             * Real email delivery will be connected
             * through a form backend/API separately.
             */

            submitButton.disabled =
                true;

            submitButton.innerHTML =
                "<span>Preparing message...</span>";


            setTimeout(() => {

                formStatus.className =
                    "form-status success";

                formStatus.textContent =
                    "Your message has been validated successfully. Email delivery will be connected next.";

                submitButton.disabled =
                    false;

                submitButton.innerHTML =
                    "<span>Send Message</span><span>↗</span>";

            }, 700);

        }
    );

}
