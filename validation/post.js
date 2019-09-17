const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function (data) {
  let errors = {};

  data.message = validText(data.message) ? data.message : '';

  if (Validator.isEmpty(data.message)) {
    errors.username = "Please enter a message!"
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }

}