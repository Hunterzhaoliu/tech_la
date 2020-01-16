const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
  let loginErrors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Email checks
  if (Validator.isEmpty(data.email)) {
    loginErrors.email = "Email field is required.";
  } else if (!Validator.isEmail(data.email)) {
    loginErrors.email = "Email is invalid.";
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    loginErrors.password = "Password field is required.";
  } else if (!Validator.isLength(data.password, { min: 8 })) {
    loginErrors.password = "Password must be at least 8 characters.";
  }

  return {
    loginErrors,
    isValidLogin: isEmpty(loginErrors)
  };
};
