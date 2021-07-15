var express = require("express");
var router = express.Router();
const {
    put_inventario_reim,
    get_inventario_reim,
} = require("../controllers/Inventario_reim.controller");
/* GET home page. */
router.post("/add", put_inventario_reim);
router.post("/get", get_inventario_reim);

module.exports = router;