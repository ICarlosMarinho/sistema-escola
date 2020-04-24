const anotationQuery = require("../database/queries/anotation");
const generalQuery = require("../database/queries/general");

async function register({ body }, res) {
    const succeed = await anotationQuery.insert(body);

    res.status(200).json({ succeed });
}

async function findByStudentId({ params }, res) {
    const anotations = await generalQuery.selectByProperty({
        table: "Anotation",
        fields: [
            "hex(_id) as id",
            "date",
            "text",
            "hex(Employee_id) as teacherId"
        ],
        property: "Student_id",
        value: params.studentId
    });

    return res.status(200).json({ data: anotations });
}

async function update({ params, body }, res) {
    const succeed = await anotationQuery.updateById(params.id, body);

    return res.status(200).json({ succeed });
}

async function deleteById({ params }, res) {
    const succeed = await generalQuery.deleteById({
        table: "Anotation",
        id: params.id
    });

    return res.status(200).json({ succeed });
}

module.exports = {
    register,
    findByStudentId,
    update,
    deleteById
}