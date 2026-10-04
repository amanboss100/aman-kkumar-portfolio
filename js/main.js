document.addEventListener("DOMContentLoaded", () => {

    /* ================================
       CONTACT FORM
    ================================= */

    const contactForm = document.getElementById("contactForm");
    const messageField = document.getElementById("message");
    const submitButton = document.getElementById("submitButton");
    const submitText = submitButton?.querySelector(".submit-text");
    const submitLoading = submitButton?.querySelector(".submit-loading");
    const formStatus = document.getElementById("formStatus");

    /* ---------- Preset Messages ---------- */

    const presetButtons = document.querySelectorAll(".preset-btn");

    presetButtons.forEach((button) => {
        button.addEventListener("click", () => {

            const message = button.dataset.message;

            if (messageField && message) {
                messageField.value = message;
                messageField.focus();
            }

            // Highlight selected preset
            presetButtons.forEach((btn) => {
                btn.classList.remove("active");
            });

            button.classList.add("active");
        });
    });


    /* ---------- Form Submit ---------- */

    if (contactForm) {

        contactForm.addEventListener("submit", async (event) => {

            event.preventDefault();

            // Clear previous status
            if (formStatus) {
                formStatus.textContent = "";
                formStatus.className = "form-status";
            }

            // Check consent
            const consent = contactForm.querySelector(
                'input[name="consent"]'
            );

            if (consent && !consent.checked) {

                showFormStatus(
                    "Please agree to be contacted before sending.",
                    "error"
                );

                return;
            }

            // Loading state
            if (submitButton) {
                submitButton.disabled = true;
            }

            if (submitText) {
                submitText.style.display = "none";
            }

            if (submitLoading) {
                submitLoading.style.display = "inline";
            }

            try {

                const formData = new FormData(contactForm);

                const response = await fetch(
                    "https://api.web3forms.com/submit",
                    {
                        method: "POST",
                        body: formData
                    }
                );

                const result = await response.json();

                if (result.success) {

                    showFormStatus(
                        "✓ Message sent successfully! I'll get back to you soon.",
                        "success"
                    );

                    // Reset form
                    contactForm.reset();

                    // Remove preset selection
                    presetButtons.forEach((btn) => {
                        btn.classList.remove("active");
                    });

                } else {

                    showFormStatus(
                        result.message ||
                        "Something went wrong. Please try again.",
                        "error"
                    );
                }

            } catch (error) {

                console.error("Form submission error:", error);

                showFormStatus(
                    "Unable to send your message. Please check your internet connection and try again.",
                    "error"
                );

            } finally {

                // Restore button
                if (submitButton) {
                    submitButton.disabled = false;
                }

                if (submitText) {
                    submitText.style.display = "inline";
                }

                if (submitLoading) {
                    submitLoading.style.display = "none";
                }
            }
        });
    }


    /* ---------- Status Message ---------- */

    function showFormStatus(message, type) {

        if (!formStatus) return;

        formStatus.textContent = message;
        formStatus.className = `form-status ${type}`;

        // Automatically remove after 7 seconds
        setTimeout(() => {

            formStatus.textContent = "";
            formStatus.className = "form-status";

        }, 7000);
    }


    /* ================================
       THEME TOGGLE
    ================================= */

    const themeToggle = document.getElementById("themeToggle");

    if (themeToggle) {

        const savedTheme = localStorage.getItem("portfolio-theme");

        if (savedTheme) {
            document.documentElement.setAttribute(
                "data-theme",
                savedTheme
            );
        } else {

            const prefersLight = window.matchMedia(
                "(prefers-color-scheme: light)"
            ).matches;

            if (prefersLight) {
                document.documentElement.setAttribute(
                    "data-theme",
                    "light"
                );
            }
        }

        updateThemeIcon();

        themeToggle.addEventListener("click", () => {

            const currentTheme =
                document.documentElement.getAttribute("data-theme");

            const newTheme =
                currentTheme === "light"
                    ? "dark"
                    : "light";

            document.documentElement.setAttribute(
                "data-theme",
                newTheme
            );

            localStorage.setItem(
                "portfolio-theme",
                newTheme
            );

            updateThemeIcon();
        });
    }


    function updateThemeIcon() {

        if (!themeToggle) return;

        const currentTheme =
            document.documentElement.getAttribute("data-theme");

        if (currentTheme === "light") {

            themeToggle.textContent = "☀️";
            themeToggle.setAttribute(
                "aria-label",
                "Switch to dark mode"
            );

        } else {

            themeToggle.textContent = "🌙";
            themeToggle.setAttribute(
                "aria-label",
                "Switch to light mode"
            );
        }
    }

});
