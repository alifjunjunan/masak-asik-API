const {resepController} = require('../controllers');
const router = require('express').Router();

router.get('/', resepController.getData);

module.exports =router;

