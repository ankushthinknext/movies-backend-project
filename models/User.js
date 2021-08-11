const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		maxlength: 50,
		minlength: 5,
	},
	email: {
		type: String,
		required: true,
		maxlength: 30,
		unique: true,
	},
	password: {
		type: String,
		maxlength: 255,
	},
	role: {
		type: String,
		enum: ["Admin", "Cashier", "User"],
	},
});

userSchema.methods.genAuthToken = function () {
	let token = jwt.sign(
		{ name: this.name, email: this.email, role: this.role },
		process.env.JWT_SECRET_KEY,
	);
	return token;
};

module.exports = new mongoose.model("User", userSchema);
