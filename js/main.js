"use strict";

/* =========================================================
   PAGE LOADER
========================================================= */

const pageLoader = document.querySelector(".page-loader");

window.addEventListener("load", () => {
    pageLoader?.classList.add("hidden");
});


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("active");

        navToggle.classList.toggle("active", isOpen);
        navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            navToggle.classList.remove("active");
            navToggle.setAttribute("aria-expanded", "false");
        });
    });
}


/* =========================================================
   SMOOTH SCROLL
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});


/* =========================================================
   ACTIVE NAVIGATION ON SCROLL
========================================================= */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(
    '.nav-menu a[href^="#"]'
);

const updateActiveNav = () => {
    let currentSection = "";

    sections.forEach((section) => {
        const sectionTop =
            section.getBoundingClientRect().top;

        if (sectionTop <= 150) {
            currentSection = section.id;
        }
    });

    navLinks.forEach((link) => {
        const href = link.getAttribute("href");

        link.classList.toggle(
            "active",
            href === `#${currentSection}`
        );
    });
};

window.addEventListener("scroll", updateActiveNav, {
    passive: true
});

updateActiveNav();


/* =========================================================
   HERO TYPEWRITER
========================================================= */

const typewriterElement =
    document.querySelector("#typingTarget");

if (typewriterElement) {
    const words = [
        "Electronics Engineering Student",
        "Web Developer",
        "Python Programmer",
        "AI Learner",
        "Embedded Systems Learner",
        "Electronics Engineer"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const typeSpeed = 80;
    const deleteSpeed = 45;
    const pauseAfterTyping = 1600;
    const pauseAfterDeleting = 500;

    const typeWriter = () => {
        const currentWord = words[wordIndex];

        if (!deleting) {
            typewriterElement.textContent =
                currentWord.substring(0, charIndex + 1);

            charIndex++;

            if (charIndex === currentWord.length) {
                deleting = true;

                setTimeout(
                    typeWriter,
                    pauseAfterTyping
                );

                return;
            }
        } else {
            typewriterElement.textContent =
                currentWord.substring(0, charIndex - 1);

            charIndex--;

            if (charIndex === 0) {
                deleting = false;

                wordIndex =
                    (wordIndex + 1) % words.length;

                setTimeout(
                    typeWriter,
                    pauseAfterDeleting
                );

                return;
            }
        }

        setTimeout(
            typeWriter,
            deleting ? deleteSpeed : typeSpeed
        );
    };

    typeWriter();
}


/* =========================================================
   CONTACT / HIRE FORM
========================================================= */

const hireForm =
    document.querySelector("#contactForm");

const formStatus =
    document.querySelector("#formStatus");

const presetButtons =
    document.querySelectorAll("[data-project-type]");


/* =========================================================
   FORM ELEMENTS
========================================================= */

const submitButton =
    hireForm?.querySelector(
        'button[type="submit"]'
    );

const nameInput =
    hireForm?.querySelector("#name");

const emailInput =
    hireForm?.querySelector("#email");

const projectTypeInput =
    hireForm?.querySelector("#projectType");

const messageInput =
    hireForm?.querySelector("#message");

const consentInput =
    hireForm?.querySelector("#consent");


/* =========================================================
   EMAIL VALIDATION
========================================================= */

const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


/* =========================================================
   CHECK FORM VALIDITY
========================================================= */

const isFormValid = () => {
    const nameValid =
        (nameInput?.value.trim().length || 0) > 0;

    const emailValue =
        emailInput?.value.trim() || "";

    const emailValid =
        emailPattern.test(emailValue);

    const projectValid =
        (projectTypeInput?.value || "").trim().length > 0;

    const messageValid =
        (messageInput?.value.trim().length || 0) >= 10;

    const consentValid =
        consentInput?.checked === true;

    return (
        nameValid &&
        emailValid &&
        projectValid &&
        messageValid &&
        consentValid
    );
};


/* =========================================================
   UPDATE SEND BUTTON
========================================================= */

const updateSubmitButton = () => {
    if (!submitButton) {
        return;
    }

    submitButton.disabled = !isFormValid();
};


/* =========================================================
   FORM INPUT LISTENERS
========================================================= */

[
    nameInput,
    emailInput,
    projectTypeInput,
    messageInput,
    consentInput
].forEach((input) => {
    if (!input) {
        return;
    }

    input.addEventListener(
        "input",
        updateSubmitButton
    );

    input.addEventListener(
        "change",
        updateSubmitButton
    );
});


/* =========================================================
   INITIAL BUTTON STATE
========================================================= */

updateSubmitButton();


/* =========================================================
   PROJECT TYPE PRESETS
========================================================= */

presetButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const selectedType =
            button.dataset.projectType;

        if (!selectedType || !projectTypeInput) {
            return;
        }

        projectTypeInput.value = selectedType;

        presetButtons.forEach((item) => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        updateSubmitButton();
    });
});


/* =========================================================
   CONTACT FORM SUBMIT
========================================================= */

