const {DataTypes} = require('sequelize')

const {connection} = require('../database/connection')

const customerModel = connection.define('customer', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        notEmpty: true,
        notNull: true
    },
    email: {
        type: DataTypes.STRING,
        notEmpty: true,
        notNull: true
    },
    phone: {
        type: DataTypes.BIGINT,
        notEmpty: true,
        notNull: true
    },
    address: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    creditCardNumber: {
        type: DataTypes.BIGINT,
        defaultValue: null
    },
    encryptedPassword: {
        type: DataTypes.STRING,
        notEmpty: true,
        notNull: true
    }
})

module.exports = {
    customerModel
}