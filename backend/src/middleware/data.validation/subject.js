const subjectSchema = require("../../schema/subject");

module.exports = ({ body }, res, next) => {
    const valueError = subjectSchema.validate(body).error;

    if(valueError)
        return res.status(200).json({ message: valueError.message, data: false });

    next();
}