const absenceQuery = require("../database/queries/absence");
const generalQuery = require("../database/queries/general");

async function register({ body }, res) {
    const succeed = await absenceQuery.insert(body);

    return res.status(200).json({ succeed });
}

async function find({ params }, res) {
    const absences = await absenceQuery.find(params);

    return res.status(200).json(absences);
}

async function findTotalByStudentId({ params }, res) {
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
        const promise = absenceQuery.findTotal(params.studentId, subject.id)
        .then(({ value }) => {
            subject.total = value? parseInt(value) : 0;
        });

        return promise;
    }));

    return res.status(200).json(subjects);
}

async function update({ params, body }, res) {
    const succeed = await absenceQuery.updateById(params.id, body);

    return res.status(200).json({ succeed });
}

async function deletebyId({ params }, res) {
    const succeed = await generalQuery.deleteById({
        table: "Absence",
        id: params.id
    });

    return res.status(200).json({ succeed });
}

module.exports = {
    register,
    findTotalByStudentId,
    find,
    update,
    deletebyId
}