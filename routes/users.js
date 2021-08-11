const router = require("express").Router();
const { createUser, getUsers } = require("../controllers/users");
const admin = require("../middlewares/admin");

router.post("/", createUser);
router.get("/", getUsers);

module.exports = router;
