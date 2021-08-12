require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const moviesRoutes = require("./routes/movies");
const usersRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const auth = require("./middlewares/auth");
const admin = require("./middlewares/admin");

//mongodb conn
mongoose
	.connect(
		"mongodb+srv://helloankush:Mongo7827@cluster0.zt3fe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
	)
	.then(() => console.log("Connected successfully to mongo db!"))
	.catch((err) => console.log(err));
const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("./uploads"));

// app.options("*", cors());

app.use(express.json());
app.use("/api/movies", moviesRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);

app.listen(3333, () => console.log("Server running on port 3333"));
