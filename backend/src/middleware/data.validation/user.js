const userSchema = require("../../schema/user");

module.exports = ({ body }, res, next) => {

    const dataError = userSchema.validate(body).error;

    if(dataError)
        return res.status(200).json({ message: dataError.message, data: false });

    next();
}