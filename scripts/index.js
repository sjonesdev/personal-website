window.onload = () => {
    const fadeTarget = document.querySelector('.loader-wrapper');
    fadeTarget.classList.add('fade-out');
    setTimeout(() => {fadeTarget.classList.add('none')}, 500);
    setupAccordions();
    scrollToIdInUrl();
};

/**
 * 
 * @param {HTMLElement} icon 
 * @param {HTMLElement} accordionContent 
 * @returns 
 */
function getAccordionOnClick(icon, accordionContent) {
    let expanded = false;
    let contentHeight = `${accordionContent.offsetHeight}px`;
    accordionContent.style.maxHeight = '0px';
    icon.classList.remove('accordion-icon--active');
    return (/** @type MouseEvent */event) => {
        console.log("hello")
        if(expanded) {
            // accordionContent.classList.remove('accordion-content--open'); // currently showing, so hide
            accordionContent.style.maxHeight = '0px';
            icon.classList.remove('accordion-icon--active');
        }
        else {
            accordionContent.style.maxHeight = contentHeight;
            // accordionContent.classList.add('accordion-content--open'); // currently hidden, so show
            icon.classList.add('accordion-icon--active');
        }
        expanded = !expanded
    }
}

function setupAccordions() {
const accordions = document.getElementsByClassName('accordion-container');
    for(const accordion of accordions) {
        /** @type HTMLButtonElement */
        const projectPreview = accordion.querySelector('div.project');
        const accordionButton = accordion.querySelector('button.accordion-btn');
        const icon = accordionButton.querySelector('i.fa-chevron-down');
        const accordionContent = accordion.querySelector('div.accordion-content');
        accordionButton.onclick = getAccordionOnClick(icon, accordionContent)
        projectPreview.addEventListener('click', function (ev) {
            console.log(ev.target)
            // console.log(this);
            // console.log("\n\n")
            if(ev.target === accordionButton || ev.target === icon) return;
            accordionButton.onclick();
        });
    }
}

function scrollToIdInUrl() {
    const id = window.location.toString().split('#')[1];
    if(!id) return;
    const element = document.getElementById(id);
    if(!element) return;
    element.scrollIntoView();
}