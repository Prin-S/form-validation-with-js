const form = document.querySelector('#form');

form.addEventListener('submit', submitForm);

function submitForm(event) {
    // Make the setCustomValidity() message appear when the form is submitted, but the information is missing.
    checkEmail();

    // Make the setCustomValidity() message appear the first time the form is submitted, but the information is missing.
    email.reportValidity()

    event.preventDefault();
}

const atSignRegex = /@/g;
const emailRegex = /^[a-zA-Z0-9._%±]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/; // From https://support.boldsign.com/kb/article/15962/how-to-create-regular-expressions-regex-for-email-address-validation
const email = document.querySelector('#email');

function checkEmail() {
    if (!email.value) {
        email.setCustomValidity("Email cannot be empty.");
    } else if (!email.value.includes('@')) {
        email.setCustomValidity("Email must have the @ sign.");
    } else if (email.value.match(atSignRegex).length != 1) {
        email.setCustomValidity("Email can only have one @ sign.");
    } else if (email.value.slice(email.value.indexOf('@')).indexOf('@') > email.value.slice(email.value.indexOf('@')).indexOf('.')) {
        email.setCustomValidity("At least one period must come after the @ sign.");
    } else if ((email.value.indexOf('.') - email.value.indexOf('@') == 1) || email.value.at(-1) == '.') {
        email.setCustomValidity("Email must contain a full domain name.");
    } else if (!email.value.match(emailRegex)) {
        email.setCustomValidity("Invalid character(s) in the email.");
    } else {
        email.setCustomValidity("");
    }
}

email.addEventListener('input', () => {
    checkEmail();
});