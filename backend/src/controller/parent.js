const parentQuery = require("../database/queries/parent");
const { selectByParentId } = require("../database/queries/student");
const bcrypt = require("bcrypt");
const saltRounds = parseInt(process.env.SALT_ROUNDS);

async function register({ body }, res) {
    const { cpf, fullName, telNumber, email, password, studentsIds } = body;
    
	const passwordHash = password
		? await bcrypt.hash(password, saltRounds)
        : password;
        
	const registered = await parentQuery.insert({
		cpf,
		fullName,
		telNumber,
		email,
		passwordHash,
		studentsIds,
	});

	return res.status(200).json({ registered });
}

async function index(_, res) {
	const parents = await parentQuery.index();

	await Promise.all(parents.map((parent) => {
			const promise = selectByParentId(parent.id)
			.then(students => parent.students = students);

			return promise;
		})
	);

	return res.status(200).json(parents);
}

async function findById({ params }, res) {
	const [ parent ] = await parentQuery.selectById(params.id);

	if (!parent) return res.status(200).json(null);

	parent.students = await selectByParentId(parent.id);

	return res.status(200).json(parent);
}

async function update({ params, body }, res) {
	const { id } = params;
	const updated = parentQuery.updateById(id, body);

	return res.status(200).json({ updated });
}

async function deleteById({ params }, res) {
    const { id } = params;
	const deleted = await parentQuery.deleteById(id);

	return res.status(200).json({ deleted });
}

module.exports = {
	register,
	index,
	findById,
	update,
	deleteById,
};
