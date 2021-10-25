var express = require("express");
var router = express.Router();
const {
    add_reaccion_dibujo,
    get,
    get_reacciones_x_img
} = require("../controllers/Reaccion_dibujo.controller");
/* GET home page. */
router.post("/add", add_reaccion_dibujo);
router.post("/get", get);
router.post("/get_reacciones", get_reacciones_x_img);

module.exports = router;