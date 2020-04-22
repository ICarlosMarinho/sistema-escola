const getConnection = require("../config/connection");

async function insert({ date, name, minGrade, maxGrade, subjectId }) {
    var connection;

    try {
        connection = await getConnection();

        await connection.execute(
            "INSERT INTO Test (date, name, min_grade, max_grade, Subject_id) VALUES (?, ?, ?, ?, unhex(?))",
            [date, name, minGrade, maxGrade, subjectId]
        );

        return true;
    } catch (error) {
        console.log(error.message);

        return false;
    } finally {
        await connection.end();
    }
}

async function updateById(id, { date, name, minGrade, maxGrade, subjectId }) {
    var connection;

    try {
        connection = await getConnection();

        await connection.execute(
            "UPDATE Test SET date = ?, name = ?, min_grade = ?, max_grade = ?, Subject_id = unhex(?) WHERE _id = unhex(?)",
            [date, name, minGrade, maxGrade, subjectId, id]
        );

        return true;

    } catch (error) {
        console.log(error.message);
        
        return false;
    } finally {
        await connection.end();
    }
}

module.exports = {
    insert,
    updateById
}
