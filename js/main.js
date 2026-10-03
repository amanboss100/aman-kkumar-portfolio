document.addEventListener("DOMContentLoaded", () => {

    /* ================================
       HEADER SCROLL EFFECT
    ================================= */

    const header = document.querySelector(".site-header");

    function handleHeaderScroll() {
        if (!header) return;

        if (window.scrollY > 20) {
            header.style.boxShadow = "0 8px 30px rgba(0, 0, 0, 0.18)";
        } else {
            header.style.boxShadow = "none";
        }
    }

    window.addEventListener("scroll", handleHeaderScroll);
    handleHeaderScroll();


    /* ================================
       EXTERNAL LINKS
    ================================= */

    const externalLinks = document.querySelectorAll(
        'a[href^="http"], a[href^="mailto:"], a[href^="https://t.me/"]'
    );

    externalLinks.forEach((link) => {
        if (link.href.startsWith("http")) {
            link.setAttribute("target", "_blank");
            link.setAttribute("rel", "noopener noreferrer");
        }
    });


    /* ================================
       IMAGE FALLBACK
    ================================= */

    const images = document.querySelectorAll("img");

    images.forEach((image) => {
        image.addEventListener("error", () => {
            image.style.opacity = "0.5";
        });
    });

});
