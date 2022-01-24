const router = require('express').Router()
const {kategoriController} = require('../controllers');

router.get('/', kategoriController.getData);

module.exports = router;
