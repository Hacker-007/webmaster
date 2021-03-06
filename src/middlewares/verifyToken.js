const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
	const token = req.header("Authorization").split(" ")[1];
	if (!token) {
		return res.status(403).send("Acess Denied.");
	}

	try {
		const verified = jwt.verify(
			token,
			process.env.TOKEN_SECRET ||
				"^&%kjhs*&KJha%@WElkj(a97JQJ!KjaMNakjsd5634Bjasd14asD"
		);
		
		req.body['token'] = verified;
		next();
	} catch (err) {
		res.status(403).send("Access Denied.");
	}
}
