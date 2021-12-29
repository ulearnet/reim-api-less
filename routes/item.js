var express = require("express");
var router = express.Router();
const {
  get_itemAleatorio,
  get_item
} = require("../controllers/item.controller");
/* GET home page. */
router.post("/getRandom", get_itemAleatorio);
router.post("/getItem", get_item);

module.exports = router;