const jwt = require("jsonwebtoken");

function admin(req, res, next) {
	try {
		let token = req.header("x-auth-token");
		let decodedInfo = jwt.verify(token, "secretkey");
		if (!decodedInfo) return res.status(401).send("Acess denied");
		if (decodedInfo.role !== "Admin")
			return res.status(403).send("Forbidden you are not logged in as admin");
		next();
	} catch (error) {
		console.log(error);
		res.status(401).send("Invalid token provided");
	}
}

module.exports = admin;
