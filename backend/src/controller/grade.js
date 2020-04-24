const gradeQuery = require("../database/queries/grade");
const generalQuery = require("../database/queries/general");

async function register({ body }, res) {
    const succeed = await gradeQuery.insert(body);

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

async function update({ params, body }, res) {
    const succeed = await gradeQuery.update(params, body.value);

    return res.status(200).json({ succeed });
}

async function deleteByIds({ params }, res) {
    const succeed = await gradeQuery.deleteByIds(params);

    return res.status(200).json({ succeed });
}

module.exports = {
    register,
    findByStudentId,
    findByTestId,
    update,
    deleteByIds
}
