const {DataTypes} = require('sequelize')

const {connection} = require('../database/connection')

const productModel = connection.define('products', {
    id: {
        type: DataTypes.BIGINT(11),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        notEmpty: true,
        notNull: true
    },
    details: {
        type: DataTypes.STRING,
        notEmpty: true,
        notNull: true
    },
    price: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
    },
    category_id: {
        type: DataTypes.BIGINT(11),
        allowNull: false,
        references: {
            model: require('../models/categoryModel').categoryModel,
            key: 'id'
        }
    }
})

module.exports = {productModel: productModel}