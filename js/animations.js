/* =========================================================
   AMAN KKUMAR — PORTFOLIO
   Animation & Interaction JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. SCROLL REVEAL
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".section-heading, " +
        ".about-content, " +
        ".skill-card, " +
        ".building-card, " +
        ".projects-empty, " +
        ".philosophy-card, " +
        ".contact-card"
    );

    /*
     * Add the reveal class to selected elements.
     * The actual visual animation is defined in
     * animations.css.
     */

    revealElements.forEach((element) => {
        element.classList.add("scroll-reveal");
    });


    /* =====================================================
       2. INTERSECTION OBSERVER
    ===================================================== */

    const observerOptions = {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
    };

    const revealObserver =
        new IntersectionObserver((entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add(
                    "is-visible"
                );

                observer.unobserve(
                    entry.target
                );

            });

        }, observerOptions);


    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });


    /* =====================================================
       3. STAGGER CARD ANIMATION
    ===================================================== */

    const cardGroups = [
        ".skills-grid .skill-card",
        ".building-grid .building-card",
        ".philosophy-grid .philosophy-card",
        ".contact-links .contact-card"
    ];

    cardGroups.forEach((selector) => {

        const cards =
            document.querySelectorAll(selector);

        cards.forEach((card, index) => {

            card.style.setProperty(
                "--animation-delay",
                `${index * 80}ms`
            );

        });

    });


    /* =====================================================
       4. INTELLIGENT CIRCUIT MOUSE RESPONSE
    ===================================================== */

    const heroVisual =
        document.querySelector(".hero-visual");

    if (heroVisual && window.matchMedia(
        "(pointer: fine)"
    ).matches) {

        heroVisual.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    heroVisual.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const moveX =
                    (x - centerX) / 25;

                const moveY =
                    (y - centerY) / 25;

                heroVisual.style.setProperty(
                    "--mouse-x",
                    `${moveX}px`
                );

                heroVisual.style.setProperty(
                    "--mouse-y",
                    `${moveY}px`
                );

            }
        );


        heroVisual.addEventListener(
            "mouseleave",
            () => {

                heroVisual.style.setProperty(
                    "--mouse-x",
                    "0px"
                );

                heroVisual.style.setProperty(
                    "--mouse-y",
                    "0px"
                );

            }
        );

    }


    /* =====================================================
       5. ACTIVE NAVIGATION SECTION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    const navItems =
        document.querySelectorAll(
            ".nav-links a"
        );

    const activeSectionObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const sectionId =
                        entry.target.getAttribute(
                            "id"
                        );

                    navItems.forEach((link) => {

                        link.classList.remove(
                            "active"
                        );

                        if (
                            link.getAttribute(
                                "href"
                            ) === `#${sectionId}`
                        ) {

                            link.classList.add(
                                "active"
                            );

                        }

                    });

                });

            },
            {
                threshold: 0.35
            }
        );


    sections.forEach((section) => {
        activeSectionObserver.observe(section);
    });


    /* =====================================================
       6. CURRENT YEAR
    ===================================================== */

    const footerYear =
        document.querySelector(
            ".footer-bottom p"
        );

    /*
     * Keep the displayed year automatically updated.
     * The current static HTML year is still used as
     * fallback if JavaScript is disabled.
     */

    if (footerYear) {

        const currentYear =
            new Date().getFullYear();

        footerYear.textContent =
            `© ${currentYear} Aman kkumar`;

    }


    /* =====================================================
       7. PREVENT ANIMATION ISSUES FOR REDUCED MOTION
    ===================================================== */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

    if (reducedMotion.matches) {

        document.documentElement.classList.add(
            "reduce-motion"
        );

    }

});
