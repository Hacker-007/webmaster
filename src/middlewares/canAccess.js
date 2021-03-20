const jwt = require("jsonwebtoken");

module.exports = (acceptedRoles) => {
	return function (req, res, next) {
		const token = req.header("Authorization").split(" ")[1];
		if (!token) {
			return res.status(403).send("Access Denied.");
		}

		const { roles } = jwt.decode(token, { complete: true, json: true }).payload;
		const authorized = acceptedRoles.some(role => roles.includes(role));
		if (!authorized) {
			return res.status(403).send("Access Denied.");
		}

		next();
	};
};
