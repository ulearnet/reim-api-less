var express = require("express");
var router = express.Router();
const {
  put_alumno_respuesta_actividad,
  put_alumno_respuesta_actividad2,
  get_colab_spacemath,
  get_tienda_spacemath,
  get_count_element_alumno_respuesta_actividad,
  get_alumno_respuesta_actividad,
} = require("../controllers/alumno_respuesta.controller");
/* GET home page. */
router.post("/add", put_alumno_respuesta_actividad);
router.post("/add2", put_alumno_respuesta_actividad2);
router.post("/getspace", get_colab_spacemath);
router.post("/getienda", get_tienda_spacemath);
router.post("/getelement", get_count_element_alumno_respuesta_actividad);
router.post("/get", get_alumno_respuesta_actividad);

module.exports = router;
