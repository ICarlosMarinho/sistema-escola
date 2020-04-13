const getConnection = require("./connection");

async function insert(grades) {
    var connection;

    try {
        connection = await getConnection();

        await connection.query("SET autocommit = 0");
        await connection.query("START TRANSACTION");

        for (const { value, testId, studentId } of grades) {
            await connection.execute(
                "INSERT INTO Grade (value, Test_id, Student_id) VALUES (?, unhex(?), unhex(?))",
                [value,testId, studentId]
            );
        }

        await connection.query("COMMIT");

        return true;
    } catch (error) {
        console.log(error.message);

        return false;
    } finally {
        await connection.end();
    }
}

async function updateById(grades) {
    var connection;

    try {
        connection = await getConnection();

        await connection.query("SET autocommit = 0");
        await connection.query("START TRANSACTION");

        for (const { value, testId, studentId } of grades) {
            await connection.execute(
                "UPDATE Grade SET value = ? WHERE Test_id = unhex(?) AND Student_id = unhex(?)",
                [value, testId, studentId]
            );   
        }

        await connection.query("COMMIT");

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