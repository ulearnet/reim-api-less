var express = require("express");
var router = express.Router();
const {
  get_itemAleatorio
} = require("../controllers/item.controller");
/* GET home page. */
router.post("/getRandom", get_itemAleatorio);

module.exports = router;