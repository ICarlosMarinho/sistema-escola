const Joi = require("@hapi/joi");

const schema = Joi.object({
	cpf: Joi.string()
		.pattern(/[^0-9]/, { invert: true })
		.length(11)
		.required()
		.alter({
			student: (schema) => schema.forbidden(),
		}),

	image: Joi.binary()
		.required()
		.allow(null)
		.alter({
			parent: (schema) => schema.forbidden(),
		}),

	fullName: Joi.string()
		.pattern(/[^a-zÀ-ÿ\s]/i, { invert: true })
		.min(10)
		.max(80)
		.required()
});

module.exports = schema;
