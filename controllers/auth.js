const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.attemptLogin = async (req, res, next) => {
	try {
		//if user exists or not
		let user = await User.findOne({ email: req.body.email });
		console.log(user);
		if (!user) return res.status(404).send("User not found..");
		//check if password matches or not

		let isValid = await bcrypt.compare(req.body.password, user.password);

		if (isValid) {
			let token = user.genAuthToken();
			res.send({ success: true, token });
		}
		res.status(404).send("incorrect password");
	} catch (error) {
		console.log(error);
		res.send("Something went wrong..");
	}
};
