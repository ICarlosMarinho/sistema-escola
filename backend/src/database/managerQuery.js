const getConnection = require("./connection");

async function insert({ cpf, image, full_name, tel_number, email, password_hash }) {
    var connection;

    try {
        connection = await getConnection();

        await connection.execute(
            "INSERT INTO Manager (cpf, image, full_name, tel_number, email, password_hash) VALUES (?, ?, ?, ?, ?, ?)",
            [cpf, image, full_name, tel_number, email, password_hash]
        );
        
        return true;
    } catch (error) {
        console.log(error.message);

        return false;
    } finally {
        await connection.end();
    }
}

async function selectAll() {
    var connection;

    try {
        connection = await getConnection();
        const [ rows ] = await connection.execute(
            "SELECT hex(_id) AS id, cpf, image, full_name, tel_number, email, password_hash, type FROM Manager ORDER BY full_name"
        );

        return rows;
    } catch (error) {
        console.log(error.message);

        return null;
    } finally {
        await connection.end();
    }
}

async function selectById(id) {
    var connection;

    try {
        connection = await getConnection();
        const [ row ] = await connection.execute(
            "SELECT hex(_id) AS id, cpf, image, full_name, tel_number, email, password_hash, type FROM Manager WHERE _id = unhex(?)",
            [id]
        );

        return row;
    } catch (error) {
        console.log(error.message);

        return null;
    } finally {
        await connection.end();
    }
}

async function updateById({ id, cpf, image, full_name, tel_number, email, password_hash }) {
    var connection;

    try {
        const currentManager = (await selectById(id)).pop();
        connection = await getConnection();

        await connection.query("SET autocommit = 0");
        await connection.query("START TRANSACTION");

        if (cpf !== currentManager.cpf) 
            await connection.execute("UPDATE Manager SET cpf = ? WHERE _id = unhex(?)", [cpf, id]);
        
        if (email !== currentManager.email) 
            await connection.execute("UPDATE Manager SET email = ? WHERE _id = unhex(?)", [email, id]);
        

        await connection.execute(
            "UPDATE Manager SET image = ?, full_name = ?, tel_number = ?, password_hash = ? WHERE _id = unhex(?)",
            [image, full_name, tel_number, password_hash, id]
        );

        await connection.query("COMMIT");

        return await selectById(id);
    } catch (error) {
        console.log(error.message);

        return null;
    } finally {
        await connection.end();
    }
}

async function deleteById(id) {
    var connection;

    try {
        connection = await getConnection();

        await connection.execute("DELETE FROM Manager WHERE _id = unhex(?)", [id]);

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
    selectAll,
    selectById,
    updateById,
    deleteById
}

