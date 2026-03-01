const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cartController');

router.post('/cart', CartController.addToCart);
router.get('/cart', CartController.getCartItems);
router.put('/cart/:id', CartController.updateCartItem);
router.delete('/cart/:id', CartController.deleteCartItem);

module.exports = router;