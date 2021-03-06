const {DataTypes} = require('sequelize')

const {connection} = require('../database/connection')

const reviewModel = connection.define('reviews', {
    id: {
        type: DataTypes.BIGINT(11),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    review: {
        type: DataTypes.STRING,
        notEmpty: true,
        notNull: true
    },
    product_id: {
        type: DataTypes.BIGINT(11),
        allowNull: false,
        references: {
            model: require('../models/productModel').productModel,
            key: 'id'
        }
    }
})

module.exports = {review_model: reviewModel}