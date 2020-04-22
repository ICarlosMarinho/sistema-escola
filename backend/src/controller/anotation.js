const anotationQuery = require("../database/queries/anotation");
const generalQuery = require("../database/queries/general");

async function register({ body }, res) {
    const registered = await anotationQuery.insert(body);

    res.status(200).json({ registered });
}

async function findByStudentId({ params }, res) {
    const anotations = await generalQuery.selectByProperty({
        table: "Absence",
        fields: [
            "hex(_id) as id",
            "date",
            "text",
            "hex(Employee_id) as teacherId"
        ],
        property: "Student_id",
        value: params.studentId
    });

    return res.status(200).json(anotations);
}

async function update({ params, body }, res) {
    const updated = await anotationQuery.updateById(params.id, body);

    res.status(200).json({ updated });
}

async function deleteById({ params }, res) {
    const deleted = await generalQuery.deleteById(params.id);

    res.status(200).json({ deleted });
}

module.exports = {
    register,
    findByStudentId,
    update,
    deleteById
}