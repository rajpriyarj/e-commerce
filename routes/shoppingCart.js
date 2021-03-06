var express = require('express');
var router = express.Router();

const ShoppingCart = require('../controllers/c_shoppingCart')
const {authenticate} = require('../controllers/auth')

router.get('/', authenticate, ShoppingCart.showCart)

router.post('/add', authenticate, ShoppingCart.addItem)

router.put('/qty', authenticate, ShoppingCart.updateQty)

router.delete('/removeProduct', authenticate, ShoppingCart.removeItem)

router.get('/totalAmount', authenticate, ShoppingCart.getAmount)

router.post('/checkout', authenticate, ShoppingCart.checkOut)

module.exports = router