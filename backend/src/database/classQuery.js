const getConnection = require("./connection");

async function insert({ name, period, start_at, end_at }) {
	var connection;

	try {
		connection = await getConnection();
		selectByCode(2).then((data) => console.log(data));
		await connection.execute(
			"INSERT INTO Class (`name`, period, start_at, end_at) VALUES (?, ?, ?, ?)",
			[name, period, start_at, end_at]
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
			"SELECT hex(_id) AS id, code, name, period, start_at, end_at FROM Class ORDER BY code"
		);

		return rows;
	} catch (error) {
		console.log(error.message);

		return null;
	} finally {
		await connection.end();
	}
}

async function selectByCode(code) {
	var connection;

	try {
		connection = await getConnection();
		const [ row ] = await connection.execute(
			"SELECT hex(_id) AS id, code, name, period, start_at, end_at FROM Class WHERE code = ?",
			[code]
		);

		return row;
	} catch (error) {
		console.log(error.message);

		return null;
	} finally {
		await connection.end();
	}
}

async function updateByCode({ code, name, period, start_at, end_at }) {
	var connection;

	try {
		connection = await getConnection();

		await connection.execute(
			"UPDATE Class SET `name` = ?, period = ?, start_at = ?, end_at = ? WHERE code = ?",
			[name, period, start_at, end_at, code]
		);

		return await selectByCode(code);
	} catch (error) {
		console.log(error.message);

		return null;
	} finally {
		connection.end();
	}
}

async function deleteByCode(code) {
	var connection;

	try {
		connection = await getConnection();
		await connection.execute("DELETE FROM Class WHERE code = ?", [code]);

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
	selectByCode,
	updateByCode,
	deleteByCode,
};
