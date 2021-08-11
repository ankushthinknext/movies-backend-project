const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const upload = require("../utils/multerFileUpload");
const {
	createMovie,
	getAllMovies,
	deleteMovie,
	getMovie,
} = require("../controllers/movies");

router.get("/", getAllMovies);
router.delete("/:id", deleteMovie);
router.get("/:id", getMovie);
router.post("/", upload.array("image"), createMovie);

module.exports = router;
