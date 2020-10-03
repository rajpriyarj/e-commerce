const {to} = require('await-to-js')

const database = require('../src/lib/models/attributesModel')
const logger = require('./../src/lib/logger/winston')
const attributeValue = require('./../src/lib/Payload/validation')

const getAttributes = async (req, res) => {
    try {
        let err, result

        if (req.params.attribute_id) {
            [err, result] = await to(database.attributesModel.findAll({
                where: {
                    id: req.params.attribute_id
                }
            }))
            if (err) {
                throw new Error(err.message)
            }

            if (!result[0]) {
                throw new Error("No attribute found with this id !")
            }

            return res.json({
                'data': result,
                'error': null
            });
        } else if (req.params.product_id) {
            [err, result] = await to(database.attributesModel.findAll({
                where: {
                    product_id: req.params.product_id
                }
            }))
            if (err) {
                throw new Error(err.message)
            }

            if (!result[0]) {
                throw new Error('No attributes found for this product id !')
            }

            return res.json({
                'data': result,
                'error': null
            });
        } else {
            [err, result] = await to(database.attributesModel.findAll())
            if (err) {
                throw new Error(err.message)
            }
            return res.json({
                'data': {'Category details': result},
                'error': null
            });
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


const postAttribute = async (req, res) => {
    try {
        let err, result

        [err, result] = await to(attributeValue.newAttribute.validateAsync(req.body))
        if (err) {
            throw new Error(err.message)
        }

        [err, result] = await to(database.attributesModel.create(req.body))
        if (err) {
            throw new Error(err.message)
        }

        return res.json({
            'data': {"Success": "Attribute Added"},
            'error': null
        });
    } catch (err) {
        logger.error(err.message)
        return res.json({
            'data': null,
            'error': {
                'message': err.message
            }
        });
    }
}

module.exports = {getAttributes, postAttribute}
