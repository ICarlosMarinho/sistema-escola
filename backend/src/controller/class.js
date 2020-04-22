const classQuery = require("../database/queries/class");
const generalQuery = require("../database/queries/general");

async function register({ body }, res) {
    const registered = await classQuery.insert(body);

    res.status(200).json({ registered });
}

async function index(_, res) {
    const classes = await generalQuery.index({
        table: "Class",
        fields: [
            "hex(_id) as id",
            "code",
            "name",
            "period",
            "start_at as startAt",
            "end_at as endAt"
        ]
    });

    await Promise.all(classes.map(element => {
        const promise = generalQuery.selectByProperty({
            table: "Subject",
            fields: [
                "hex(_id) as id",
                "code",
                "name",
                "mins_per_lesson as minsPerLesson",
                "year",
                "hex(Employee_id) as teacherId"
            ],
            property: "Class_id",
            value: element.id
        }).then(subjects => element.subjects = subjects);
        
        return promise;
    }));

    return res.status(200).json(classes);
}

async function selectById({ params }, res) {
    const [ data ] = await generalQuery.selectByProperty({
        table: "Class",
        fields: [
            "code",
            "name",
            "period",
            "start_at as startAt",
            "end_at as endAt"
        ],
        property: "_id",
        value: params.id
    });

    if(!data)
        return res.status(200).json(null);
        
    data.subjects = await generalQuery.selectByProperty({
        table: "Subject",
        fields: [
            "hex(_id) as id",
            "code",
            "name",
            "mins_per_lesson as minsPerLesson",
            "year",
            "hex(Class_id) as classId",
            "hex(Employee_id) as teacherId"
        ],
        property: "Class_id",
        value: params.id
    });

    return res.status(200).json(data);
}

async function update({ params, body }, res) {
    const { name, period, startAt, endAt } = body;
    const updated = await classQuery.updateById(
        params.id,
    {
        name,
        period,
        startAt, 
        endAt
    });

    res.status(200).json({ updated });
}

async function deleteById({ params }, res) {
    const deleted = await generalQuery.deleteById({
        table: "Class",
        id: params.id
    });

    res.status(200).json({ deleted });
}

module.exports = {
    register,
    index,
    selectById,
    update,
    deleteById  
}