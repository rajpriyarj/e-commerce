var express = require('express');
var router = express.Router();

const Orders = require('../controllers/c_orders')
const {authenticate} = require('../controllers/auth')

router.get('/', authenticate, Orders.getOrders);

router.post('/', authenticate, Orders.newOrder);

module.exports = router