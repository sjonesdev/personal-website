const contactForm = document.getElementById('contact-form');
const nameInput = contactForm.querySelector('input[type="text"]');
const emailInput = contactForm.querySelector('input[type="email"]');
const msgInput = contactForm.querySelector('textarea');
const inputs = [nameInput, emailInput, msgInput];

for(let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('focus', e => {
        e.target.classList.add('input--active');
    });

    inputs[i].addEventListener('blur', e => {
        if(!e.target.value)
            e.target.classList.remove('input--active');
    });
}