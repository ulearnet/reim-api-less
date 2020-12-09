var express = require('express');
var router = express.Router();
const { tiempoxactividad} = require('../controllers/tiempoactividad.controller')
/* GET home page. */
router.post('/add', addtiempoxactividad);
router.put('/update/:id', updatetiempoxactividad);



module.exports = router;
