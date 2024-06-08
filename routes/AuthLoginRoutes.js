const router = require('express').Router();
const AuthLoginController = require('../controllers/AuthLoginController');

router.post('/auth/login', AuthLoginController.login);
router.get('/download/image', AuthLoginController.downloadImage)

module.exports = router;
