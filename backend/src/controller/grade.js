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
    const [ student ] = await generalQuery.selectByProperty({
        table: "Student",
        fields: ["hex(Class_id) as classId"],
        property: "_id",
        value: params.studentId
    });

    if (!student) return res.status(200).json(null);

    const subjects = await generalQuery.selectByProperty({
        table: "Subject",
        fields: [
            "hex(_id) as id",
            "code",
            "name",
        ],
        property: "Class_id",
        value: student.classId
    });

    await Promise.all(subjects.map(subject => {
        const promise = gradeQuery.selectByStudentAndSubjectId(params.studentId, subject.id)
        .then(grades => subject.grades = grades);

        return promise;
    }));

    const data = subjects.filter(({ grades }) => {
        return grades.length;
    });

    return res.status(200).json(data);
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
