document.addEventListener("DOMContentLoaded", async () => {
    // 1. DYNAMIC COMPONENT LOADING (Navbar & Footer)
    const loadComponent = async (id, file) => {
        const el = document.getElementById(id);
        if (el) {
            try {
                const res = await fetch(file);
                if (res.ok) el.innerHTML = await res.text();
            } catch (err) { console.error(`Error loading ${file}:`, err); }
        }
    };
    
    await loadComponent("navbar-placeholder", "components/navbar.html");
    await loadComponent("footer-placeholder", "components/footer.html");

    // 2. THEME TOGGLE (Light/Dark Mode)
    const themeToggle = document.getElementById("themeToggle");
    const body = document.documentElement;
    
    // Check saved theme
    const savedTheme = localStorage.getItem("theme") || "light";
    body.setAttribute("data-theme", savedTheme);
    if(themeToggle) themeToggle.textContent = savedTheme === "dark" ? "☀️" : "🌙";

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const currentTheme = body.getAttribute("data-theme");
            const newTheme = currentTheme === "light" ? "dark" : "light";
            body.setAttribute("data-theme", newTheme);
            localStorage.setItem("theme", newTheme);
            themeToggle.textContent = newTheme === "dark" ? "☀️" : "🌙";
        });
    }

    // 3. MOBILE MENU TOGGLE
    const mobileBtn = document.getElementById("mobileMenuBtn");
    const navLinks = document.getElementById("navLinks");
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener("click", () => {
            navLinks.classList.toggle("show");
        });
    }

    // 4. SMOOTH PAGE TRANSITIONS
    document.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", (e) => {
            const href = link.getAttribute("href");
            // Only transition for internal HTML pages, not external links or hashes
            if (href && href.endsWith(".html") && !link.hasAttribute("target")) {
                e.preventDefault();
                document.body.classList.add("page-transitioning");
                setTimeout(() => { window.location.href = href; }, 400); // Wait for animation
            }
        });
    });

    // 5. FIXED CONTACT FORM (Web3Forms)
    const contactForm = document.getElementById("contactForm");
    const submitBtn = document.getElementById("submitBtn");
    const formStatus = document.getElementById("formStatus");

    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            
            // Basic validation check
            const consent = document.getElementById("consent").checked;
            if (!consent) {
                alert("Please tick the consent checkbox.");
                return;
            }

            submitBtn.textContent = "Sending...";
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);
            try {
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });
                
                const result = await response.json();
                if (response.ok && result.success) {
                    formStatus.innerHTML = "<p style='color: var(--cyan); margin-top:10px;'>Message sent successfully! I'll reply soon.</p>";
                    contactForm.reset();
                } else {
                    throw new Error("Something went wrong");
                }
            } catch (error) {
                formStatus.innerHTML = "<p style='color: red; margin-top:10px;'>Error sending message. Try again later.</p>";
            } finally {
                submitBtn.textContent = "Send Message";
                submitBtn.disabled = false;
            }
        });
    }
});
