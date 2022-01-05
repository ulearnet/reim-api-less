var express = require("express");
var router = express.Router();
const { login, loginAntiguo} = require("../controllers/login.controller");
/* GET home page. */
router.post("/login", loginAntiguo);
router.post("/login/:reim_id", login);

module.exports = router;
