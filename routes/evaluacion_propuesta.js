var express = require("express");
var router = express.Router();
const {
    get_evaluacion_docen,
} = require("../controllers/evaluacion_propuesta.controller");
/* GET home page. */
router.post("/get", get_evaluacion_docen);

module.exports = router;