const express = require('express');
const AuthController = require('../controllers/auth.controller');
const {authenticateUser} = require('../middleware/auth');

const router = express.Router();

router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.get('/verify', authenticateUser, AuthController.verify)

module.exports = router;
