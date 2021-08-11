const jwt = require("jsonwebtoken");

function auth(req, res, next) {
	try {
		let token = req.header("x-auth-token");
		let decodedInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);
		if (!decodedInfo) return res.status(401).send("Acess denied");
		next();
	} catch (error) {
		console.log(error);
		res.status(401).send("Invalid token provided");
	}
}

module.exports = auth;
