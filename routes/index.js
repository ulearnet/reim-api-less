var express = require('express');
var router = express.Router();
const { login,me,changePass } = require('../controllers/login.controller')
/* GET home page. */
router.post('/login', login);
router.post('/me/changepass', changePass);
router.get('/me', me);


module.exports = router;
