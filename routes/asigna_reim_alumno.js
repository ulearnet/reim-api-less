var express = require("express");
var router = express.Router();
const {
  put_asigna_reim_alumno,
  update_asigna_reim_alumno_final,
  update_asigna_reim_alumno,
} = require("../controllers/asigna_reim_alumno.controller");
/* GET home page. */
router.post("/add", put_asigna_reim_alumno);
router.post("/update/:id", update_asigna_reim_alumno);
router.post("/final/:id", update_asigna_reim_alumno_final);

module.exports = router;
