const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		maxlength: 50,
		minlength: 3,
	},
	genre: {
		type: String,
		required: true,
		maxlength: 30,
		minlength: 5,
	},
	rating: {
		type: Number,
		default: 5,
		max: 5,
		min: 1,
	},
	image: {
		type: [String],
		maxlength: 100,
	},
	price: {
		type: Number,
		required: true,
		max: 500,
		min: 50,
	},
});

module.exports = new mongoose.model("Movie", movieSchema);
