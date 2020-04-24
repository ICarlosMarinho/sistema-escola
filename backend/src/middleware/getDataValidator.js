const schemas = {
    absence: require("../schema/absence"),
    parent: require("../schema/parent"),
    anotation: require("../schema/anotation"),
    class: require("../schema/class"),
    grade: require("../schema/grade"),
    student: require("../schema/student"),
    subject: require("../schema/subject"),
    test: require("../schema/test"),
    employee: require("../schema/user"),
};

module.exports = (resource, mode = null) => {

    return ({ body }, res, next) => {
        let valueError = mode
        ? schemas[resource].tailor(mode).validate(body).error
        : schemas[resource].validate(body).error;
    
        if(valueError) {
            console.log(valueError.message);

            return res.status(200).json({ succeed: false });
        }

        return next();
    }
}
