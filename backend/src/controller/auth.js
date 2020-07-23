const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const generalQuery = require("../database/queries/general");

async function authenticate({ headers }, res) {
    
    const encodedCredentials = headers.authorization.split(" ")[1];
    const buff = Buffer.from(encodedCredentials, "base64");
    const [ cpf, password ] = buff.toString("utf-8").split(":");

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

    if (!user) {
        return res.status(200).json({ 
            error: "Usuário não encontrado.", 
            token: null
        });
    }

    if (!user.passwordHash) {
        return res.status(200).json({
            error: "Senha incorreta.",
            token: null
        });
    }

    if (!(await bcrypt.compare(password, user.passwordHash))) {
        return res.status(200).json({
            error: "Senha incorreta.",
            token: null
        });
    }

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
                return res.status(200).json({
                    error: "Erro ao gerar token, tente novamente.",
                    token: null
                });
            }

            return res.status(200).json({
                error: null, 
                token, 
                id: user.id, 
                type: user.type
            }); 
        }
    );
}

module.exports = {
    authenticate
};

