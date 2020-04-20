const parentSchema = require("../../schema/parent");

module.exports = (operation) => {

    return ({ body }, res, next) => {
        var parentError;
         
        if (!operation)
            parentError = parentSchema.validate(body).error;
        else
            parentError = parentSchema.tailor(operation).validate(body).error;
    
        if (parentError)
            return res.status(200).json({ message: parentError.message, data: false });
    
        next();
    }
}