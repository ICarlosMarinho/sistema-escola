const Joi = require("@hapi/joi");

const objSchema = Joi.object({
    date: Joi.date()
    .max("now")
    .required(),

    text: Joi.string()
    .required(),

    studentId: Joi.string()
    .length(32)
    .hex()
    .required()
    .alter({
        update: (schema) => schema.forbidden()
    }),

    teacherId: Joi.string()
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