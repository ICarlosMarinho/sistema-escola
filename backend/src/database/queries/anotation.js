const getConnection = require("../config/connection");

async function insert(anotations) {
    var connection;

    try {
        connection = await getConnection();

        await connection.query("SET autocommit = 0");
        await connection.query("START TRANSACTION");

        
        await Promise.all(
            anotations.map(({ date, text, studentId, teacherId }) => {
                const promise = connection.execute(
                    "INSERT INTO Anotation (`date`, text, Student_id, Employee_id) " +
                    "VALUES (?, ?, unhex(?), unhex(?))",
                    [date, text, studentId, teacherId]
                );

                return promise;
            })
        );

        await connection.query("COMMIT");

        return true;
    } catch (error) {
        console.log(error.message);

        return false;
    } finally {
        connection.end();
    }
}

async function updateById(id, { date, text }) {

    var connection;

    try {
        connection = await getConnection();

        await connection.execute(
            "UPDATE Anotation SET `date` = ?, text = ? WHERE _id = unhex(?)",
            [date, text, id]
        );

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