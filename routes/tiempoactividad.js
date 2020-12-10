var express = require('express');
var router = express.Router();
const { addtiempoxactividad, updatetiempoxactividad, updatetiempoxactividadfinal} = require('../controllers/tiempoactividad.controller')
/* GET home page. */
router.post('/add', addtiempoxactividad);
router.post('/update/:id', updatetiempoxactividad);
router.post('/final/:id', updatetiempoxactividadfinal);



module.exports = router;
