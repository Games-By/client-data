const express = require('express');
const router = express.Router();
const WishListController = require('../controllers/WishListController');

router.post('/wishlist/add', WishListController.addToWishList);
router.delete('/wishlist/remove', WishListController.removeFromWishList);
router.put('/wishlist/update', WishListController.updateWishList);

module.exports = router;
