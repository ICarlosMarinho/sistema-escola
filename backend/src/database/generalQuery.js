const getConnection = require("./connection");

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

selectAll({
    table: "Student",
    orderBy: "_id"
}).then(data => {
    console.log(data)
});


// deleteById({
//     table: "Student",
//     id: "f8deb755bc9b24e60e8e00c184a4a473"
// }).then(success => console.log(success));