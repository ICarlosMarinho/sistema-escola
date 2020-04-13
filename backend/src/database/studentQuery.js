const getConnection = require("./connection");

async function insert(student, parents) {
    var connection;

    try {
        connection = await getConnection();
        const [ subjects ] = await connection.execute(
            "SELECT hex(_id) as _id FROM Subject WHERE Class_id = unhex(?)",
            [student.classId]
        );

        await connection.query("SET autocommit = 0");
        await connection.query("START TRANSACTION");

        await connection.execute(
            "INSERT INTO Student (cpf, b_certificate, image, full_name, age, address, desabilities, Class_id) VALUES (?, ?, ?, ?, ?, ?, ?, unhex(?))",
            [student.cpf, student.bCertificate, student.image, student.fullName, student. age, student.address, student.desabilities, student.classId]
        );

        for (const parent of parents) {
            await connection.execute(
                "INSERT INTO Parent (cpf, full_name, tel_number, email, password_hash) VALUES (?, ?, ?, ?, ?)",
                [parent.cpf, parent.fullName, parent.telNumber, parent.email, parent.passwordHash]
            ); 
            
            await connection.execute(
                "INSERT INTO Student_has_Parent VALUES (@student_id, @parent_id)"
            );
        }
        
        for (const subject of subjects) {
            await connection.execute(
                "INSERT INTO Absence (Student_id, Subject_id) VALUES (@student_id, unhex(?))",
                [subject._id]
            );
        }
        await connection.query("COMMIT");

        return true;
    } catch (error) {
        console.log(error.message);

        return false;
    } finally {
        await connection.end();
    }
}

async function updateById({ id, cpf, bCertificate, image, fullName, age, address, desabilities, classId }) {
    var connection;

    try {
        connection = await getConnection();
        const [ [ currentStudent ] ] = await connection.execute(
            "SELECT cpf, b_certificate, hex(Class_id) FROM Student WHERE _id = unhex(?)",
            [id]
        );

        const [ subjects ] = await connection.execute(
            "SELECT hex(_id) as _id FROM Subject WHERE Class_id = unhex(?)",
            [classId]
        );

        await connection.query("SET autocommit = 0");
        await connection.query("START TRANSACTION");
        
        if (cpf !== currentStudent.cpf)
            await connection.execute("UPDATE Student SET cpf = ? WHERE _id = unhex(?)", [cpf, id]);
        
        if(bCertificate !== currentStudent.b_certificate )
            await connection.execute("UPDATE Student SET b_certificate = ? WHERE _id = unhex(?)", [bCertificate, id]);

        await connection.execute(
            "UPDATE Student SET image = ?, full_name = ?, age = ?, address = ?, desabilities = ?, Class_id = unhex(?) WHERE _id = unhex(?)",
            [image, fullName, age, address, desabilities, classId, id]
        );

        if(currentStudent.Class_id !== classId) {

            for (const subject of subjects) {
                await connection.execute(
                    "INSERT INTO Absence (Student_id, Subject_id) VALUES (unhex(?), unhex(?))",
                    [id, subject._id]
                );   
            }
        }

        await connection.query("COMMIT");

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
    updateById
}
