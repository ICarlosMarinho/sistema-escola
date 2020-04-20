const Joi = require("@hapi/joi");

module.exports = Joi.object({

    value: Joi.number()
    .min(0)
    .max(10)
    .precision(2)
    .required(),

    testId: Joi.string()
    .length(32)
    .hex()
    .required(),

    studentId: Joi.string()
    .length(32)
    .hex()
    .required()
});