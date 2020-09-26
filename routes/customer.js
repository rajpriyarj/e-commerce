var express = require('express');
var router = express.Router();

const {to} = require('await-to-js')
const Customer = require('../controllers/c_customers')
const authenticate = require('../controllers/auth')


router.get('/', authenticate, async (req, res) => {
    let err, result
    [err, result] = await to(Customer.getCustomer(req))
    if (err) {
        return res.json({
            'data': null,
            'error': {
                'message': err.message
            }
        })
    }
    return res.json(result)
})

router.post('/', async (req, res) => {
    let err, result
    [err, result] = await to(Customer.postCustomer(req.body))
    if (err) {
        return res.json({
            'data': null,
            'error': {
                'message': err.message
            }
        })
    }
    return res.json(result)
})

router.post('/login', async (req, res) => {
    let err, result
    [err, result] = await to(Customer.loginCustomer(req.body))
    if (err) {
        return res.json({
            'data': null,
            'error': {
                'message': err.message
            }
        })
    }
    return res.json(result)
})


router.put('/address', authenticate, async (req, res) => {
    let err, result
    [err, result] = await to(Customer.updateAddress(req))
    if (err) {
        return res.json({
            'data': null,
            'error': {
                'message': err.message
            }
        })
    }
    return res.json(result)
})

router.put('/creditCard', authenticate, async (req, res) => {
    let err, result
    [err, result] = await to(Customer.updateCreditCard(req))
    if (err) {
        return res.json({
            'data': null,
            'error': {
                'message': err.message
            }
        })
    }
    return res.json(result)
})

module.exports = router