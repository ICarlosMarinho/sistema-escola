const getConnection = require("../config/connection");

async function insert({ name, period, startAt, endAt }) {
	var connection;

	try {
		connection = await getConnection();
		
		await connection.execute(
			"INSERT INTO Class (`name`, period, start_at, end_at) VALUES (?, ?, ?, ?)",
			[name, period, startAt, endAt]
		);

		return true;
	} catch (error) {
		console.log(error.message);

		return false;
	} finally {
		await connection.end();
	}
}

async function updateById(id, { name, period, startAt, endAt }) {
	var connection;

	try {
		connection = await getConnection();

		await connection.execute(
			"UPDATE Class SET `name` = ?, period = ?, start_at = ?, end_at = ? WHERE _id = unhex(?)",
			[name, period, startAt, endAt, id]
		);

		return true;
	} catch (error) {
		console.log(error.message);

		return false;
	} finally {
		connection.end();
	}
}

async function deleteById(id) {
	var connection;

	try {
		connection = await getConnection();
		await connection.execute("DELETE FROM Class WHERE _id = unhex(?)", id);

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
};
