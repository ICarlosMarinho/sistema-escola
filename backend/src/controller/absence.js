const absenceQuery = require("../database/queries/absence");
const generalQuery = require("../database/queries/general");

async function register({ body }, res) {
    const succeed = await absenceQuery.insert(body);

    return res.status(200).json({ succeed });
}

async function find({ params }, res) {
    const absences = await absenceQuery.find(params);

    return res.status(200).json({ data: absences });
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
    find,
    update,
    deletebyId
}