const {to} = require('await-to-js')

const databaseO = require('../src/lib/models/orderModel')
const databaseP = require('../src/lib/models/productModel')
const databaseC = require('../src/lib/models/customerModel')
const logger = require('./../src/lib/logger/winston')
const orderValue = require('./../src/lib/Payload/validation')

const getOrders = async (req, res) => {
    try {
        let err, result
        [err, result] = await to(databaseO.orderModel.findAll({
            where: {
                customer: req.user.username
            }
        }))
        if (err) {
            throw new Error(err.message)
        }

        return res.json({
            'data': result,
            'error': null
        })
    } catch (err) {
        logger.error(err.message)
        return res.json({
            'data': null,
            'error': {
                'message': err.message
            }
        })
    }
}

const newOrder = async (req, res) => {
    try {
        let err, result
        [err, result] = await to(orderValue.newOrder.validateAsync(req.body))
        if(err){
            throw new Error(err.message)
        }

        req.body.customer = req.user.username;
        [err, result] = await to(databaseP.productModel.findAll({
            where: {
               id: req.body.product_id
            }
        }))
        if(err){
            throw new Error((err.message))
        }
        if(!result[0]){
            throw new Error('No product of this id exist !')
        }

        let price = result[0]['dataValues']['price'];

        [err, result] = await to(databaseC.customerModel.findAll({
            where: {
                username: req.user.username
            }
        }))

        if (!result[0]['dataValues']['address']) {
            throw new Error('user\'s address is not updated!')
        }
        if (!result[0]['dataValues']['creditCardNumber']) {
            throw new Error('user\'s creditCardNumber is not updated!')
        }


        [err, result] = await to(databaseO.orderModel.create(req.body))
        if (err) {
            throw new Error(err.message)
        }

        return res.json({
            'data': {
                'message': 'Order placed successfully!',
                'amount': `₹${price} x ${params.body.qty} items = ₹${price * params.body.qty}`
            }, 'error': null
        })
    } catch (err) {
        logger.error(err.message)
        return res.json({
            'data': null,
            'error': {
                'message': err.message
            }
        })
    }
}

module.exports = {getOrders, newOrder}