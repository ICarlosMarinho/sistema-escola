const employeeQuery = require("../database/queries/employee");
const generalQuery = require("../database/queries/general");
const { selectByTeacherId } = require("../database/queries/subject");
const bcrypt = require("bcrypt");
const saltRounds = parseInt(process.env.SALT_ROUNDS);

/**
 * Todos os argumentos recebidos do cliente serão validados através
 * de um Middleware, utilizando a biblioteca hapi/joi provavelmente.
 */

async function register({ body }, res) {
	const { cpf, image, fullName, telNumber, email, password, type } = body;
	const passwordHash = password? 
		await bcrypt.hash(password, saltRounds)
		: password;

	const succeed = await employeeQuery.insert({
		cpf,
		image,
		fullName,
		telNumber,
		email,
		passwordHash,
		type,
	});

	return res.status(200).json({ succeed });
}

async function index(_, res) {
	const employees = await employeeQuery.index();

	await Promise.all(employees.map((employee) => {

		if (employee.type === "Professor") {
			const promise = selectByTeacherId(employee.id)
			.then(subjects => employee.subjects = subjects);

			return promise;
		}
	}));

	return res.status(200).json({ data: employees });
}

/**
 * TODO: Limitar a quantidade de acesso (Através de um middleware? Closure?)
 * a este recurso para evitar ataques do tipo força bruta
 * (Talvez limitar acesso a todos os recursos).
 */
async function findById({ params }, res) {
	const [ employee ] = await employeeQuery.selectByUserId(params.id);

	if (!employee)
		return res.status(200).json({ data: null });

	if (employee.type === "Professor")
		employee.subjects = await selectByTeacherId(employee.id);

	return res.status(200).json({ data: employee });
}

async function update({ params, body }, res) {
	const { id } = params;
	const subjects = await selectByTeacherId(id);

	if (subjects.length > 0 && type === "Gestor")
		return res.status(200).json({ succeed: false });

	const succeed = await employeeQuery.updateById(id, body);

	return res.status(200).json({ succeed });
}

async function deleteById({ params }, res) {
	const succeed = await generalQuery.deleteById({
		table: "User",
		id: params.id,
	});

	return res.status(200).json({ succeed });
}

module.exports = {
	register,
	index,
	findById,
	update,
	deleteById,
};