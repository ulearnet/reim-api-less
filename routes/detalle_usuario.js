var express = require("express");
var router = express.Router();
const {
  get_detalle_usuario,
  update_detalle_usuario,
  put_detalle_usuario
} = require("../controllers/detalle_usuario.controller");
/* GET home page. */
router.post("/get", get_detalle_usuario);
router.post("/update", update_detalle_usuario);
router.post("/add", put_detalle_usuario);

module.exports = router;