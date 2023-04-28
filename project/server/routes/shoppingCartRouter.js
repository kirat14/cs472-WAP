const express = require('express');
const shoppingCartController = require('../controllers/shoppingCartController')

const router = express.Router();

router.post('/', shoppingCartController.addCart);
router.get('/', shoppingCartController.fetchCarts);
router.delete('/:id', shoppingCartController.deleteCart);
router.patch('/:id', shoppingCartController.updateCart);
router.post('/checkout', shoppingCartController.checkoutOrder);

module.exports = router;