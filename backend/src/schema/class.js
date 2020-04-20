const Joi = require("@hapi/joi");

module.exports = Joi.object({
    name: Joi.string()
    .max(45)
    .required(),

    period: Joi.string()
    .valid("Manhã", "Tarde", "Integral")
    .required(),

    startAt: Joi.string()
    .required(),

    endAt: Joi.string()
    .required()
});
