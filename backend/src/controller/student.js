const studentQuery = require("../database/queries/student");
const generalQuery = require("../database/queries/general");
const { selectByStudentId } = require("../database/queries/parent");

async function register({ body }, res) {
	const succeed = await studentQuery.insert(body);

	return res.status(200).json({ succeed });
}

async function index(_, res) {
	const students = await generalQuery.index({
		table: "Student",
		fields: [
			"hex(_id) as id",
			"b_certificate as bCertificate",
			"image",
			"full_name as fullName",
			"birth_date as birthDate",
			"address",
			"desabilities",
			"hex(Class_id) as classId",
		],
	});

	await Promise.all(students.map((student) => {
		const promise = selectByStudentId(student.id)
		.then((parents) => student.parents = parents);

		return promise;
	}));

	return res.status(200).json({ data: students });
}

async function findById({ params }, res) {
	const [ student ] = await generalQuery.selectByProperty({
		table: "Student",
		fields: [
			"hex(_id) as id",
			"b_certificate as bCertificate",
			"image",
			"full_name as fullName",
			"birth_date as birthDate",
			"address",
			"desabilities",
			"hex(Class_id) as classId",
		],
		property: "_id",
		value: params.id,
	});

	if (!student) return res.status(200).json({ data: null });

	student.parents = await selectByStudentId(student.id);

	return res.status(200).json({ data: student });
}

async function update({ params, body }, res) {
	const { id } = params;
	const succeed = await studentQuery.updateById(id, body);

	return res.status(200).json({ succeed });
}

async function deleteById({ params }, res) {
	const { id } = params;
	const succeed = await studentQuery.deleteById(id);

	return res.status(200).json({ succeed });
}

module.exports = {
	register,
	index,
	findById,
	update,
	deleteById,
};
