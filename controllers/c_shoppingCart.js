const {to} = require('await-to-js')
const Sequelize = require('sequelize')

const databaseC = require('../src/lib/models/cartModel')
const databaseP = require('../src/lib/models/productModel')
const logger = require('./../src/lib/logger/winston')
const Order = require('./../controllers/c_orders')

const cartValue = require('./../src/lib/Payload/validation')

const showCart = async (req, res) => {
    try {
        let err, result
        [err, result] = await to(databaseC.cartItemsModel.findAll({
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

const addItem = async (req, res) => {
    try {
        let err, result
        req.body.customer = req.user.username;

        [err, result] = await to(cartValue.newOrder.validateAsync(req.body));
        if(err){
            throw new Error(err.message)
        }

        [err, result] = await to(databaseP.productModel.findAll({
            where: {
                id: req.body.product_id
            }
        }))
        if (err) {
            throw new Error(err.message)
        }
        if (!result[0]) {
            throw new Error(' no product found for this id!')
        }

        [err, result] = await to(databaseC.cartItemsModel.findAll({
            where: {
                customer: req.body.customer,
                product_id: req.body.product_id
            }
        }));
        if (err) {
            throw new Error(err.message)
        }
        if (result[0]) {
            [err, result] = await to(databaseC.cartItemsModel.update({
                qty: Sequelize.literal(`qty+${req.body.qty}`)
            }, {
                where: {
                    customer: req.body.customer,
                    product_id: req.body.product_id
                }
            }))
            if (err) {
                throw new Error(err.message)
            }
        } else {
            [err, result] = await to(databaseC.cartItemsModel.create(req.body))
            if (err) {
                throw new Error(err.message)
            }
        }

        return res.json({
            'data': {
                'message': 'product added to card successfully!'
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

const updateQty = async (req, res) => {
    try {
        let err, result
        req.body.customer = req.user.username;

        [err, result] = await to(cartValue.newOrder.validateAsync(req.body))
        if(err){
            throw new Error(err.message)
        }

        [err, result] = await to(databaseP.productModel.findAll({
            where: {
                id: req.body.product_id
            }
        }))
        if (err) {
            throw new Error(err.message)
        }
        if (!result[0]) {
            throw new Error(' no product found for this id!')
        }

        [err, result] = await to(databaseC.cartItemsModel.findAll({
            where: {
                customer: req.body.customer,
                product_id: req.body.product_id
            }
        }));
        if (err) {
            throw new Error(err.message)
        }
        if (!result[0]) {
            throw new Error('no product with this id exists in the cart')
        }

        [err, result] = await to(databaseC.cartItemsModel.update({
            qty: req.body.qty
        }, {
            where: {
                customer: req.body.customer,
                product_id: req.body.product_id
            }
        }))
        if (err) {
            throw new Error(err.message)
        }

        return res.json({
            'data': {
                'message': 'new quantity updated successfully!'
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

const removeItem = async (req, res) => {
    try {
        let err, result
        req.body.customer = req.user.username;

        [err, result] = await to(cartValue.productID.validateAsync(req.body))
        if(err){
            throw new Error(err.message)
        }

        [err, result] = await to(databaseP.productModel.findAll({
            where: {
                id: req.body.product_id
            }
        }))
        if (err) {
            throw new Error(err.message)
        }
        if (!result[0]) {
            throw new Error(' no product found for this id!')
        }

        [err, result] = await to(databaseC.cartItemsModel.findAll({
            where: {
                customer: req.body.customer,
                product_id: req.body.product_id
            }
        }));
        if (err) {
            throw new Error(err.message)
        }
        if (!result[0]) {
            throw new Error('no product with this id exists in the cart')
        }

        [err, result] = await to(databaseC.cartItemsModel.destroy({
            where: {
                customer: req.body.customer,
                product_id: req.body.product_id
            }
        }))
        if (err) {
            throw new Error(err.message)
        }

        return res.json({
            'data': {
                'message': 'product removed successfully from cart!'
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

const getAmount = async (req, res) => {
    try {
        let err, result
        [err, result] = await to(databaseC.cartItemsModel.findAll({
            where: {
                customer: req.user.username
            }
        }))
        if (err) {
            throw new Error(err.message)
        }

        let amount = 0;
        for (const item of result) {
            [err, result] = await to(databaseP.productModel.findAll({
                where: {
                    id: item['dataValues']['product_id']
                }
            }))
            if (err) {
                throw new Error(err.message)
            }

            amount += result[0]['dataValues']['price'] * item['dataValues']['qty']
        }

        return res.json({
            'data': {
                'message': `your total cart amount = ₹${amount}`
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

const checkOut = async (req, res) => {
    try {
        let err, result

        [err, result] = await to(getAmount(req.body));
        if (err) {
            throw new Error(err.message)
        }
        if (!result.data) {
            throw new Error(result.error.message)
        }

        const amount_message = result.data.message;


        [err, result] = await to(databaseC.cartItemsModel.findAll({
            where: {
                customer: req.user.username
            }
        }))
        if (err) {
            throw new Error(err.message)
        }

        let product, bill = [];
        for (const item of result) {
            product = {
                body: {
                    product_id: item['dataValues']['product_id'],
                    qty: item['dataValues']['qty']
                },
                user: {
                    username: req.user.username
                }
            };
            [err, result] = await to(Order.newOrder(product))
            if (err) {
                throw new Error(err.message)
            }
            if (!result.data) {
                throw new Error(result.error.message)
            }
            bill.push(result.data.amount);

            [err, result] = await to(removeItem(product))
            if (err) {
                throw new Error(err.message)
            }
            if (!result.data) {
                throw new Error(result.error.message)
            }
        }

        return res.json({
            'data': {
                'message': 'orders placed successfully!',
                'bill': bill,
                'amount': amount_message
            },
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

module.exports = {showCart, addItem, updateQty, removeItem, getAmount, checkOut}