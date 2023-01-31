window.onload = () => {
    const fadeTarget = document.querySelector('.loader-wrapper');
    fadeTarget.classList.add('fade-out');
    setTimeout(() => {fadeTarget.classList.add('none')}, 500);
};

function getAccordionOnClick(/** @type Element */accordionContent) {
    let expanded = false;
    accordionContent.classList.add('none');
    return () => {
        if(expanded) accordionContent.classList.add('none'); // currently showing, so hide
        else accordionContent.classList.remove('none'); // currently hidden, so show
        expanded = !expanded
    }
}

const accordions = document.getElementsByClassName('accordion-container');
for(const accordion of accordions) {
    /** @type HTMLButtonElement */
    const accordionButton = accordion.querySelector('button.accordion-btn');
    const accordionContent = accordion.querySelector('div.accordion-content');
    accordionButton.onclick = getAccordionOnClick(accordionContent)
}