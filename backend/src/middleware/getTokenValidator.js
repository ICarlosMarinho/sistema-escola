const jwt = require("jsonwebtoken");

module.exports = (issuersExpected) => {
	return ({ headers }, res, next) => {
		jwt.verify(
			headers.authorization,
			process.env.SECRET,
			(err, decoded) => {
				if (err) 
					return res.status(200).json({ data: err.message });

				for (const issuer of issuersExpected) {
					if (decoded.iss === issuer) 
						return next();
				}

				return res.status(200).json(
					{ data: "Issuer not allowed for this operation" }
				);
			}
		);
	};
};
