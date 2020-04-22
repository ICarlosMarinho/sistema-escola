const mysql = require("mysql2/promise");

module.exports = async () => {
	try {
		const connection = await mysql.createConnection({
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASS,
			database: process.env.DB_SCHEMA,
		});

		return connection;
	} catch (error) {
		console.log(error.message);
	}
};
