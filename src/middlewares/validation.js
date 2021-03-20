const Joi = require("@hapi/joi");

module.exports = {
	registerValidation: (data) => {
		const schema = Joi.object({
			name: Joi.string().min(6).required(),
			email: Joi.string().min(6).required().email(),
			password: Joi.string().min(6).max(1024).required(),
		});

		return schema.validate(data);
	},

	loginValidation: (data) => {
		const schema = Joi.object({
			email: Joi.string().min(6).required().email(),
			password: Joi.string().required(),
		});

		return schema.validate(data);
	},

	newBookingValidation: (data) => {
		const schema = Joi.object({
			doctorName: Joi.string().required(),
			date: Joi.date().required(),
			reason: Joi.string().default(""),
			token: Joi.object(),
		})

		return schema.validate(data);
	},

	getBookingValidation: (data) => {
		const schema = Joi.object({
			username: Joi.string().required(),
			date: Joi.date().required(),
			token: Joi.object(),
		})

		return schema.validate(data);
	}
}