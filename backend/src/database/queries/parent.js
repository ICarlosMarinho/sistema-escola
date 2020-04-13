const getConnection = require("../config/connection");

async function insert({ cpf, fullName, telNumber, email, passwordHash }, studentIds) {
    var connection;

    try {
        connection = await getConnection();

        await connection.query("SET autocommit = 0");
        await connection.query("START TRANSACTION");

        await connection.execute(
            "INSERT INTO Parent (cpf, full_name, tel_number, email, password_hash) VALUES (?, ?, ?, ?, ?)",
            [cpf, fullName, telNumber, email, passwordHash]
        );

        for (const studentId of studentIds) {
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

async function updateById({ id, cpf, fullName, telNumber, email, passwordHash }) {
    var connection;

    try {
        connection = await getConnection();
        const [ [ currentParent ] ] = await connection.execute(
            "SELECT cpf, email FROM Parent WHERE _id = unhex(?)",
            [id]
        );

        await connection.query("SET autocommit = 0");
        await connection.query("START TRANSACTION");

        if (currentParent.cpf !== cpf)
            await connection.execute("UPDATE Parent SET cpf = ? WHERE _id = unhex(?)", [cpf, id]);
        
        if (currentParent.email !== email)
            await connection.execute("UPDATE Parent SET email = ? WHERE _id = unhex(?)", [email, id]);

        await connection.execute(
            "UPDATE Parent SET full_name = ?, tel_number = ?, password_hash WHERE _id = unhex(?)",
            [fullName, telNumber, passwordHash, id]
        );
        
        await connection.query("COMMIT");

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
            "SELECT hex(Student_id) as Student_id FROM Student_has_Parent WHERE Parent_id = unhex(?)",
            [id]
        );

        connection.query("SET autocommit = 0");
        connection.query("START TRANSACTION");

        for (const { Student_id } of studentIds) {
            const [ [ parentCount ] ] = await connection.execute(
                "SELECT COUNT(Parent_id) AS value FROM Student_has_Parent WHERE Student_id = unhex(?)",
                [Student_id]
            );

            if (parentCount.value < 2)
                await connection.execute("DELETE FROM Student WHERE _id = unhex(?)", [Student_id]);
        }

        await connection.execute("DELETE FROM Parent WHERE _id = unhex(?)", [id]);
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
    updateById,
    deleteById
}