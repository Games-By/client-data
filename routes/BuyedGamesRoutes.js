const express = require('express');
const router = express.Router();
const BuyedGamesController = require('../controllers/BuyedGamesController');

router.post('/buyed_games/add', BuyedGamesController.addBuyedGame);
router.delete('/buyed_games/remove', BuyedGamesController.removeBuyedGame);
router.put('/buyed_games/update', BuyedGamesController.updateBuyedGame);

module.exports = router;
