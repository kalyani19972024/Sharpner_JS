
const express = require('express');
const router = express.Router();
const passwordControllers = require('../controllers/passwordController');
console.log('🔍 passwordControllers:', passwordControllers);

router.post('/forgotpassword', passwordControllers.forgotPassword);

module.exports = router;
