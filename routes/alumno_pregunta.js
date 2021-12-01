var express = require("express");
var router = express.Router();
const {
  get_alumno_pregunta_actividad,
} = require("../controllers/alumno_pregunta.controller");
/* GET home page. */
router.post("/get", get_alumno_pregunta_actividad);

module.exports = router;
