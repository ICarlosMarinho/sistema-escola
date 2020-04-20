const studentSchema = require("../../schema/student");

module.exports = (operation) => {

	return ({ body }, res, next) => {
		var studentError;

		if (!operation)
			studentError = studentSchema.validate(body).error;
		else
			studentError = studentSchema.tailor(operation).validate(body).error;
	
		if (studentError)
			return res.status(200).json({ message: studentError.message, data: false });
	
		next();
	};
}