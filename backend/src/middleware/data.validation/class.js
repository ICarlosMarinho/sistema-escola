const classSchema = require("../../schema/class");

module.exports = ({ body }, res, next) => {
    const valueError = classSchema.validate(body).error;

    if(valueError)
        return res.status(200).json({ message: valueError.message, data: false });

    next();
}