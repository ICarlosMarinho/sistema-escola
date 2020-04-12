const getConnection = require("./connection");

async function insert({ name, minsPerLesson, year, classId, teacherId }) {
    var connection;

    try {
        connection = await getConnection();

        await connection.execute(
            "INSERT INTO Subject (name, mins_per_lesson, year, Class_id,Teacher_id) VALUES (?, ?, ?, unhex(?), unhex(?))",
            [name, minsPerLesson, year, classId, teacherId]
        );

        return true;
    } catch (error) {
        console.log(error.message);

        return false;
    } finally {
        await connection.end();
    }
}

async function updateById({ id, name, minsPerLesson, year, classId, teacherId }) {
    var connection;

    try {
        connection = await getConnection();
        
        await connection.execute(
            "UPDATE Subject SET `name` = ?, mins_per_lesson = ?, year = ?, Class_id = unhex(?), Teacher_id = unhex(?) WHERE _id = unhex(?)",
            [name, minsPerLesson, year, classId, teacherId, id]
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