const getConnection = require("../config/connection");

async function insert({ cpf, image, full_name, tel_number, email, password_hash, type }) {
    var connection;

    try {
        connection = await getConnection();

        await connection.execute(
            "INSERT INTO Employee (cpf, image, full_name, tel_number, email, password_hash, type) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [cpf, image, full_name, tel_number, email, password_hash, type]
        );
        
        return true;
    } catch (error) {
        console.log(error.message);

        return false;
    } finally {
        await connection.end();
    }
}

async function updateById({ id, cpf, image, full_name, tel_number, email, password_hash, type }) {
    var connection;

    try {
        connection = await getConnection();
        const [ [ currentEmployee ] ] = await connection.execute(
            "SELECT cpf, email FROM Employee WHERE _id = unhex(?)",
            [id]
        );

        await connection.query("SET autocommit = 0");
        await connection.query("START TRANSACTION");

        if (cpf !== currentEmployee.cpf) 
            await connection.execute("UPDATE Employee SET cpf = ? WHERE _id = unhex(?)", [cpf, id]);
        
        if (email !== currentEmployee.email) 
            await connection.execute("UPDATE Employee SET email = ? WHERE _id = unhex(?)", [email, id]);
        

        await connection.execute(
            "UPDATE Employee SET image = ?, full_name = ?, tel_number = ?, password_hash = ?, type = ? WHERE _id = unhex(?)",
            [image, full_name, tel_number, password_hash, type, id]
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

module.exports = {
    insert,
    updateById,
}

