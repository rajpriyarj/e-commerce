const jwt = require('jsonwebtoken')
require('dotenv').config();

const authenticate = (req, res, next) => {
    const bearerHeader = req.headers.authorization;
    if (!bearerHeader){
        throw new Error('Token value required as Authorization under header !')
    } else {
        let bearerToken = bearerHeader.split(' ')[1];
        let authData = verifyToken(req, res, next, bearerToken);
    }
};

let salt = process.env.SECRET_Key;

const verifyToken = (req, res, next, token) => {
    let data = jwt.verify(token, salt, (err, authData) => {
        if (err) {
            throw new Error('Invalid Access Token !')
        } else {
            req.user = authData
            next();
        }
    });
};

// const authenticate = (req, res, next) => {
//     try {
//         var token = req.headers.authorization
//         if (!token) {
//             throw new Error('Token value required as Authorization under header!')
//         } else {
//             token = token.split(' ')[1]
//             if (token) {
//                 jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
//                     if (err) {
//                         throw new Error('Invalid Access Token')
//                     } else {
//                         req.user = user
//                         next()
//                     }
//                 })
//             } else {
//                 throw new Error(' Access Token not found! ')
//             }
//         }
//     } catch (err) {
//         return res.json({
//             'data': null,
//             'error': {
//                 'message': err.message
//             }
//         })
//     }
// }

module.exports = {
    authenticate
};
