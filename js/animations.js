/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(
        ".section-header, .skill-card, .roadmap-item, .approach-card, .project-lab, .hire-form"
    );


revealElements.forEach((element) => {

    element.classList.add("reveal");

});


if ("IntersectionObserver" in window) {

    const observer =
        new IntersectionObserver(
            (entries, obs) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        obs.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach((element) => {

        observer.observe(element);

    });

} else {

    revealElements.forEach((element) => {

        element.classList.add("visible");

    });

}
