const person = require("./person").tailor("student");
const parentSchema = require("./user").tailor("parent");
const Joi = require("@hapi/joi");

const schema = person.keys({ 

    bCertificate: Joi.string()
    .pattern(/[^0-9]/, { invert: true })
    .length(32)
    .required(),

    birthDate: Joi.date()
    .required()
    .less(Date.now()),

    address: Joi.string()
    .max(80)
    .required(),

    desabilities: Joi.string()
    .allow(null)
    .max(60)
    .required(),

    classId: Joi.string()
    .length(32)
    .hex()
    .required(),
    
    parents: Joi.array()
    .min(1)
    .items(parentSchema)
    .required()
    .alter({
        update: (schema) => schema.forbidden()
    })
});

module.exports = schema;