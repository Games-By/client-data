const express = require('express');
const router = express.Router();
const GetUserController = require('../controllers/GetUserController');

router.get('/user', GetUserController.getUser);
router.get('/users', GetUserController.getAllUsers);

module.exports = router;
