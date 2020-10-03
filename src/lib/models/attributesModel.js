const {DataTypes} = require('sequelize')

const {connection} = require('../database/connection')

const attributesModel = connection.define('attributes', {
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
    value: {
        type: DataTypes.STRING,
        notEmpty: true,
        notNull: true
    },
    product_id: {
        type: DataTypes.BIGINT(11),
        allowNull: false,
        references: {
            model: require('./productModel').productModel,
            key: 'id'
        }
    }
})

module.exports = {attributesModel}