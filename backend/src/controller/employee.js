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

	const registered = await employeeQuery.insert({
		cpf,
		image,
		fullName,
		telNumber,
		email,
		passwordHash,
		type,
	});

	return res.status(200).json({ registered });
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

	return res.status(200).json(employees);
}

/**
 * TODO: Limitar a quantidade de acesso (Através de um middleware? Closure?)
 * a este recurso para evitar ataques do tipo força bruta
 * (Talvez limitar acesso a todos os recursos).
 */
async function findById({ params }, res) {
	const [ employee ] = await employeeQuery.selectByUserId(params.id);

	if (!employee)
		return res.status(200).json(null);

	if (employee.type === "Professor")
		employee.subjects = await selectByTeacherId(employee.id);

	return res.status(200).json(employee);
}

async function update({ params, body }, res) {
	const { id } = params;
	const subjects = await selectByTeacherId(id);

	if (subjects.length > 0 && type === "Gestor")
		return res.status(200).json({ updated: false });

	const updated = await employeeQuery.updateById(id, body);

	return res.status(200).json({ updated });
}

async function deleteById({ params }, res) {
	const deleted = await generalQuery.deleteById({
		table: "User",
		id: params.id,
	});

	return res.status(200).json({ deleted });
}

module.exports = {
	register,
	index,
	findById,
	update,
	deleteById,
};
