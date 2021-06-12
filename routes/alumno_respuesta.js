var express = require("express");
var router = express.Router();
const {
  put_alumno_respuesta_actividad,
  get_colab_spacemath,
} = require("../controllers/alumno_respuesta.controller");
/* GET home page. */
router.post("/add", put_alumno_respuesta_actividad);
router.post("/getspace", get_colab_spacemath);

module.exports = router;
