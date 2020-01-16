export const isValidString = string => {
  const isValidStringRegex = /^[a-zA-Z ]{1,30}$/;
  return isValidStringRegex.test(string);
};

export const isValidNumber = number => {
  const validNumber = Number(number);
  // !isNaN determines if variable is a valid number
  return !isNaN(validNumber);
};
