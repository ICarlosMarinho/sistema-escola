const getConnection = require("../config/connection");

async function updateById(absenses) {
    var connection;

    try {
        connection = await getConnection();

        await connection.query("SET autocommit = 0");
        await connection.query("START TRANSACTION");

        for (const { count, studentId, subjectId } of absenses) {
            await connection.execute(
                "UPDATE Absence SET count = ? WHERE Student_id = unhex(?) AND Subject_id = unhex(?)",
                [count, studentId, subjectId]
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
    updateById
}