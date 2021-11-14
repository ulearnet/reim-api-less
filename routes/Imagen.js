var express = require("express");
var router = express.Router();
const {
    get_imagen_reim,
} = require("../controllers/Imagen.controller");
/* GET home page. */
router.post("/get/:id", get_imagen_reim);

module.exports = router;