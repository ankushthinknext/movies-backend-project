const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res, next) => {
	console.log(req.body);

	try {
		let salt = await bcrypt.genSalt(10);
		let hash = await bcrypt.hash(req.body.password, salt);
		req.body.password = hash;
		let user = await User.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			role: req.body.role,
		});
		if (!user) res.status(400).send("Something went wrong..");

		//create json web token
		let token = user.genAuthToken();
		res.status(201).send({ success: true, token });
	} catch (error) {
		console.log(error);
		res.status(400).send("Something went wrong..");
	}
};

exports.getUsers = async (req, res, next) => {
	try {
		let users = await User.find().select("_id name email role");
		if (!users) res.status(404).send("NO users found...");
		res.status(200).send(users);
	} catch (error) {
		console.log(error);
		res.status(404).send("NO users found...");
	}
};
