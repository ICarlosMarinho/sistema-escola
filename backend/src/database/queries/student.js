const getConnection = require("../config/connection");

async function insert(student) {
    var connection;
    const { 
        bCertificate,
        image,
        fullName,
        birthDate,
        address,
        desabilities,
        classId,
        parents 
    } = student;

    try {
        connection = await getConnection();
        await connection.query("SET autocommit = 0");
        await connection.query("START TRANSACTION");

        await connection.execute(
            "CALL insert_student(?, ?, ?, ?, ?, ?, ?)",
            [bCertificate, image, fullName, birthDate, address, desabilities, classId]
        );

        for (const parent of parents) {

            await connection.execute(
                "CALL insert_parent(?, ?, ?, ?, ?)",
                [parent.cpf, parent.fullName, parent.telNumber, parent.email, null]
            ); 
            
            await connection.execute(
                "INSERT INTO Student_has_Parent VALUES (@student_id, @parent_id)"
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

async function selectByParentId(id) {
    var connection;

    try {
        connection = await getConnection();
        const [ [ students ] ] = await connection.execute(
            "CALL select_student_by_parent_id(?)",
            [id]
        );

        return students;
    } catch (error) {
        console.log(error.message);

        return null;
    } finally {
        await connection.end();
    }
}

async function updateById(id, { bCertificate, image, fullName, birthDate, address, desabilities, classId }) {
    var connection;

    try {

        await connection.execute(
            "CALL update_student(?, ? , ?, ?, ?, ?, ?, ?)",
            [id, bCertificate, image, fullName, birthDate, address, desabilities, classId]
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
        const [ parentIds ] = await connection.execute(
            "SELECT Parent_id as parentId FROM Student_has_Parent WHERE Student_id = unhex(?)",
            [id]
        );

        connection.query("SET autocommit = 0");
        connection.query("START TRANSACTION");

        for (const { parentId } of parentIds) {
            const [ [ studentCount ] ] = await connection.execute(
                "SELECT COUNT(Student_id) AS value FROM Student_has_Parent WHERE Parent_id = ?",
                [parentId]
            );

            if (studentCount.value < 2)
                await connection.execute("DELETE FROM Parent WHERE _id = ?", [parentId]);
        }

        await connection.execute("DELETE FROM Student WHERE _id = unhex(?)", id);
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
    selectByParentId,
    updateById,
    deleteById
}
