const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function signIn(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    email = !isEmpty(data.email)
        ? data.email
        : "";
    password = !isEmpty(data.password) ? data.password : "";

    // Name checks

    if (Validator.isEmpty(data.email)) {
        errors.email = "Please provide your email";
    }
    
    if (Validator.isEmpty(data.password)) {
        errors.password = "Please provide a password";
    }
    return {
        errors,
        isValid: isEmpty(errors),
    };
};
