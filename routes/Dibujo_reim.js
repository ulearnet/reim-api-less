var express = require("express");
var router = express.Router();

const {
    put_dibujo_reim,
    get_dibujo_reim,
    get_dibujo_reim_x_usuario,
    get_Misdibujo_reim,
    get_generaldibujo_reim,
    getAprobados,
    getLast
} = require("../controllers/Dibujo_reim.controller");


router.post("/add", put_dibujo_reim);
router.post("/get", get_dibujo_reim);
router.post("/getxusuario", get_dibujo_reim_x_usuario);
router.post("/getpropios", get_Misdibujo_reim);
router.post("/getgeneral", get_generaldibujo_reim);
router.post("/getAprobados", getAprobados);
router.post("/getLast", getLast);


module.exports = router;