const router = require('express').Router();
const AuthLoginController = require('../controllers/AuthLoginController');

router.post('/auth/login', AuthLoginController.login);

module.exports = router;
