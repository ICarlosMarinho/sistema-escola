const Joi = require("@hapi/joi");

module.exports = Joi.string()
  .pattern(/^Basic\s{1}([A-z0-9+/])+(=)*$/)
  .required();
