var express = require("express");
var router = express.Router();
const {
  put_alumno_respuesta_actividad,
} = require("../controllers/alumno_respuesta.controller");
/* GET home page. */
router.post("/add", put_alumno_respuesta_actividad);

module.exports = router;
