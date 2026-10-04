const pageLoader = document.querySelector(".page-loader");

window.addEventListener("load", () => {
    pageLoader?.classList.add("hidden");
});

document.addEventListener("DOMContentLoaded", () => {
    const root = document.documentElement;
    const themeToggle = document.querySelector(".theme-toggle");
    const typingTarget = document.querySelector("#typingTarget");
    const hireForm = document.querySelector("#contactForm");
    const presetButtons = document.querySelectorAll(".preset-btn");
    const messageField = document.querySelector("#message");
    const formStatus = document.querySelector("#formStatus");
    const rippleHosts = document.querySelectorAll(
        "button, .btn, .social-link, .skill-card, .project-card, .approach-card"
    );

    const roles = [
        "Electronics Engineering Student",
        "Web Developer",
        "Python Programmer",
        "AI Learner",
        "Embedded Systems Learner"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "light" || savedTheme === "dark") {
        root.setAttribute("data-theme", savedTheme);
    } else {
        root.setAttribute(
            "data-theme",
            window.matchMedia("(prefers-color-scheme: light)").matches
                ? "light"
                : "dark"
        );
    }

    const updateThemeIcon = () => {
        if (!themeToggle) return;

        const isLight = root.getAttribute("data-theme") === "light";

        themeToggle.setAttribute(
            "aria-label",
            isLight ? "Switch to dark mode" : "Switch to light mode"
        );

        const icon = themeToggle.querySelector("i");

        if (icon) {
            icon.className = isLight
                ? "fa-solid fa-moon"
                : "fa-solid fa-sun";
        }

        const textIcon = themeToggle.querySelector(".theme-icon");

        if (textIcon) {
            textIcon.textContent = isLight ? "☾" : "☀";
        }
    };

    updateThemeIcon();

    themeToggle?.addEventListener("click", () => {
        const currentTheme = root.getAttribute("data-theme");
        const nextTheme = currentTheme === "light" ? "dark" : "light";

        root.setAttribute("data-theme", nextTheme);
        localStorage.setItem("portfolio-theme", nextTheme);

        updateThemeIcon();
    });

    const typeRole = () => {
        if (!typingTarget) return;

        const currentRole = roles[roleIndex];

        if (!deleting) {
            typingTarget.textContent = currentRole.slice(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentRole.length) {
                deleting = true;
                setTimeout(typeRole, 1700);
                return;
            }

            setTimeout(typeRole, 65);
        } else {
            typingTarget.textContent = currentRole.slice(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                deleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(typeRole, 350);
                return;
            }

            setTimeout(typeRole, 35);
        }
    };

    typeRole();

    presetButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const message =
                button.dataset.message || button.textContent.trim();

            if (messageField) {
                messageField.value = message;
                messageField.focus();
            }

            presetButtons.forEach((item) => {
                item.classList.remove("active");
            });

            button.classList.add("active");
        });
    });

    hireForm?.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (!formStatus) return;

        const submitButton = hireForm.querySelector(
            'button[type="submit"]'
        );

        const formData = new FormData(hireForm);

        if (formData.get("botcheck")) {
            return;
        }

        formStatus.textContent = "Sending...";
        formStatus.className = "form-status loading";

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.classList.add("loading");
        }

        try {
            const response = await fetch(hireForm.action, {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json"
                }
            });

            const result = await response.json();

            if (response.ok && result.success) {
                formStatus.textContent =
                    "Message sent successfully. I'll get back to you soon.";

                formStatus.className = "form-status success";

                hireForm.reset();

                presetButtons.forEach((button) => {
                    button.classList.remove("active");
                });
            } else {
                throw new Error(
                    result.message || "Unable to send your message."
                );
            }
        } catch (error) {
            formStatus.textContent =
                error.message ||
                "Something went wrong. Please try again.";

            formStatus.className = "form-status error";
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.classList.remove("loading");
            }
        }
    });

    rippleHosts.forEach((element) => {
        element.classList.add("ripple-host");

        element.addEventListener("pointerdown", (event) => {
            const rect = element.getBoundingClientRect();
            const ripple = document.createElement("span");

            ripple.className = "ripple";
            ripple.style.left = `${event.clientX - rect.left}px`;
            ripple.style.top = `${event.clientY - rect.top}px`;

            element.appendChild(ripple);

            ripple.addEventListener("animationend", () => {
                ripple.remove();
            });
        });
    });

    const currentYear = document.querySelector("#currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
});
