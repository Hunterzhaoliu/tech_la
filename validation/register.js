const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let registerErrors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirmedPassword = !isEmpty(data.confirmedPassword)
    ? data.confirmedPassword
    : "";

  // Email checks
  if (Validator.isEmpty(data.email)) {
    registerErrors.email = "Email is required.";
  } else if (!Validator.isEmail(data.email)) {
    registerErrors.email = "Email is invalid.";
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    registerErrors.password = "Password is required.";
  } else if (!Validator.isLength(data.password, { min: 8 })) {
    registerErrors.password = "Password must be atleast 8 characters.";
  }

  if (Validator.isEmpty(data.confirmedPassword)) {
    registerErrors.confirmedPassword = "Please confirm your password.";
  } else if (!Validator.equals(data.password, data.confirmedPassword)) {
    registerErrors.confirmedPassword = "Passwords should match.";
  }

  return {
    registerErrors,
    isValidRegister: isEmpty(registerErrors)
  };
};
