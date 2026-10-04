document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const mainNav = document.querySelector(".main-nav");
    const navLinks = document.querySelectorAll(".main-nav a");

    if (!menuToggle || !mainNav) return;

    menuToggle.addEventListener("click", () => {
        const isOpen = mainNav.classList.toggle("active");

        menuToggle.classList.toggle("active", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        document.body.classList.toggle("menu-open", isOpen);
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            mainNav.classList.remove("active");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            document.body.classList.remove("menu-open");
        });
    });

    document.addEventListener("click", (event) => {
        if (
            mainNav.classList.contains("active") &&
            !mainNav.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            mainNav.classList.remove("active");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            document.body.classList.remove("menu-open");
        }
    });
});
