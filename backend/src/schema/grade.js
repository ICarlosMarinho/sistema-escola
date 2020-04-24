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
    .required()
    .alter({
        update: (schema) => schema.forbidden()
    }),

    studentId: Joi.string()
    .length(32)
    .hex()
    .required()
    .alter({
        update: (schema) => schema.forbidden()
    })
});

const schema = Joi.array()
    .items(objSchema)
    .min(1)
    .max(60)
    .alter({
        update: (schema) => schema = objSchema
    });

module.exports = schema;