const express = require('express');
const employyeController = require('../controllers/employeController');
const verifyToken = require('../middleware/verifytoken');
const router = express.Router();

router.post('/login', employyeController.login);
router.post('/', employyeController.addEmployee);
router.get('/', verifyToken, employyeController.getAllEmployee);
router.get('/:empId', employyeController.getAllEmployee);

module.exports = router;
