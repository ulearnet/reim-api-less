var express = require('express');
var router = express.Router();
const {
    comprar,
    get_ultimo_id,
    get_regalos,
    get_ventas,
    updateEstadoVentas,
    updateEstadoRegalos
} = require('../controllers/transaccion_reim.controller')
/* GET home page. */
router.post('/Buy', comprar);
router.post('/getLast', get_ultimo_id);
router.post('/getRegalos', get_regalos);
router.post('/getVentas', get_ventas);
router.post('/updateEstadoVentas', updateEstadoVentas);
router.post('/updateEstadoRegalos', updateEstadoRegalos);


module.exports = router;