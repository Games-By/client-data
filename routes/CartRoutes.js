const express = require('express');
const router = express.Router();
const CartController = require('../controllers/CartController');

router.get('/:id/cart', CartController.getCart);
router.post('/cart/add', CartController.addToCart);
router.delete('/cart/remove', CartController.removeFromCart);
router.put('/cart/update', CartController.updateCart);

module.exports = router;
