var express = require("express");
var router = express.Router();
const {
    InsertGuest,
    updatear_usuario,
    guest_a_colegio
} = require("../controllers/invitado.controller");
/* GET home page. */
router.post("/insert_guest", InsertGuest);
router.post("/guest_a_colegio", guest_a_colegio);
router.post("/updatear_usuario", updatear_usuario);

module.exports = router;