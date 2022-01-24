const jwt = require('jsonwebtoken');
const Crypto = require('crypto');

module.exports = {
    hashPassword: (pass) => {
        return Crypto.createHmac('sha256', 'masak-asik').update(pass).digest('hex');
    },
    createToken: (payload) => {
        return jwt.sign(payload,process.env.TOKEN_KEY, {
            expiresIn: '24h'
        })
    },
    readToken: (req,res,next) => {
        jwt.verify(req.token,process.env.TOKEN_KEY,(err,decode) => {
            if (err) {
                res.status(401).send({
                    message: 'user no authorization ❌',
                    success: false,
                    error: err
                })
            }

            req.dataUser = decode;

            next()
        })
    }
}