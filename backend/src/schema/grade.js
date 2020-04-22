const Joi = require("@hapi/joi");

const objSchema = Joi.object({

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

const schema = Joi.array()
    .items(objSchema)
    .min(1)
    .max(60)
    .alter({
        update: (schema) => schema = objSchema
    });

module.exports = schema;