var express = require("express");
var router = express.Router();
const {
    eliminar_id,
    get_ultimo_id,
    get_usuarios_necesitados,
    get_usuarios_catalogo,
    update,
    get_existe,
    update2,
    add,
    get_existe_sesion,
    get_by_id,
    get_usuarios_catalogo_1
} = require("../controllers/catalogo_reim.controller");
/* GET home page. */
router.post("/getLast", get_ultimo_id);
router.post("/getNeedUsers", get_usuarios_necesitados);
router.post("/getCatalogo", get_usuarios_catalogo);
router.post("/update", update);
router.post("/existe", get_existe)
router.post("/update2",update2);
router.post("/add",add)
router.post("/existeSesion",get_existe_sesion)
router.post("/getByID",get_by_id)
router.post("/getCatalogo_1",get_usuarios_catalogo_1)
router.post("/eliminar", eliminar_id)

module.exports = router;