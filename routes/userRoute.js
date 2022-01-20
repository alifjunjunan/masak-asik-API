const router = require('express').Router();
const { userController } = require('../controllers');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/login/keep', userController.keepLogin);

module.exports = router