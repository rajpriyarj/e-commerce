const {to} = require('await-to-js')
const databaseC = require('../src/lib/models/categoryModel')
const databaseP = require('../src/lib/models/productModel')
const logger = require('./../src/lib/logger/winston')
const categoryValue = require('./../src/lib/Payload/validation')

const getCategories = async (req, res) => {
    try {
        let err, result

        if (req.params.category_id) {
            [err, result] = await to(databaseC.categoryModel.findAll({
                where: {
                    id: req.params.category_id
                }
            }))
            if (err) {
                throw new Error(err.message)
            }

            if (!result[0]) {
                throw new Error("No category found with this id !")
            }

            return res.json({
                'data': result,
                'error': null
            })
        } else if (req.params.product_id) {
            [err, result] = await to(databaseP.productModel.findAll({
                attributes: ['category_id'],
                where: {
                    id: req.params.product_id
                }
            }))
            if (err) {
                throw new Error(err.message)
            }

            if (!result[0]) {
                throw new Error('No category found for this product id !')
            }

            return getCategories({
                category_id: result[0]['dataValues']['category_id']
            })
        } else {
            [err, result] = await to(databaseC.categoryModel.findAll())
            if (err) {
                throw new Error(err.message)
            }
            return res.json({
                'data': {'Category details': result},
                'error': null
            })
        }
    } catch (err) {
        logger.error(err.message)
        return {
            'data': null,
            'error': {
                'message': err.message
            }
        }
    }
}


const postCategory = async (req, res) => {
    try {
        let err, result

        [err, result] = await to(categoryValue.newCategory.validateAsync(req.body))
        if (err){
            throw new Error(err.message)
        }

        [err, result] = await to(databaseC.categoryModel.create({
            name: req.body.name
        }))
        if (err) {
            throw new Error(err.message)
        }
        return res.json({
            'data': {"Success": "Category Added"},
            'error': null
        })
    } catch (err) {
        logger.error(err.message)
        return {
            'data': null,
            'error': {
                'message': err.message
            }
        }
    }
}

module.exports = {getCategories, postCategory}
