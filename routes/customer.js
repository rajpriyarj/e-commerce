var express = require('express');
var router = express.Router();

const Customer = require('../controllers/c_customers')
const {authenticate} = require('../controllers/auth')

router.post('/', Customer.postCustomer)

router.post('/login', Customer.loginCustomer)

router.get('/', authenticate, Customer.getCustomer)

router.put('/address', authenticate, Customer.updateAddress)

router.put('/creditCard', authenticate, Customer.updateCreditCard)

module.exports = router