const router = require("express").Router();
const { attemptLogin } = require("../controllers/auth");

router.post("/", attemptLogin);

module.exports = router;
