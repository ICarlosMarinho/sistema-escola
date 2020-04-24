const person = require("./person");
const Joi = require("@hapi/joi");

const schema = person.keys({
    telNumber: Joi.string()
    .pattern(/[^0-9]/, { invert: true })
    .min(10)
    .max(11)
    .required()
    .alter({
        auth: (schema) => schema.forbidden()
    }),

    email: Joi.string()
    .allow(null)
    .max(80)
    .email({ allowUnicode: false })
    .required()
    .alter({
        auth: (schema) => schema.forbidden()
    }),

    password: Joi.string()
    .allow(null)
    .min(8)
    .max(20)
    .required()
    .alter({
        auth: (schema) => schema.disallow(null)
    }),

    type: Joi.string()
    .required()
    .valid("Gestor", "Professor")
    .alter({
        parent: (schema) => schema.forbidden(),
        auth: (schema) => schema.forbidden()
    })
});

module.exports = schema;