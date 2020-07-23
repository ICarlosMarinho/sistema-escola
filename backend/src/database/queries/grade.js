const getConnection = require("../config/connection");

async function insert(grades) {
    var connection;

    try {
        connection = await getConnection();

        await connection.query("SET autocommit = 0");
        await connection.query("START TRANSACTION");

        await Promise.all(grades.map(({ value, testId, studentId }) => {
            const promise = connection.execute(
                "INSERT INTO Grade (value, Test_id, Student_id) VALUES (?, unhex(?), unhex(?))",
                [value,testId, studentId]
            );

            return promise;
        }));

        await connection.query("COMMIT");

        return true;
    } catch (error) {
        console.log(error.message);

        return false;
    } finally {
        await connection.end();
    }
}

async function selectByStudentAndSubjectId(studentId, subjectId) {
    var connection;

    try {
        connection = await getConnection();
        const [ [ grades ] ] = await connection.execute(
            "CALL select_grades_by_student_and_subject_id(?, ?)",
            [studentId, subjectId]
        );

        return grades;
    } catch (error) {
        console.log(error);

        return null;
    } finally {
        await connection.end();
    }
}

async function update({ testId, studentId }, value) {
    var connection;

    try {
        connection = await getConnection();
    
        connection.execute(
            "UPDATE Grade SET value = ? WHERE Test_id = unhex(?) AND Student_id = unhex(?)",
            [value, testId, studentId]
        );   

        return true;
    } catch (error) {
        console.log(error.message);

        return false;
    } finally {
        await connection.end();
    }
}

async function deleteByIds({ testId, studentId }) {
    var connection;

    try {
        connection = await getConnection();

        await connection.execute(
            "DELETE FROM Grade WHERE Test_id = unhex(?) AND Student_id = unhex(?)",
            [testId, studentId]
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
    selectByStudentAndSubjectId, 
    update,
    deleteByIds
}