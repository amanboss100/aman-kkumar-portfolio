/* =========================================================
   AMAN KKUMAR — PORTFOLIO
   Navigation JavaScript
   Mobile Menu & Navigation Management
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (!menuToggle || !navLinks) {
        return;
    }


    /* =====================================================
       1. MOBILE MENU TOGGLE
    ===================================================== */

    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("active");
        
        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.style.color = isOpen ? "var(--accent-cyan)" : "var(--text-primary)";
    });


    /* =====================================================
       2. CLOSE MENU AFTER CLICKING A LINK
    ===================================================== */

    const navigationLinks = navLinks.querySelectorAll("a");

    navigationLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.style.color = "var(--text-primary)";
        });
    });


    /* =====================================================
       3. CLOSE MENU WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener("click", (event) => {
        const clickedInsideMenu = navLinks.contains(event.target);
        const clickedToggle = menuToggle.contains(event.target);

        if (
            !clickedInsideMenu &&
            !clickedToggle &&
            navLinks.classList.contains("active")
        ) {
            navLinks.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.style.color = "var(--text-primary)";
        }
    });


    /* =====================================================
       4. CLOSE MENU ON RESIZE TO DESKTOP
    ===================================================== */

    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            navLinks.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.style.color = "var(--text-primary)";
        }
    });

});
