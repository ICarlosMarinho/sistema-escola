const getConnection = require("../config/connection");

async function insert(anotations) {
    var connection;

    try {
        connection = await getConnection();

        await connection.query("SET autocommit = 0");
        await connection.query("START TRANSACTION");

        for (const { date, text, studentId, teacherId } of anotations) {
            await connection.execute(
                "INSERT INTO Anotation (date, text, Student_id, Teacher_id) VALUES (?, ?, unhex(?), unhex(?))",
                [date, text, studentId, teacherId]
            );
        }

        await connection.query("COMMIT");

        return true;
    } catch (error) {
        console.log(error.message);

        return false;
    } finally {
        connection.end();
    }
}

async function updateById(anotations) {
    var connection;

    try {
        connection = await getConnection();

        await connection.query("SET autocommit = 0");
        await connection.query("START TRANSACTION");

        for (const { id , date, text } of anotations) {
            await connection.execute(
                "UPDATE Anotation SET date = ?, text = ? WHERE _id = unhex(?)",
                [date, text, id]
            );
        }

        await connection.query("COMMIT");

        return true;
    } catch (error) {
        console.log(error.message);

        return false;
    } finally {
        connection.end();
    }
}

module.exports = {
    insert,
    updateById
}