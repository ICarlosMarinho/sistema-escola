const gradeQuery = require("../database/queries/grade");
const generalQuery = require("../database/queries/general");

async function register({ body }, res) {
    const registered = await gradeQuery(body);

    return res.status(200).json({ registered });
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

    return res.status(200).json(grades);
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

    return res.status(200).json(grades);
}

async function update({ body }, res) {
    const updated = await gradeQuery.updateById(body);

    res.status(200).json({ updated });
}

async function deleteByIds({ body }, res) {
    const updated = await gradeQuery.deleteByIds(body);

    res.status(200).json({ updated });
}

module.exports = {
    register,
    findByStudentId,
    findByTestId,
    update,
    deleteByIds
}
