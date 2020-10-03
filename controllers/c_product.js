const {to} = require('await-to-js')

const databaseP = require('../src/lib/models/productModel')
const databaseR = require('../src/lib/models/reviewModel')
const logger = require('./../src/lib/logger/winston')
const reviewValue = require('./../src/lib/Payload/validation')
const productValue = require('./../src/lib/Payload/validation')

const getProducts = async (req, res) => {
    try {
        let err, result

        if (req.params.product_id) {
            [err, result] = await to(databaseP.productModel.findAll({
                where: {
                    id: req.params.product_id
                }
            }))
            if (err) {
                throw new Error(err.message)
            }

            if (!result[0]) {
                throw new Error('No product found for this id!')
            }

            return res.json({
                'data': result,
                'error': null
            })
        } else if (req.params.category_id) {
            [err, result] = await to(databaseP.productModel.findAll({
                where: {
                    category_id: req.params.category_id
                }
            }))
            if (err) {
                throw new Error(err.message)
            }

            if (!result[0]) {
                throw new Error('No product found for this category id!')
            }

            return res.json({
                'data': result,
                'error': null
            })
        } else {
            [err, result] = await to(databaseP.productModel.findAll())
            if (err) {
                throw new Error(err.message)
            }

            return res.json({
                'data': result,
                'error': null
            })
        }
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

const postProduct = async (req, res) => {
    try {
        let err, result

        [err, result] = await to(productValue.newProduct.validateAsync(req.body))
        if (err) {
            throw new Error(err.message)
        }

        return res.json({
            'data': {"Success": "Product Added"},
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

const postReview = async (req, res) => {
    try {
        let err, result

        [err, result] = await to(reviewValue.newReview.validateAsync(req.body))
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
            throw new Error('No product exists with this id !')
        }

        [err, result] = await to(databaseR.review_model.create(req.body))
        if (err) {
            throw new Error(err.message)
        }

        return res.json({
            'data': {"Success": "Review added!"},
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

const getReview = async (req, res) => {
    try {
        let err, result
        [err, result] = await to(databaseR.review_model.findAll({
            where: {
                product_id: req.body.product_id
            }
        }))
        if (err) {
            throw new Error(err.message)
        }
        if (!result[0]) {
            throw new Error('No review found for this product id!')
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

module.exports = {getProducts, postProduct, postReview, getReview}