const getConnection = require("../config/connection");

async function insert({ count, date, studentId, subjectId }) {
    var connection;

    try {
        connection = await getConnection();

        await connection.execute(
            "CALL insert_subject(?, ?, ?, ?)",
            [count, date, studentId, subjectId]
        );

        return true;
    } catch (error) {
        console.log(error);

        return false;
    } finally {
        await connection.end();
    }
}



async function updateById({id, count}) {
    var connection;

    try {
        connection = await getConnection();

        await connection.execute(
            "UPDATE Absence SET count = ? WHERE _id = unhex(?)",
            [count, id ]
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
    updateById
}