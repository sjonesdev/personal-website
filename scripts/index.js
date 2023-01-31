window.onload = () => {
    const fadeTarget = document.querySelector('.loader-wrapper');
    fadeTarget.classList.add('fade-out');
    setTimeout(() => {fadeTarget.classList.add('none')}, 500);
};

/**
 * 
 * @param {Element} icon 
 * @param {Element} accordionContent 
 * @returns 
 */
function getAccordionOnClick(icon, accordionContent) {
    let expanded = false;
    // accordionContent.classList.add('none');
    icon.classList.remove('accordion-icon--active');
    return (/** @type MouseEvent */event) => {
        if(expanded) {
            accordionContent.classList.remove('accordion-content--open'); // currently showing, so hide
            icon.classList.remove('accordion-icon--active');
        }
        else {
            accordionContent.classList.add('accordion-content--open'); // currently hidden, so show
            icon.classList.add('accordion-icon--active');
        }
        expanded = !expanded
    }
}

const accordions = document.getElementsByClassName('accordion-container');
for(const accordion of accordions) {
    /** @type HTMLButtonElement */
    const accordionButton = accordion.querySelector('button.accordion-btn');
    const icon = accordionButton.querySelector('i.fa-chevron-down');
    const accordionContent = accordion.querySelector('div.accordion-content');
    accordionButton.onclick = getAccordionOnClick(icon, accordionContent)
}