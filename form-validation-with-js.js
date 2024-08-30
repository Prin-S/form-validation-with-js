const form = document.querySelector('#form');

function submitForm(event) {
    // Make the setCustomValidity() message appear when the form is submitted, but the information is missing.
    confirmPassword.reportValidity();
    password.reportValidity();
    postcode.reportValidity();
    country.reportValidity();
    email.reportValidity();

    // Since this form does not actually submit, display a message if all fields are correctly filled.
    if (email.reportValidity() && country.reportValidity() && postcode.reportValidity() && password.reportValidity() && confirmPassword.reportValidity()) {
        message.classList.add('appear');
    } else { // Remove the message if any field is incorrectly filled.
        message.classList.remove('appear');
    }

    event.preventDefault();
}

form.addEventListener('submit', submitForm);

const resetButton = document.querySelector('#reset');

function resetFields() {
    email.setCustomValidity("Email cannot be empty.");
    country.setCustomValidity("Country cannot be empty.");
    postcode.setCustomValidity("Postcode cannot be empty. Use - for no postcode.");
    password.setCustomValidity("Password cannot be empty.");
    confirmPassword.setCustomValidity("Password cannot be empty.");
    message.classList.remove('appear'); // Remove the message when the Reset button is pressed.
}

resetButton.addEventListener('click', () => {
    resetFields();
});

const message = document.querySelector('#message');

const email = document.querySelector('#email');
const atSignRegex = /@/g;
const TLDRegex = /.[a-zA-Z]{2,}$/;
const emailRegex = /^[a-zA-Z0-9._%±]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/; // From https://support.boldsign.com/kb/article/15962/how-to-create-regular-expressions-regex-for-email-address-validation

const country = document.querySelector('#country');
const countryRegex = /^[a-zA-Z]+$/;

const postcode = document.querySelector('#postcode');
const postcodeRegex = /^[a-zA-Z0-9\s-]+$/;

const password = document.querySelector('#password');
const passwordSpaceRegex = /\s/;
const passwordLowercaseRegex = /[a-z]/;
const passwordUppercaseRegex = /[A-Z]/;
const passwordNumbersRegex = /[0-9]/;
const passwordSpecialCharsRegex = /[^(a-zA-Z0-9\s)]/;

const confirmPassword = document.querySelector('#confirm-password');

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
    } else if (!email.value.match(TLDRegex)) {
        email.setCustomValidity("Email TLD has to be at least two characters.");
    } else if (!email.value.match(emailRegex)) {
        email.setCustomValidity("Email contains invalid character(s).");
    } else {
        email.setCustomValidity("");
    }
}

function checkCountry() {
    if (!country.value) {
        country.setCustomValidity("Country cannot be empty.");
    } else if (country.value.length < 2) {
        country.setCustomValidity("Country must be at least two characters.");
    } else if (!country.value.match(countryRegex)) {
        country.setCustomValidity("Country can only contain letters.");
    } else {
        country.setCustomValidity("");
    }
}

function checkPostcode() {
    if (!postcode.value) {
        postcode.setCustomValidity("Postcode cannot be empty. Use - for no postcode.");
    } else if ((postcode.value[0] == '-' || postcode.value[0] == ' ') && postcode.value.length > 1) {
        postcode.setCustomValidity("Postcode cannot start with a hyphen or a space.");
    } else if (postcode.value != '-' && postcode.value.length < 3) {
        postcode.setCustomValidity("Postcode length must be at least three.");
    } else if (!postcode.value.match(postcodeRegex)) {
        postcode.setCustomValidity("Postcode can only contain letters, numbers, hyphens, and spaces.");
    } else {
        postcode.setCustomValidity("");
    }
}

function checkPassword() {
    if (!password.value) {
        password.setCustomValidity("Password cannot be empty.");
    } else if (password.value.match(passwordSpaceRegex)) {
        password.setCustomValidity("Password cannot contain a space.");
    } else if (!password.value.match(passwordLowercaseRegex)) {
        password.setCustomValidity("Password must contain at least one lowercase letter.");
    } else if (!password.value.match(passwordUppercaseRegex)) {
        password.setCustomValidity("Password must contain at least one uppercase letter.");
    } else if (!password.value.match(passwordNumbersRegex)) {
        password.setCustomValidity("Password must contain at least one number.");
    } else if (!password.value.match(passwordSpecialCharsRegex)) {
        password.setCustomValidity("Password must contain at least one special character.");
    } else if (password.value.length < 8) {
        password.setCustomValidity("Password must be at least eight characters.");
    } else if (password.value.length > 30) {
        password.setCustomValidity("Password cannot be longer than 30 characters.");
    } else {
        password.setCustomValidity("");
    }
}

function checkConfirmPassword() {
    if (!confirmPassword.value) {
        confirmPassword.setCustomValidity("Password cannot be empty.");
    } else if (confirmPassword.value != password.value) {
        confirmPassword.setCustomValidity("Passwords do not match.");
    } else {
        confirmPassword.setCustomValidity("");
    }
}

email.addEventListener('input', () => {
    checkEmail();
});

country.addEventListener('input', () => {
    checkCountry();
});

postcode.addEventListener('input', () => {
    checkPostcode();
});

password.addEventListener('input', () => {
    checkPassword();
});

confirmPassword.addEventListener('input', () => {
    checkConfirmPassword();
});

// Make input:invalid apply to all fields when the page first loads.
checkEmail();
checkCountry();
checkPostcode();
checkPassword();
checkConfirmPassword();