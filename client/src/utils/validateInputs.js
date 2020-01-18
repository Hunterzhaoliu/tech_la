// https://stackoverflow.com/questions/14088714/regular-expression-for-name-field-in-javascript-validation
// this valid string also includes _
const isValidStringRegex = /^[a-zA-Z_ ]{0,30}$/;

export const isValidString = string => {
  return isValidStringRegex.test(string);
};

const isValidNumberRegex = /^[0-9]*$/;
// isValidNumberRegex.test("") === true
export const isValidNumber = number => {
  return isValidNumberRegex.test(number);
};
