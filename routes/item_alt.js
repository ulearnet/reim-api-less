var express = require("express");
var router = express.Router();
const {
  get_item_alts,
  put_item_alt,
  get_item_alt_by_item,
  get_item_alt_order,
} = require("../controllers/item_alt.controller");
/* GET home page. */
router.post("/add", put_item_alt);
router.post("/getItemAlt", get_item_alts);
router.post("/getAltByItemID", get_item_alt_by_item);
router.post("/getItemAltOrder/:id", get_item_alt_order);
module.exports = router;
