window.onload = () => {
    const fadeTarget = document.querySelector('.loader-wrapper');
    fadeTarget.classList.add('fade-out');
    setTimeout(() => {fadeTarget.classList.add('none')}, 500);

    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        // generate a five digit number for the contact_number variable
        this.contact_number.value = Math.random() * 100000 | 0;
        // these IDs from the previous steps
        const sendBtn = document.querySelector('.contact-btn');
        const sendCheck = document.getElementById('contact-success-check');
        emailjs.sendForm('service_tg8r0pp', 'template_fdvp26o', this)
            .then(function() {
                console.log('Message sent successfully');
                sendBtn.classList.add('contact-success');
                sendCheck.classList.remove('hidden');
            }, function(error) {
                console.log('Message failed to send', error);
                alert('There was a problem sending your message.')
            });
    });
};

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