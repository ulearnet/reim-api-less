var express = require("express");
var router = express.Router();
const {
    getNombre,
    getNickname
} = require("../controllers/usuario.controller");
/* GET home page. */
router.post("/getNames", getNombre);
router.post("/getNickname", getNickname);

module.exports = router;