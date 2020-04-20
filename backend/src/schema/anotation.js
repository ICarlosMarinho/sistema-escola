const Joi = require("@hapi/joi");

module.exports = Joi.object({
    date: Joi.date()
    .less(Date.now())
    .required(),

    text: Joi.string()
    .required(),

    studentId: Joi.string()
    .length(32)
    .hex()
    .required(),

    teacherId: Joi.string()
    .length(32)
    .hex()
    .required()
});