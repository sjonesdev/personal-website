window.onload = () => {
    const fadeTarget = document.querySelector(".loader-wrapper");
    fadeTarget.classList.add("fade-out");
    setTimeout(() => {
        fadeTarget.classList.add("none");
    }, 500);
    setupAccordions();
    scrollToIdInUrl();
};

function setupAccordions() {
    const accordions = document.getElementsByClassName("accordion-container");
    /** @type HTMLElement[] */
    const accordionContents = new Array(accordions.length);
    /** @type boolean[] */
    const accordionsOpen = new Array(accordions.length).fill(false);
    for (let i = 0; i < accordions.length; i++) {
        const accordion = accordions[i];
        /** @type HTMLButtonElement */
        const projectPreview = accordion.querySelector("div.project");
        const accordionButton = accordion.querySelector("button.accordion-btn");
        const icon = accordionButton.querySelector("i.fa-chevron-down");
        const accordionContent = accordion.querySelector(
            "div.accordion-content"
        );
        accordionContents[i] = accordionContent;

        accordionContent.style.maxHeight = "0px";
        icon.classList.remove("accordion-icon--active");
        accordionButton.onclick = () => {
            if (accordionsOpen[i]) {
                accordionContent.style.maxHeight = "0px";
                icon.classList.remove("accordion-icon--active");
            } else {
                accordionContent.style.maxHeight = "none";
                const height = `${accordionContent.offsetHeight}px`;
                accordionContent.style.maxHeight = "0px";
                setTimeout(() => {
                    accordionContent.style.maxHeight = height;
                }, 0);
                icon.classList.add("accordion-icon--active");
            }
            accordionsOpen[i] = !accordionsOpen[i];
        };
        projectPreview.addEventListener("click", function (ev) {
            console.log(ev.target);
            if (ev.target === accordionButton || ev.target === icon) return;
            accordionButton.onclick();
        });
    }

    window.addEventListener("resize", () => {
        for (let i = 0; i < accordions.length; i++) {
            if (accordionsOpen[i]) {
                const lastHeight = accordionContents[i].style.maxHeight;
                accordionContents[i].style.maxHeight = "none";
                const newHeight = `${accordionContents[i].offsetHeight}px`;
                accordionContents[i].style.maxHeight = lastHeight;
                setTimeout(() => {
                    accordionContents[i].style.maxHeight = newHeight;
                }, 0);
            }
        }
    });
}

function scrollToIdInUrl() {
    const id = window.location.toString().split("#")[1];
    if (!id) return;
    const element = document.getElementById(id);
    if (!element) return;
    element.scrollIntoView();
}
