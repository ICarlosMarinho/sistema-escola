const userSchema = require("./user").tailor("parent");
const Joi = require("@hapi/joi");

const schema = userSchema.keys({
    studentsIds: Joi.array()
    .min(1)
    .items(Joi.string().length(32).hex())
    .required()
    .alter({
        update: (schema) => schema.forbidden()
    })
});

module.exports = schema;