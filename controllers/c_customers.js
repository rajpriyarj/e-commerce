const {to} = require('await-to-js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

const database = require('../src/lib/models/customerModel')
const logger = require('./../src/lib/logger/winston')
const customerValue = require('./../src/lib/Payload/validation')

const postCustomer = async (req, res) => {
    try {
        let err, result

        [err, result] = await to(customerValue.newCustomer.validateAsync(req.body))
        if(err){
            throw new Error(err.message)
        }

        let encryptedPassword = await passwordHash(req.body.password.toString());
        delete req.body.password;
        req.body.encryptedPassword = encryptedPassword;

        [err, result] = await to(database.customerModel.findAll({
            where: {
                username: req.body.username
            }
        }))
        if (err) {
            throw new Error(err.message)
        }
        if (result[0]) {
            throw new Error(' A customer with this username already exists !')
        }

        [err, result] = await to(database.customerModel.create(req.body))
        if (err) {
            throw new Error(err.message)
        }
        //
        let customer = {username: req.body.username, encryptedPassword: req.body.encryptedPassword};
        // const token = jwt.sign(customer, process.env.SECRET_KEY, {expiresIn: '50m'})

        return res.json({
            'data': {
                'message': 'Signed up successfully!',
                'your Access Token': generateToken(customer)
            },
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

const loginCustomer = async (req, res) => {
    try {
        let err, result

        [err, result] = await to(customerValue.loginCustomer.validateAsync(req.body))
        if(err){
            throw new Error(err.message)
        }

        [err, result] = await to(database.customerModel.findAll({
            where: {
                username: req.body.username
            }
        }))
        if (err) {
            throw new Error(err.message)
        }

        if (!result[0]) {
            throw new Error('no customer with this username exists!')
        }

        let customer = result[0]['dataValues'];

        [err, result] = await to(bcrypt.compare(req.body.password.toString(), customer.encryptedPassword))
        if (err) {
            throw new Error(err.message)
        }
        if (result) {
            customer = {username: req.body.username, encryptedPassword: customer.encryptedPassword}
            // const token = jwt.sign(customer, process.env.SECRET_KEY, {expiresIn: '50m'})
            return res.json({
                'data': {
                    'message': 'logged in successfully !',
                    'your Access Token': generateToken(customer)
                },
                'error': null
            })
        } else {
            throw new Error('Invalid Password!')
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

const getCustomer = async (req, res) => {
    try {
        let err, result

        [err, result] = await to(database.customerModel.findAll({
            where: {
                username: req.user.username
            }
        }))
        if (err) {
            throw new Error(err.message)
        }

        return res.json({
            'data': {
                'customer details': result
            }, 'error': null
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

const updateAddress = async (req, res) => {
    try {
        let err, result
        [err, result] = await to(customerValue.address.validateAsync(req.body))
        if (err) {
            throw new Error(err.message)
        }

        [err, result] = await to(database.customerModel.update({
            address: req.body.address
        }, {
            where: {
                username: req.user.username
            }
        }))
        if (err) {
            throw new Error(err.message)
        }

        return res.json({
            'data': {
                'message': 'address updated successfully!'
            }, 'error': null
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

const updateCreditCard = async (req, res) => {
    try {
        let err, result
        [err, result] = await to(customerValue.creditCard.validateAsync(req.body))
        if(err){
            throw new Error(err.message)
        }

        [err, result] = await to(database.customerModel.update({
            creditCardNumber: req.body.creditCard
        }, {
            where: {
                username: req.user.username
            }
        }))
        if (err) {
            throw new Error(err.message)
        }

        return res.json({
            'data': {
                'message': 'creditCard number updated successfully!'
            }, 'error': null
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

const passwordHash = async (password) => {
    const saltRounds = 12;
    let [err, passwordHash] = await to(bcrypt.hash(password, saltRounds));
    try{
        if (err) {
            //logger.error('Error while generating password hash', { error: err });
            throw Error('Error while generating password hash');
        }
    } catch (e) {
        console.log(e.message)
    }

    return passwordHash;
};

const generateToken  = (userData) => {
    let token = jwt.sign(userData, process.env.SECRET_Key, {
        expiresIn: 172800000,
    });
    return token;
};

module.exports = {postCustomer, loginCustomer, getCustomer, updateAddress, updateCreditCard}