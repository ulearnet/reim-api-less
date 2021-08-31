var express = require("express");
var router = express.Router();
const {
    get_dibujo_reim,
    getAprobados,
    getLast
} = require("../controllers/Dibujo_reim.controller");


router.post("/get/:id", get_dibujo_reim);
router.post("/getAprobados", getAprobados);
router.post("/getLast", getLast);


module.exports = router;