const { db } = require('../config/database');
const Crypto = require('crypto');

module.exports = {
    register: (req, res) => {
        let {email,username,password} = req.body;
        let hashPassword = Crypto.createHmac('sha256', 'budi').update(password).digest('hex');
        let sql = `INSERT INTO users VALUES (null,${db.escape(email)},${db.escape(username)},${db.escape(hashPassword)},'user','active');`;

        db.query(sql, (err, result) => {
            if(err) {
                res.status(500).send({
                    message: "Failed register",
                    success: false,
                    error: err
                })
            }

            res.status(200).send({
                message: "register success",
                success: true,
                error: ""
            })
        })
    }
}