const getConnection = require("../config/connection");

async function insert(absences) {
    var connection;

    try {
        connection = await getConnection();

        await Promise.all(
            absences.map(({ count, date, studentId, subjectId }) => {
                const promise = connection.execute(
                    "CALL insert_absence(?, ?, ?, ?)",
                    [count, date, studentId, subjectId]
                );

                return promise;
            })
        );

        return true;
    } catch (error) {
        console.log(error.message);

        return false;
    } finally {
        await connection.end();
    }
}

async function find({ studentId, subjectId }) {
    var connection;

    try {
        connection = await getConnection();
        const [ absences ] = await connection.execute(
            "SELECT hex(_id) AS id, `date`, `count` FROM Absence " +
            "WHERE Student_id = unhex(?) AND Subject_id = unhex(?)",
            [studentId, subjectId]
        );

        return absences;
    } catch (error) {
        console.log(error.message);

        return null;
    } finally {
        await connection.end();
    }
}

async function findTotal(studentId, subjectId) {
    var connection;

    try {
        connection = await getConnection();
        const [ [ total ] ] = await connection.execute(
            "CALL select_total_absence(?, ?)",
            [studentId, subjectId]
        );

        return total[0];
    } catch (error) {
        console.log(error.message);

        return null;
    } finally {
        await connection.end();
    }
}

async function updateById(id, {date, count}) {
    var connection;

    try {
        connection = await getConnection();

        await connection.execute(
            "UPDATE Absence SET `date` = ?, `count` = ? WHERE _id = unhex(?)",
            [date, count, id]
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
    find,
    findTotal,
    updateById
}