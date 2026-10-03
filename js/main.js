/* =========================================================
   AMAN KKUMAR — PORTFOLIO
   Main JavaScript
   Typewriter Effect & Core Functionality
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. TYPEWRITER EFFECT - CORE LOGIC
    ===================================================== */

    const typingTarget = document.getElementById("typingTarget");
    const typingCursor = document.querySelector(".typing-cursor");

    if (typingTarget && typingCursor) {

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        // Phrases to type
        const phrases = [
            "Aman",
            "Student",
            "Electronics Engineering Student",
            "Embedded Systems Learner",
            "AI Explorer"
        ];

        let currentPhraseIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let typewriterTimeout;

        function typewriter() {
            
            if (prefersReducedMotion) {
                typingTarget.textContent = phrases[0];
                typingCursor.style.display = "none";
                return;
            }

            const currentPhrase = phrases[currentPhraseIndex];

            if (!isDeleting) {
                // Typing forward
                if (currentCharIndex < currentPhrase.length) {
                    typingTarget.textContent = currentPhrase.substring(0, currentCharIndex + 1);
                    currentCharIndex++;
                    typewriterTimeout = setTimeout(typewriter, 60); // Typing speed
                } else {
                    // Phrase complete, pause before deleting
                    typewriterTimeout = setTimeout(() => {
                        isDeleting = true;
                        typewriter();
                    }, 1800); // Pause after typing
                }
            } else {
                // Deleting backwards
                if (currentCharIndex > 0) {
                    typingTarget.textContent = currentPhrase.substring(0, currentCharIndex - 1);
                    currentCharIndex--;
                    typewriterTimeout = setTimeout(typewriter, 40); // Delete speed
                } else {
                    // Phrase deleted, move to next
                    currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
                    isDeleting = false;
                    typewriterTimeout = setTimeout(typewriter, 600); // Pause before next phrase
                }
            }
        }

        // Start typewriter
        typewriter();

        // Cursor blink
        if (!prefersReducedMotion) {
            setInterval(() => {
                if (typingCursor.style.opacity === "1" || typingCursor.style.opacity === "") {
                    typingCursor.style.opacity = "0.2";
                } else {
                    typingCursor.style.opacity = "1";
                }
            }, 530);
        }
    }


    /* =====================================================
       2. HEADER SCROLL EFFECT
    ===================================================== */

    const header = document.querySelector(".site-header");

    function handleHeaderScroll() {
        if (!header) return;

        if (window.scrollY > 50) {
            header.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.2)";
            header.style.borderBottomColor = "rgba(148, 163, 184, 0.2)";
        } else {
            header.style.boxShadow = "none";
            header.style.borderBottomColor = "rgba(148, 163, 184, 0.1)";
        }
    }

    window.addEventListener("scroll", handleHeaderScroll);
    handleHeaderScroll();


    /* =====================================================
       3. SMOOTH SCROLL BEHAVIOR
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    /* =====================================================
       4. EXTERNAL LINKS
    ===================================================== */

    const externalLinks = document.querySelectorAll(
        'a[href^="http"], a[href^="mailto:"], a[href^="https://t.me/"]'
    );

    externalLinks.forEach((link) => {
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
    });


    /* =====================================================
       5. IMAGE ERROR HANDLING
    ===================================================== */

    const images = document.querySelectorAll("img");

    images.forEach((image) => {
        image.addEventListener("error", () => {
            image.style.opacity = "0.5";
            image.style.background = "rgba(148, 163, 184, 0.1)";
        });
    });


    /* =====================================================
       6. ACTIVE SECTION INDICATOR
    ===================================================== */

    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");

    const activeSectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const sectionId = entry.target.getAttribute("id");

                navLinks.forEach((link) => {
                    link.classList.remove("active");

                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            });
        },
        { threshold: 0.4 }
    );

    sections.forEach((section) => {
        activeSectionObserver.observe(section);
    });


    /* =====================================================
       7. CURRENT YEAR IN FOOTER
    ===================================================== */

    const footerYear = document.querySelector(".site-footer p");

    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.textContent = `© ${currentYear} Aman kkumar`;
    }


    /* =====================================================
       8. REDUCED MOTION CHECK
    ===================================================== */

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches) {
        document.documentElement.classList.add("reduce-motion");
    }

});
