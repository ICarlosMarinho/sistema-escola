const Joi = require("@hapi/joi");

module.exports = Joi.object({

    count: Joi.number()
    .integer()
    .min(0)
    .required(),

    studentId: Joi.string()
    .length(32)
    .hex()
    .required(), 
    
    subjectId: Joi.string()
    .length(32)
    .hex()
    .required()
});