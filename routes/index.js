var express = require("express");
var router = express.Router();
const { login } = require("../controllers/login.controller");
/* GET home page. */
router.post("/login", login);

module.exports = router;
