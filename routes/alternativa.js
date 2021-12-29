var express = require("express");
var router = express.Router();
const {
  get_alternativa,
  get_alternativa_justificacion
} = require("../controllers/alternativa.controller");
/* GET home page. */
router.post("/get", get_alternativa);
router.post("/getAlternativaJustificacion", get_alternativa_justificacion);

module.exports = router;