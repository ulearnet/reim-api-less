var express = require('express');
var router = express.Router();
const { tiempoxactividad} = require('../controllers/tiempoactividad.controller')
/* GET home page. */
router.post('/tiempoxactividad', addtiempoxactividad);



module.exports = router;
