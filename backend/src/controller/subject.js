const subjectQuery = require("../database/queries/subject");
const generalQuery = require("../database/queries/general");

async function register({ body }, res) {
    
    const employee = await generalQuery.selectByProperty({
        table: "Employee",
        fields: ["type"],
        property: "User_id",
        value: body.teacherId
    });

    if (!employee) {
        return res.status(200).json({ 
            message: "teacherId not found in the database",
            registered: false
        });
    }

    if (employee.type !== "Professor") {
        return res.status(200).json({ 
            message: "This teacherId is not associated a 'teacher' type",
            registered: false
        });
    }

    const registered = await subjectQuery.insert(body);
    
    return res.status(200).json({ registered });
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

    return res.status(200).json(subjects);
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

    if (!subject)
        return res.status(200).json(null);

    return res.status(200).json(subject);
}

async function update({ params, body }, res) {

    const [ employee ] = await generalQuery.selectByProperty({
        table: "Employee",
        fields: ["type"],
        property: "User_id",
        value: body.teacherId
    });

    if (!employee) {
        return res.status(200).json({ 
            message: "teacherId not found in the database",
            registered: false
        });
    }

    if (employee.type !== "Professor") {
        return res.status(200).json({ 
            message: "This teacherId is not associated a 'teacher' type",
            registered: false
        });
    }

    const updated = await subjectQuery.updateById(
        params.id,
        body
    );

    return res.status(200).json({ updated });
}

async function deleteById({ params }, res) {
    const { id } = params;
    const deleted = await subjectQuery.deleteById(id);

    return res.status(200).json({ deleted });
}

module.exports = {
    register,
    index,
    findById,
    update,
    deleteById
}