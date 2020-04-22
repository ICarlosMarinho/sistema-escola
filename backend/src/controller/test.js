const testQuery = require("../database/queries/test");
const generalQuery = require("../database/queries/general");

async function register({ body }, res) {
    const registered = await testQuery.insert(body);

    return res.status(200).json({ registered });
} 

async function index(_, res) {
    const tests = await generalQuery.index({
        table: "Test",
        fields: [
            "hex(_id) as id",
            "date",
            "name",
            "min_grade as minGrade",
            "max_grade as maxGrade"
        ]
    });

    return res.status(200).json(tests);
}

async function update({ params, body }, res) {
    const updated = await testQuery.updateById(params.id, body);

    return res.status(200).json({ updated });
}

async function deleteById({ params }, res) {
    const deleted = await generalQuery.deleteById({
        table: "Test",
        id: params.id
    });

    return res.status(200).json({ deleted });
}

module.exports = {
    register,
    index,
    update,
    deleteById
}