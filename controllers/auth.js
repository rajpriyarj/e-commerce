const jwt = require('jsonwebtoken')

// const checkToken = (req, res, next) => {
//     const bearerHeader = req.headers.authorization;
//     if (typeof bearerHeader === "undefined"){
//         res.json({
//             "error":"Token Invalid"
//         })
//     } else {
//         let bearerToken = bearerHeader.split(' ')[1];
//         let authData = verifyToken(res, next, bearerToken);
//     }
// };
//
// let salt = 'ZGV2c25lc3QK';
//
// const verifyToken = (res, next, token) => {
//     let data = jwt.verify(token, salt, (err, authData) => {
//         if (err) {
//             res.json({error: "Invalid token."});
//         } else {
//             next();
//         }
//     });
// };

const authenticate = (req, res, next) => {
    try {
        var token = req.headers.authorization
        if(!token) {
            throw new Error('Token value required as Authorization under header!')
        } else {
            token = token.split('')[1]
            if (token) {
                jwt.verify(token, process.env.GNOME_DESKTOP_SESSION_ID, (err, user) => {
                    if (err) {
                        throw new Error(('Invalid Access Token'))
                    } else {
                        req.user = user
                        next()
                    }
                })
            } else {
                throw new Error('Access Token Not Found! ')
            }
        }
    } catch (err) {
        return res.json({
            'data': null,
            'error': {
                'message': err.message
            }
        })
    }
}

module.exports = authenticate;