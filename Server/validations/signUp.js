const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function signUp(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    firstname = !isEmpty(data.firstname) ? data.firstname : "";
    lastname = !isEmpty(data.lastname) ? data.lastname : "";
    email = !isEmpty(data.email)
        ? data.email
        : "";
    password = !isEmpty(data.password) ? data.password : "";

    // Name checks

    if (Validator.isEmpty(data.firstname)) {
        errors.firstname = "Firstname is required";
    }
    if (Validator.isEmpty(data.lastname)) {
        errors.lastname = "Lastname is required";
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email is required";
    }
    
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password is required";
    }
    return {
        errors,
        isValid: isEmpty(errors),
    };
};
