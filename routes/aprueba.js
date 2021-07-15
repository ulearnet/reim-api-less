var express = require("express");
var router = express.Router();
const {
  put_aprueba
} = require("../controllers/aprueba.controller");
/* GET home page. */
router.post("/put", put_aprueba);

module.exports = router;