hireForm?.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!formStatus) return;

    const submitButton = hireForm.querySelector(
        'button[type="submit"]'
    );

    const nameInput = hireForm.querySelector("#name");
    const emailInput = hireForm.querySelector("#email");
    const projectTypeInput = hireForm.querySelector("#projectType");
    const messageInput = hireForm.querySelector("#message");
    const consentInput = hireForm.querySelector("#consent");

    const name = nameInput?.value.trim() || "";
    const email = emailInput?.value.trim() || "";
    const projectType = projectTypeInput?.value || "";
    const message = messageInput?.value.trim() || "";
    const consent = consentInput?.checked || false;

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name) {
        formStatus.textContent = "Please enter your name.";
        formStatus.className = "form-status error";
        nameInput?.focus();
        return;
    }

    if (!email || !emailPattern.test(email)) {
        formStatus.textContent =
            "Please enter a valid email address.";
        formStatus.className = "form-status error";
        emailInput?.focus();
        return;
    }

    if (!projectType) {
        formStatus.textContent =
            "Please select an inquiry type.";
        formStatus.className = "form-status error";
        projectTypeInput?.focus();
        return;
    }

    if (!message) {
        formStatus.textContent =
            "Please enter your message.";
        formStatus.className = "form-status error";
        messageInput?.focus();
        return;
    }

    if (message.length < 10) {
        formStatus.textContent =
            "Please write at least 10 characters in your message.";
        formStatus.className = "form-status error";
        messageInput?.focus();
        return;
    }

    if (!consent) {
        formStatus.textContent =
            "Please allow me to contact you regarding this message.";
        formStatus.className = "form-status error";
        consentInput?.focus();
        return;
    }

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
                result.message ||
                "Unable to send your message."
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
