window.onload = () => {
    const fadeTarget = document.querySelector('.loader-wrapper');
    fadeTarget.classList.add('fade-out');
    setTimeout(() => {fadeTarget.classList.add('none')}, 500);
};

/**
 * 
 * @param {Element} inactiveIcon 
 * @param {Element} activeIcon 
 * @param {Element} accordionContent 
 * @returns 
 */
function getAccordionOnClick(inactiveIcon, activeIcon, accordionContent) {
    let expanded = false;
    accordionContent.classList.add('none');
    activeIcon.classList.add('none');
    return (/** @type MouseEvent */event) => {
        if(expanded) {
            accordionContent.classList.add('none'); // currently showing, so hide
            inactiveIcon.classList.remove('none');
            activeIcon.classList.add('none');
        }
        else {
            accordionContent.classList.remove('none'); // currently hidden, so show
            inactiveIcon.classList.add('none');
            activeIcon.classList.remove('none');
        }
        expanded = !expanded
    }
}

const accordions = document.getElementsByClassName('accordion-container');
for(const accordion of accordions) {
    /** @type HTMLButtonElement */
    const accordionButton = accordion.querySelector('button.accordion-btn');
    const activeIcon = accordionButton.querySelector('i.fa-chevron-up');
    const inactiveIcon = accordionButton.querySelector('i.fa-chevron-down');
    const accordionContent = accordion.querySelector('div.accordion-content');
    accordionButton.onclick = getAccordionOnClick(inactiveIcon, activeIcon, accordionContent)
}