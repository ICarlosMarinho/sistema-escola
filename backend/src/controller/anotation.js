const anotationQuery = require("../database/queries/anotation");
const generalQuery = require("../database/queries/general");
const { selectByClassId } = require("../database/queries/employee");

async function register({ body }, res) {
    const succeed = await anotationQuery.insert(body);

    res.status(200).json({ succeed });
}

async function findByStudentAndClassId({ params }, res) {
    const { studentId, classId } = params;
    const teachers = await selectByClassId(classId);

    await Promise.all(teachers.map(teacher => {
        const promise = anotationQuery.selectByStudentAndTeacherId(studentId, teacher.id)
        .then(notes => {
            if (notes.length) teacher.anotations = notes;
        });

        return promise;
    }));

    return res.status(200).json(teachers);
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
    findByStudentAndClassId,
    update,
    deleteById
}