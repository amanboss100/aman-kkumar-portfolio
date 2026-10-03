/* =========================================================
   AMAN KKUMAR — PORTFOLIO
   Main JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. TYPEWRITER EFFECT
    ===================================================== */

    const typingText = document.getElementById("typingText");
    const typingCursor = document.getElementById("typingCursor");

    // Only initialize if elements exist
    if (typingText && typingCursor) {

        // Check for reduced motion preference
        const prefersReducedMotion = 
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        // Array of phrases to type
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
            const currentPhrase = phrases[currentPhraseIndex];
            
            if (prefersReducedMotion) {
                // Show first phrase only, no animation
                typingText.textContent = phrases[0];
                typingCursor.style.opacity = "0";
                return;
            }

            if (!isDeleting) {
                // Typing forward
                if (currentCharIndex < currentPhrase.length) {
                    typingText.textContent = currentPhrase.substring(0, currentCharIndex + 1);
                    currentCharIndex++;
                    typewriterTimeout = setTimeout(typewriter, 60); // Typing speed
                } else {
                    // Phrase complete, pause before deleting
                    typewriterTimeout = setTimeout(() => {
                        isDeleting = true;
                        typewriter();
                    }, 1500); // Pause after typing
                }
            } else {
                // Deleting backwards
                if (currentCharIndex > 0) {
                    typingText.textContent = currentPhrase.substring(0, currentCharIndex - 1);
                    currentCharIndex--;
                    typewriterTimeout = setTimeout(typewriter, 40); // Delete speed
                } else {
                    // Phrase deleted, move to next
                    currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
                    isDeleting = false;
                    typewriterTimeout = setTimeout(typewriter, 500); // Pause before next phrase
                }
            }
        }

        // Start typewriter effect
        typewriter();

        // Cursor blinking
        if (!prefersReducedMotion) {
            setInterval(() => {
                typingCursor.style.opacity = 
                    typingCursor.style.opacity === "0" ? "1" : "0";
            }, 530);
        }
    }


    /* =====================================================
       2. HEADER SCROLL EFFECT
    ===================================================== */

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


    /* =====================================================
       3. EXTERNAL LINKS
    ===================================================== */

    const externalLinks = document.querySelectorAll(
        'a[href^="http"], a[href^="mailto:"], a[href^="https://t.me/"]'
    );

    externalLinks.forEach((link) => {
        if (link.href.startsWith("http")) {
            link.setAttribute("target", "_blank");
            link.setAttribute("rel", "noopener noreferrer");
        }
    });


    /* =====================================================
       4. IMAGE FALLBACK
    ===================================================== */

    const images = document.querySelectorAll("img");

    images.forEach((image) => {
        image.addEventListener("error", () => {
            image.style.opacity = "0.5";
        });
    });

});
