const getConnection = require("../config/connection");

async function insert({ name, minsPerLesson, year, classId, teacherId }) {
    var connection;

    try {
        connection = await getConnection();

        await connection.execute(
            "INSERT INTO Subject (name, mins_per_lesson, year, Class_id, Employee_id) VALUES (?, ?, ?, unhex(?), unhex(?))",
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

async function selectByTeacherId(id) {
    var connection;

    try {
        connection = await getConnection();
        const [ [ subjects ] ] = await connection.execute(
            "CALL select_subject_by_teacher_id(?)",
            [id]
        );

        return subjects;
    } catch (error) {
        console.log(error.message);

        return null;
    } finally {
        await connection.end();
    }
} 

async function updateById(id, { name, minsPerLesson, year, classId, teacherId }) {
    var connection;

    try {
        connection = await getConnection();
        
        await connection.execute(
            "UPDATE Subject SET `name` = ?, mins_per_lesson = ?, year = ?, Class_id = unhex(?), Employee_id = unhex(?) WHERE _id = unhex(?)",
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

async function deleteById(id) {
    var connection;

    try {
        connection = await getConnection();

        await connection.execute(
            "DELETE FROM Subject WHERE _id = unhex(?)",
            [id]
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
    selectByTeacherId,
    updateById,
    deleteById
}

