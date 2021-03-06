const {DataTypes} = require('sequelize')

const {connection} = require('../database/connection')

const categoryModel = connection.define('category', {
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
    }
})

module.exports = {categoryModel: categoryModel}