hireForm?.addEventListener(
    "submit",
    async (event) => {
        event.preventDefault();

        if (!formStatus) {
            return;
        }

        /* ---------------------------------------------
           SECOND-LAYER VALIDATION
        --------------------------------------------- */

        const name =
            nameInput?.value.trim() || "";

        const email =
            emailInput?.value.trim() || "";

        const projectType =
            projectTypeInput?.value || "";

        const message =
            messageInput?.value.trim() || "";

        const consent =
            consentInput?.checked || false;


        /* ---------------------------------------------
           NAME
        --------------------------------------------- */

        if (!name) {
            formStatus.textContent =
                "Please enter your name.";

            formStatus.className =
                "form-status error";

            nameInput?.focus();

            updateSubmitButton();

            return;
        }


        /* ---------------------------------------------
           EMAIL
        --------------------------------------------- */

        if (
            !email ||
            !emailPattern.test(email)
        ) {
            formStatus.textContent =
                "Please enter a valid email address.";

            formStatus.className =
                "form-status error";

            emailInput?.focus();

            updateSubmitButton();

            return;
        }


        /* ---------------------------------------------
           PROJECT TYPE
        --------------------------------------------- */

        if (!projectType) {
            formStatus.textContent =
                "Please select an inquiry type.";

            formStatus.className =
                "form-status error";

            projectTypeInput?.focus();

            updateSubmitButton();

            return;
        }


        /* ---------------------------------------------
           MESSAGE
        --------------------------------------------- */

        if (!message) {
            formStatus.textContent =
                "Please enter your message.";

            formStatus.className =
                "form-status error";

            messageInput?.focus();

            updateSubmitButton();

            return;
        }


        if (message.length < 10) {
            formStatus.textContent =
                "Please write at least 10 characters in your message.";

            formStatus.className =
                "form-status error";

            messageInput?.focus();

            updateSubmitButton();

            return;
        }


        /* ---------------------------------------------
           CONSENT
        --------------------------------------------- */

        if (!consent) {
            formStatus.textContent =
                "Please allow me to contact you regarding this message.";

            formStatus.className =
                "form-status error";

            consentInput?.focus();

            updateSubmitButton();

            return;
        }


        /* ---------------------------------------------
           CREATE FORM DATA
        --------------------------------------------- */

        const formData =
            new FormData(hireForm);


        /* ---------------------------------------------
           HONEYPOT / BOTCHECK
        --------------------------------------------- */

        if (formData.get("botcheck")) {
            return;
        }


        /* ---------------------------------------------
           START SENDING
        --------------------------------------------- */

        formStatus.textContent =
            "Sending...";

        formStatus.className =
            "form-status loading";


        if (submitButton) {
            submitButton.disabled = true;
            submitButton.classList.add("loading");
        }


        /* ---------------------------------------------
           SEND TO WEB3FORMS
        --------------------------------------------- */

        try {
            const response =
                await fetch(
                    hireForm.action,
                    {
                        method: "POST",
                        body: formData,
                        headers: {
                            Accept:
                                "application/json"
                        }
                    }
                );


            const result =
                await response.json();


            /* -----------------------------------------
               SUCCESS
            ----------------------------------------- */

            if (
                response.ok &&
                result.success
            ) {
                formStatus.textContent =
                    "Message sent successfully. I'll get back to you soon.";

                formStatus.className =
                    "form-status success";


                /* Reset form */
                hireForm.reset();


                /* Remove preset active state */
                presetButtons.forEach(
                    (button) => {
                        button.classList.remove(
                            "active"
                        );
                    }
                );


                /* Button becomes disabled again */
                updateSubmitButton();


            } else {
                throw new Error(
                    result.message ||
                    "Unable to send your message."
                );
            }


        } catch (error) {

            formStatus.textContent =
                error.message ||
                "Something went wrong. Please try again.";

            formStatus.className =
                "form-status error";


        } finally {

            if (submitButton) {
                submitButton.classList.remove(
                    "loading"
                );
            }

            /*
             * IMPORTANT:
             * Do NOT simply set disabled = false.
             * Re-check the complete form instead.
             */
            updateSubmitButton();
        }
    }
);


/* =========================================================
   CLEAR FORM ERROR WHEN USER STARTS TYPING
========================================================= */

[
    nameInput,
    emailInput,
    projectTypeInput,
    messageInput,
    consentInput
].forEach((input) => {
    if (!input) {
        return;
    }

    input.addEventListener("input", () => {
        if (
            formStatus &&
            formStatus.classList.contains("error")
        ) {
            formStatus.textContent = "";
            formStatus.className =
                "form-status";
        }
    });

    input.addEventListener("change", () => {
        if (
            formStatus &&
            formStatus.classList.contains("error")
        ) {
            formStatus.textContent = "";
            formStatus.className =
                "form-status";
        }
    });
});


/* =========================================================
   BACK TO TOP
========================================================= */

const backToTop =
    document.querySelector("#backToTop");

if (backToTop) {
    window.addEventListener(
        "scroll",
        () => {
            backToTop.classList.toggle(
                "show",
                window.scrollY > 500
            );
        },
        {
            passive: true
        }
    );

    backToTop.addEventListener(
        "click",
        () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    );
}
