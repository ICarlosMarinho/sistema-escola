const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const generalQuery = require("../database/queries/general");

async function authenticate({ body }, res) {
    const { cpf, password } = body;
    const [ user ] = await generalQuery.selectByProperty({
        table: "User",
        fields: [
            "hex(_id) as id",
            "cpf",
            "password_hash as passwordHash",
            "type"
        ],
        property: "cpf",
        value: cpf
    });

    if (!user) return res.status(200).json({ data: "User not found" });

    if (!user.passwordHash) 
        return res.status(200).json({ data: "Password not found" });

    if (!(await bcrypt.compare(password, user.passwordHash)))
        return res.status(200).json({ data: "Incorrect password" });

    jwt.sign(
        { id: user.id },
        process.env.SECRET,
        { 
            issuer: user.type,
            expiresIn: "12h"
        },
        (err, token) => {

            if (err) {
                console.log(err.message);
                return res.status(200).json({ data: "Error on token generation" });
            }

            return res.status(200).json({ data: token }); 
        }
    );
}

module.exports = {
    authenticate
};

