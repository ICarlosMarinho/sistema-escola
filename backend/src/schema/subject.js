const Joi = require("@hapi/joi");

module.exports = Joi.object({
    name: Joi.string()
    .max(45)
    .required(),

    minsPerLesson: Joi.number()
    .integer()
    .positive()
    .max(60)
    .required(),

    year: Joi.date()
    .min((new Date).getFullYear())
    .required(),

    classId: Joi.string()
    .length(32)
    .hex()
    .required(),

    teacherId: Joi.string()
    .length(32)
    .hex()
    .required(),
});