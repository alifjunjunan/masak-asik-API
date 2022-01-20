const { db } = require('../config/database');
const Crypto = require('crypto');

module.exports = {
    register: (req, res) => {
        let {email,username,password} = req.body;
        let hashPassword = Crypto.createHmac('sha256', 'masak-asik').update(password).digest('hex');
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
    },
    login: (req,res) => {
        let {email,password} = req.body;
        let hashPassword = Crypto.createHmac('sha256','masak-asik').update(password).digest('hex');
        let sql = `SELECT * FROM users WHERE email=${db.escape(email)} AND password=${db.escape(hashPassword)};`
        
        db.query(sql,(err,result) => {
            if(err) {
                res.status(500).send({
                    message: "Failed login",
                    success: false,
                    error: err
                })
            }

            if(result.length > 0) {
                res.status(200).send({
                    message: 'login success',
                    success: true,
                    dataLogin: result[0],
                    error:''
                })
            }else {
                res.status(401).send({
                    message: 'login failed',
                    success: false,
                    dataLogin: {},
                    error:''
                })
            }
        })
    },
    keepLogin: (req,res) => {

        let {iduser} = req.body;
        let sql = `SELECT * FROM users WHERE iduser=${db.escape(iduser)};`;

        db.query(sql,(err,result) => {
            if(err){
                res.status(500).send({
                    message: 'keep login failed',
                    success: false,
                    error: err
                })
            }

            console.log(sql)

            if (result.length > 0){
                res.status(200).send({
                    message: 'keep login success',
                    success: true,
                    dataLogin: result[0],
                    error: ''
                })
            }else {
                res.status(401).send({
                    message: "keep login failed",
                    success: false,
                    dataLogin: {},
                    error: ""
                })
            }
        })
    }
}