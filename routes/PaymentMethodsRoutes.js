const express = require('express');
const router = express.Router();
const PaymentMethodsController = require('../controllers/PaymentMethodsController');

router.post('/payment_methods/add', PaymentMethodsController.addPaymentMethod);
router.put('/payment_methods/update', PaymentMethodsController.updatePaymentMethod);
router.delete('/payment_methods/remove', PaymentMethodsController.removePaymentMethod);

module.exports = router;
