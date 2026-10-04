/* =========================================
   MAIN
========================================= */


/* =========================================
   THEME
========================================= */

const themeToggle =
    document.getElementById("themeToggle");

const themeIcon =
    document.getElementById("themeIcon");


function setTheme(theme) {

    if (theme === "light") {

        document.documentElement
            .setAttribute(
                "data-theme",
                "light"
            );

        if (themeIcon) {
            themeIcon.textContent = "☾";
        }

    } else {

        document.documentElement
            .removeAttribute(
                "data-theme"
            );

        if (themeIcon) {
            themeIcon.textContent = "☀";
        }

    }

}


const savedTheme =
    localStorage.getItem(
        "portfolio-theme"
    );


if (savedTheme) {

    setTheme(savedTheme);

} else {

    setTheme("dark");

}


if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            const current =
                document.documentElement
                    .getAttribute(
                        "data-theme"
                    );

            const next =
                current === "light"
                    ? "dark"
                    : "light";

            setTheme(next);

            localStorage.setItem(
                "portfolio-theme",
                next
            );

        }
    );

}


/* =========================================
   BACK TO TOP
========================================= */

const backToTop =
    document.getElementById(
        "backToTop"
    );


if (backToTop) {

    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 500) {

                backToTop.classList.add(
                    "visible"
                );

            } else {

                backToTop.classList.remove(
                    "visible"
                );

            }

        },
        {
            passive: true
        }
    );


    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================
   ACTIVE NAV LINK
========================================= */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );

const navigationLinks =
    document.querySelectorAll(
        ".nav-links a"
    );


if ("IntersectionObserver" in window) {

    const sectionObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    navigationLinks.forEach(
                        (link) => {

                            link.classList.remove(
                                "active"
                            );

                        }
                    );


                    const activeLink =
                        document.querySelector(
                            `.nav-links a[href="#${entry.target.id}"]`
                        );


                    if (activeLink) {

                        activeLink.classList.add(
                            "active"
                        );

                    }

                });

            },
            {
                rootMargin:
                    "-30% 0px -60% 0px"
            }
        );


    sections.forEach((section) => {

        sectionObserver.observe(section);

    });

}
