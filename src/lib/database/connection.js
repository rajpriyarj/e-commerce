const {to} = require('await-to-js')
const {Sequelize} = require('sequelize')
const logger = require('../logger/winston')
require('dotenv').config();

const connection = new Sequelize(
    process.env.DATABASE,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.HOST,
        dialect: 'mysql',
        logging: msg => logger.info(msg)
    }
)

const connect = async () => {
    let [err, result] = await to(connection.sync({alter: true}))
    if (err) {
        logger.error(err.message)
        return
    }
    logger.info('Successfully connected to MySQL server.')
    console.log('Successfully connected to MySQL server.')
}

module.exports = {
    connection, connect
}