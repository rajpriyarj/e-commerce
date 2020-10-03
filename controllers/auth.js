const jwt = require('jsonwebtoken')
require('dotenv').config();

const authenticate = (req, res, next) => {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader === "undefined"){
        throw new Error('Token value required as Authorization under header !')
    } else {
        let bearerToken = bearerHeader.split(' ')[1];
        let authData = verifyToken(res, next, bearerToken);
    }
};


const verifyToken = (res, next, token) => {
    let data = jwt.verify(token, process.env.SECRET_KEY, (err, authData) => {
        if (err) {
            throw new Error('Invalid Access Token !')
        } else {
            next();
        }
    });
};

module.exports = {
    authenticate
};
