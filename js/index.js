const contactForm = document.getElementById('contact-form');
const nameInput = contactForm.querySelector('input[type="text"]');
const emailInput = contactForm.querySelector('input[type="email"]');
const msgInput = contactForm.querySelector('textarea');
const inputs = [nameInput, emailInput, msgInput];

const nameErr = contactForm.querySelector('p.name-err');
const emailErr = contactForm.querySelector('p.email-err');
const msgErr = contactForm.querySelector('p.msg-err');
const errs = [nameErr, emailErr, msgErr];

for(let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('focus', e => {
        e.target.classList.add('input--active');
    });

    inputs[i].addEventListener('input', e => {
        if(e.target.value) {
            errs[i].classList.add('hidden');
        }
    });

    inputs[i].addEventListener('blur', e => {
        if(!e.target.value) {
            e.target.classList.remove('input--active');
            errs[i].classList.remove('hidden');
        }
    });
}