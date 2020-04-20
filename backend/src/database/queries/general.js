const getConnection = require("../config/connection");

async function index({ table, fields }) {
	var connection;

	try {
        connection = await getConnection(); 
		const [ rows ] = await connection.execute(
            "SELECT " + fields.join() + " FROM " + connection.escapeId(table)
        );

		return rows;
	} catch (error) {
		console.log(error.message);

		return null;
	} finally {
		await connection.end();
	}
}

async function selectByProperty({ table, fields, property, value }) {
    var connection;

    try {
        connection = await getConnection();
        const [ rows ] = await connection.execute(
            "SELECT " + fields.join() + " FROM " + connection.escapeId(table) + " WHERE " +
            connection.escapeId(property) + (/_id$/.test(property)? " = unhex(?)" : " = ?"),
            [value]
        );

        return rows;
    } catch (error) {
        console.log(error.message);

        return null;
    } finally {
        await connection.end();
    }
}

async function deleteById({ table, id }) {
    var connection;

    try {
        connection = await getConnection();

        await connection.execute(
            "DELETE FROM " + connection.escapeId(table) + " WHERE _id = unhex(?)",
            [id]
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
    index,
    selectByProperty,
    deleteById
}