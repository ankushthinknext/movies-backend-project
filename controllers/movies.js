const Movie = require("../models/Movie");
const cloudinary = require("../utils/cloudinary");

// to create a new movie
exports.createMovie = async (req, res, next) => {
	try {
		let movie = await Movie.create(req.body);
		if (!movie) res.status(400).send("Something went wrong");
		let pictureFiles = req.files;
		//Check if files exist
		if (!pictureFiles)
			return res.status(400).json({ message: "No picture attached!" });
		//map through images and create a promise array using cloudinary upload function
		let multiplePicturePromise = pictureFiles.map((picture) =>
			cloudinary.uploader.upload(picture.path),
		);
		// await all the cloudinary upload functions in promise.all, exactly where the magic happens
		let imageResponses = await Promise.all(multiplePicturePromise);
		imageResponses.forEach((file) => {
			movie.image.push(file.secure_url);
		});
		movie.save();
		res.status(200).send({ success: true, movie });
	} catch (err) {
		res.status(500).json({
			message: err.message,
		});
	}
};

// to get a single movie
exports.getMovie = async (req, res, next) => {
	let selectedId = req.params.id;
	try {
		let movie = await Movie.find({ _id: selectedId });
		if (!movie) res.status(404).send("Movie not found...");
		res.status(200).send(movie);
	} catch (error) {
		res.status(404).send("Movie not found...");
	}
};
// to list all movies
exports.getAllMovies = async (req, res, next) => {
	try {
		let result = await Movie.find();
		if (!result) res.status(404).send("No records found");
		res.status(200).send(result);
	} catch (error) {
		console.log(error);
	}
};

//to delete a movie
exports.deleteMovie = async (req, res, next) => {
	let selectedId = req.params.id;
	console.log(selectedId);
	try {
		let result = await Movie.findByIdAndRemove(selectedId);
		if (!result) return res.status(400).send("Bad request");

		res.status(200).send("Movie deleted successfully");
	} catch (error) {
		console.log(error);
		res.status(400).send("Something went wrong");
	}
};
