var express = require("express");
var router = express.Router();
const {
    getNombre
} = require("../controllers/usuario.controller");
/* GET home page. */
router.post("/getNames", getNombre);

module.exports = router;