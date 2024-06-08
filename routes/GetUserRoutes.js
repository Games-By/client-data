// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const GetUserController = require('../controllers/GetUserController');

router.get('/user', GetUserController.getUser);

module.exports = router;
