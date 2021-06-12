var express = require("express");
var router = express.Router();
const {
  get_alternativa
} = require("../controllers/alternativa.controller");
/* GET home page. */
router.post("/get", get_alternativa);

module.exports = router;