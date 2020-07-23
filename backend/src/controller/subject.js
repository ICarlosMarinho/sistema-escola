const subjectQuery = require("../database/queries/subject");
const generalQuery = require("../database/queries/general");

async function register({ body }, res) {
    
    const employee = await generalQuery.selectByProperty({
        table: "Employee",
        fields: ["type"],
        property: "User_id",
        value: body.teacherId
    });

    if (!employee || employee.type !== "Professor") 
        return res.status(200).json({ succeed: false });

    const succeed = await subjectQuery.insert(body);
    
    return res.status(200).json({ succeed });
}

async function index(_, res) {
    const subjects = await generalQuery.index({
        table: "Subject",
        fields: [
            "hex(_id) as id",
            "code",
            "name",
            "mins_per_lesson as minsPerLesson",
            "year",
            "hex(Class_id) as classId",
            "hex(Employee_id) as teacherId"
        ]
    });

    return res.status(200).json({ data: subjects });
}

async function findById({ params }, res) {
    const [ subject ] = await generalQuery.selectByProperty({
        table: "Subject",
        fields: [
            "hex(_id) as id",
            "code",
            "name",
            "mins_per_lesson as minsPerLesson",
            "year",
            "hex(Class_id) as classId",
            "hex(Employee_id) as teacherId"
        ],
        property: "_id",
        value: params.id
    });

    if (!subject) return res.status(200).json({ data: null });

    return res.status(200).json({ data: subject });
}

async function findByClassId({ params }, res) {
    const subjects = await generalQuery.selectByProperty({
        table: "Subject",
        fields: [
            "hex(_id) as id",
            "code",
            "name", 
            "mins_per_lesson as minsPerLesson",
            "year",
        ],
        property: "Class_id",
        value: params.classId
    });

    return res.status(200).json(subjects);
}

async function update({ params, body }, res) {

    const [ employee ] = await generalQuery.selectByProperty({
        table: "Employee",
        fields: ["type"],
        property: "User_id",
        value: body.teacherId
    });

    if (!employee || employee.type !== "Professor")
        return res.status(200).json({ succeed: false });
    
    const succeed = await subjectQuery.updateById(
        params.id,
        body
    );

    return res.status(200).json({ succeed });
}

async function deleteById({ params }, res) {
    const { id } = params;
    const succeed = await subjectQuery.deleteById(id);

    return res.status(200).json({ succeed });
}

module.exports = {
    register,
    index,
    findById,
    findByClassId,
    update,
    deleteById
}