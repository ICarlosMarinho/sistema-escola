const getConnection = require("../config/connection");

async function insert({ cpf, image, fullName, telNumber, email, passwordHash, type }) {
    var connection;

    try {
        connection = await getConnection();

        await connection.execute(
            "CALL insert_employee(?, ?, ?, ?, ?, ?, ?)",
            [cpf, image, fullName, telNumber, email, passwordHash, type]
        );
        
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
        const [ [ rows ] ] = await connection.query("CALL index_employees");

        return rows;
    } catch (error) {
        console.log(error.message);

        return null;
    } finally {
        await connection.end();
    }
}

async function selectByUserId(userId) {
    var connection;

    try {
        connection = await getConnection();
        const [ [ rows ] ] = await connection.query(
            "CALL select_employee_by_id(?)",
            [userId]
        );

        return rows;
    } catch (error) {
        console.log(error.message);

        return null;
    } finally {
        await connection.end();
    }
}

async function selectByClassId(classId) {
    var connection;

    try {
        connection = await getConnection();
        const [ [ teachers ] ] = await connection.execute(
            "CALL select_teachers_by_class_id(?)",
            [classId]
        );

        return teachers;
    } catch (error) {
        console.log(error.message);

        return null;
    } finally {
        await connection.end();
    }
}

async function updateById(id, { cpf, email, image, fullName, telNumber, type }) {
    var connection;

    try {
        connection = await getConnection();

        await connection.execute(
            "CALL update_employee(?, ?, ?, ?, ?, ?, ?)",
            [id, cpf, email, image, fullName, telNumber, type]
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
    index,
    selectByUserId,
    selectByClassId,
    updateById
}