const testQuery = require("../database/queries/test");
const generalQuery = require("../database/queries/general");

async function register({ body }, res) {
    const succeed = await testQuery.insert(body);

    return res.status(200).json({ succeed });
} 

async function findBySubjectId({ params }, res) {
    const tests = await generalQuery.selectByProperty({
        table: "Test",
        fields: [
            "hex(_id) as id",
            "date",
            "name",
            "min_grade as minGrade",
            "max_grade as maxGrade"
        ],
        property: "Subject_id",
        value: params.subjectId
    });

    return res.status(200).json({ data: tests });
}

async function update({ params, body }, res) {
    const succeed = await testQuery.updateById(params.id, body);

    return res.status(200).json({ succeed });
}

async function deleteById({ params }, res) {
    const succeed = await generalQuery.deleteById({
        table: "Test",
        id: params.id
    });

    return res.status(200).json({ succeed });
}

module.exports = {
    register,
    findBySubjectId,
    update,
    deleteById
}