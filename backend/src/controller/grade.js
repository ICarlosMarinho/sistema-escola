const gradeQuery = require("../database/queries/grade");
const generalQuery = require("../database/queries/general");

async function register({ body }, res) {
    const succeed = await gradeQuery(body);

    return res.status(200).json({ succeed });
}

async function findByTestId({ params }, res) {
    const grades = await generalQuery.selectByProperty({
        table: "Grade",
        fields: [
            "value",
            "hex(Student_id) as studentId"
        ],
        property: "Test_id",
        value: params.testId
    });

    return res.status(200).json({ data: grades });
}

async function findByStudentId({ params }, res) {
    const grades = await generalQuery.selectByProperty({
        table: "Grade",
        fields: [
            "value",
            "hex(Test_id) as testId",
        ],
        property: "Student_id",
        value: params.studentId
    });

    return res.status(200).json({ data: grades });
}

async function update({ body }, res) {
    const succeed = await gradeQuery.updateById(body);

    return res.status(200).json({ succeed });
}

async function deleteByIds({ body }, res) {
    const succeed = await gradeQuery.deleteByIds(body);

    return res.status(200).json({ succeed });
}

module.exports = {
    register,
    findByStudentId,
    findByTestId,
    update,
    deleteByIds
}
