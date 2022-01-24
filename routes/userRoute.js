const router = require('express').Router();
const { userController } = require('../controllers');
const {readToken} = require('../config/enkripsi')

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/login/keep', readToken,userController.keepLogin);

module.exports = router