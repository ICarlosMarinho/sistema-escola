const testSchema = require("../../schema/test");

module.exports = ({ body }, res, next) => {
    const valueError = testSchema.validate(body).error;

    if(valueError)
        return res.status(200).json({ message: valueError.message, data: false });

    next();
}