document.addEventListener("DOMContentLoaded", () => {
    // Theme Toggle Logic
    const themeToggle = document.getElementById("themeToggle");
    const body = document.documentElement;
    
    const savedTheme = localStorage.getItem("theme") || "dark";
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

    // Set Active Nav Link Automatically
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
});

// ---------------- TYPEWRITER EFFECT ----------------
    const typewriterElement = document.getElementById("typewriter");
    if (typewriterElement) {
        const words = ["Python Developer", "Electronics Engineer", "Web Developer", "AI Enthusiast"];
        let wordIndex = 0; let charIndex = 0; let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 1500; // Pause at end of word
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500; // Pause before new word
            }
            setTimeout(type, typeSpeed);
        }
        type();
    }

    // ---------------- SCROLL REVEAL ----------------
    const reveals = document.querySelectorAll(".reveal, .card");
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        reveals.forEach(reveal => {
            const revealTop = reveal.getBoundingClientRect().top;
            if (revealTop < windowHeight - 50) {
                reveal.classList.add("active");
            }
        });
    };
    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Trigger on load
