const { db } = require('../config/database');
const Crypto = require('crypto');
const {hashPassword, createToken} = require('../config/enkripsi')

module.exports = {
    register: (req, res) => {
        let {email,username,password} = req.body;
        
        let sql = `INSERT INTO users VALUES (null,${db.escape(email)},${db.escape(username)},${db.escape(hashPassword(password))},'user','active');`;

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
        let sql = `SELECT * FROM users WHERE email=${db.escape(email)} AND password=${db.escape(hashPassword(password))};`
        
        db.query(sql,(err,result) => {
            if(err) {
                res.status(500).send({
                    message: "Failed login",
                    success: false,
                    error: err
                })
            }

            if(result.length > 0) {
                let {iduser,email,username,role,status} = result[0]
                let token = createToken({iduser,email,username,role,status})
                res.status(200).send({
                    message: 'login success',
                    success: true,
                    dataLogin: {email,username,role,status, token},
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

        
        let sql = `SELECT * FROM users WHERE iduser=${db.escape(req.dataUser.iduser)};`;

        db.query(sql,(err,result) => {
            if(err){
                res.status(500).send({
                    message: 'keep login failed',
                    success: false,
                    error: err
                })
            }
            
            if (result.length > 0){
                let {iduser,email,username,role,status} = result[0];
                let token = createToken({iduser,email,username,role,status});
                res.status(200).send({
                    message: 'keep login success',
                    success: true,
                    dataLogin: {email,username,role,status,token},
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