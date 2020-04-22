const absenceQuery = require("../database/queries/absence");
const generalQuery = require("../database/queries/general");

async function register({ body }, res) {
    const registered = await absenceQuery.insert(body);

    return res.status(200).json({ registered });
}

async function find({ params }, res) {
    const absences = await absenceQuery.find(params);

    return res.status(200).json(absences);
}

async function update({ params, body }, res) {
    const updated = await absenceQuery.updateById(params.id, body);

    return res.status(200).json({ updated });
}

async function deletebyId({ params }) {
    const deleted = await generalQuery.deleteById({
        table: "Absence",
        id: params.id
    });

    res.status(200).json({ deleted });
}

module.exports = {
    register,
    find,
    update,
    deletebyId
}