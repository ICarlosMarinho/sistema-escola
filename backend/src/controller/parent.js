const parentQuery = require("../database/queries/parent");
const { selectByParentId } = require("../database/queries/student");
const bcrypt = require("bcrypt");
const saltRounds = parseInt(process.env.SALT_ROUNDS);

async function register({ body }, res) {
    const { cpf, fullName, telNumber, email, password, studentsIds } = body;
    
	const passwordHash = password
		? await bcrypt.hash(password, saltRounds)
        : password;
        
	const succeed = await parentQuery.insert({
		cpf,
		fullName,
		telNumber,
		email,
		passwordHash,
		studentsIds,
	});

	return res.status(200).json({ succeed });
}

async function index(_, res) {
	const parents = await parentQuery.index();

	await Promise.all(parents.map((parent) => {
			const promise = selectByParentId(parent.id)
			.then(students => parent.students = students);

			return promise;
		})
	);

	return res.status(200).json({ data: parents });
}

async function findById({ params }, res) {
	const [ parent ] = await parentQuery.selectById(params.id);

	if (!parent) return res.status(200).json({ data: null });

	parent.students = await selectByParentId(parent.id);

	return res.status(200).json({ data: parent });
}

async function update({ params, body }, res) {
	const { id } = params;
	const succeed = parentQuery.updateById(id, body);

	return res.status(200).json({ succeed });
}

async function deleteById({ params }, res) {
    const { id } = params;
	const succeed = await parentQuery.deleteById(id);

	return res.status(200).json({ succeed });
}

module.exports = {
	register,
	index,
	findById,
	update,
	deleteById,
};
