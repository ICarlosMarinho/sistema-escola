const getConnection = require("../config/connection");

async function selectAll({ table, orderBy }) {
	var connection;

	try {
        connection = await getConnection(); 
		const [ rows ] = await connection.execute(
			"SELECT * FROM " + connection.escapeId(table) + " ORDER BY " +  connection.escapeId(orderBy)
        );

		return rows;
	} catch (error) {
		console.log(error.message);

		return null;
	} finally {
		await connection.end();
	}
}

async function selectById({ table, id }) {
    var connection;

    try {
        connection = await getConnection();
        const [ row ] = await connection.execute(
            "SELECT * FROM " + connection.escapeId(table) + " WHERE _id = unhex(?)",
            [id]
        );

        return row[0];
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
    selectAll,
    selectById,
    deleteById
}
