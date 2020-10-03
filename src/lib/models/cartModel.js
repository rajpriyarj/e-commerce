const {DataTypes} = require('sequelize')

const {connection} = require('../database/connection')

const cartItemsModel = connection.define('shoppingCart', {
    id: {
        type: DataTypes.BIGINT(11),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    customer: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: require('./customerModel').customerModel,
            key: 'username'
        }
    },
    product_id: {
        type: DataTypes.BIGINT(11),
        allowNull: false,
        references: {
            model: require('../models/productModel').productModel,
            key: 'id'
        }
    },
    qty: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    }
})

module.exports = {cartItemsModel}