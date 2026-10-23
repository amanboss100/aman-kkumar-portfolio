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

// ---------------- 3D CARD TILT & GLARE ----------------
    const cards = document.querySelectorAll(".card");

    // Sirf laptop/desktop par tilt chalayenge (mobile par touch scroll smooth rakhne ke liye)
    if (window.matchMedia("(pointer: fine)").matches) {
        cards.forEach(card => {
            // Glare (shine) layer add karna
            const glare = document.createElement("div");
            glare.classList.add("card-glare");
            card.appendChild(glare);

            card.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                // Tilt angle calculate karna (max 10 degrees)
                const rotateX = ((y - centerY) / centerY) * -10;
                const rotateY = ((x - centerX) / centerX) * 10;

                card.style.transition = "transform 0.08s ease-out";
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

                // Light shine ko mouse ke saath move karna
                glare.style.opacity = "1";
                glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 229, 255, 0.18), transparent 60%)`;
            });

            card.addEventListener("mouseleave", () => {
                card.style.transition = "transform 0.5s ease";
                card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
                glare.style.opacity = "0";
            });
        });
    }

    // ---------------- UI TACTILE SOUND ENGINE ----------------
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    let audioCtx = null;

    const playUISound = (type = "click") => {
        try {
            if (!audioCtx) audioCtx = new AudioCtx();
            if (audioCtx.state === "suspended") audioCtx.resume();

            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);

            const now = audioCtx.currentTime;

            if (type === "click") {
                // Crisp mechanical pop sound for buttons & links
                osc.type = "sine";
                osc.frequency.setValueAtTime(520, now);
                osc.frequency.exponentialRampToValueAtTime(140, now + 0.045);

                gain.gain.setValueAtTime(0.12, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

                osc.start(now);
                osc.stop(now + 0.045);
            } else if (type === "toggle") {
                // Futuristic switch sound for Theme Toggle & Checkbox
                osc.type = "triangle";
                osc.frequency.setValueAtTime(320, now);
                osc.frequency.exponentialRampToValueAtTime(680, now + 0.07);

                gain.gain.setValueAtTime(0.15, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

                osc.start(now);
                osc.stop(now + 0.07);
            }
        } catch (err) {
            // Audio blocked or unsupported
        }
    };

    // Buttons aur Navbar links par click sound
    document.querySelectorAll(".btn, .nav-links a, .skill-tag").forEach(el => {
        el.addEventListener("mousedown", () => playUISound("click"));
    });

    // Dark/Light Mode Toggle par switch sound
    if (themeToggle) {
        themeToggle.addEventListener("mousedown", () => playUISound("toggle"));
    }

    // Bade 3D Checkbox par switch sound
    const consentCheckbox = document.getElementById("consent");
    if (consentCheckbox) {
        consentCheckbox.addEventListener("change", () => playUISound("toggle"));
    }
