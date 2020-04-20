const Joi = require("@hapi/joi");

module.exports = Joi.object({

    date: Joi.date()
    .required(),

    name: Joi.string()
    .max(45)
    .required(),

    minGrade: Joi.number()
    .min(0)
    .max(10)
    .precision(2)
    .required(),

    maxGrade: Joi.number()
    .min(0)
    .max(10)
    .greater(Joi.ref("minGrade"))
    .precision(2)
    .required(),

    subjectId: Joi.string()
    .length(32)
    .hex()
    .required()
});