var express = require("express");
var router = express.Router();
const {
    add_opinion_dibujo,
} = require("../controllers/Opinion_dibujo.controller");
/* GET home page. */
router.post("/add", add_opinion_dibujo);

module.exports = router;