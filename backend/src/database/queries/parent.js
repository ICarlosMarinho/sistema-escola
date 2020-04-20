const getConnection = require("../config/connection");

async function insert({ cpf, fullName, telNumber, email, passwordHash, studentsIds }) {
    var connection;

    try {
        connection = await getConnection();

        await connection.query("SET autocommit = 0");
        await connection.query("START TRANSACTION");

        await connection.execute(
            "CALL insert_parent(?, ?, ?, ?, ?)",
            [cpf, fullName, telNumber, email, passwordHash]
        );

        for (const studentId of studentsIds) {
            await connection.execute(
                "INSERT INTO Student_has_Parent VALUES (unhex(?), @parent_id)",
                [studentId]
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

async function index() {
    var connection;

    try {
        connection = await getConnection();
        const [ [ parents ] ] = await connection.query("CALL index_parents()");

        return parents;
    } catch (error) {
        console.log(error.message);

        return null;
    } finally {
        connection.end();
    }
} 

async function selectById(id) {
    var connection;

    try {
        connection = await getConnection();
        const [ [ parent ] ] = await connection.query("CALL select_parent_by_id(?)", id);

        return parent;
    } catch (error) {
        console.log(error.message);

        return null;
    } finally {
        connection.end();
    }
}

async function selectByStudentId(id) {
    var connection;

    try {
        connection = await getConnection();
        const [ [ parents ] ] = await connection.execute(
            "CALL select_parent_by_student_id(?)",
            [id]
        );

        return parents;
    } catch (error) {
        console.log(error.message);

        return null;
    } finally {
        await connection.end();
    }
}

async function updateById(id, { cpf, email, fullName, telNumber }) {
    var connection;

    try {
        connection = await getConnection();

        await connection.execute(
            "CALL update_parent(?, ?, ?, ?, ?)",
            [id, cpf, email, fullName, telNumber]
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
        const [ studentIds ] = await connection.execute(
            "SELECT Student_id as StudentId FROM Student_has_Parent WHERE Parent_id = unhex(?)",
            [id]
        );

        connection.query("SET autocommit = 0");
        connection.query("START TRANSACTION");

        for (const { studentId } of studentIds) {
            const [ [ parentCount ] ] = await connection.execute(
                "SELECT COUNT(Parent_id) AS value FROM Student_has_Parent WHERE Student_id = ?",
                [studentId]
            );

            if (parentCount.value < 2)
                await connection.execute("DELETE FROM Student WHERE _id = ?", [studentId]);
        }

        await connection.execute("DELETE FROM Parent WHERE User_id = unhex(?)", [id]);
        await connection.execute("DELETE FROM User WHERE _id = unhex(?)", [id]);
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
    index,
    selectById,
    selectByStudentId,
    updateById,
    deleteById
}