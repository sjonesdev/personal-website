window.onload = () => {
    const fadeTarget = document.querySelector('.loader-wrapper');
    fadeTarget.classList.add('fade-out');
    setTimeout(() => {fadeTarget.classList.add('none')}, 500);
};