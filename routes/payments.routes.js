const express = require('express');
const PaymentsController = require('../controllers/payments.controller');

const router = express.Router();

router.post('/setup', PaymentsController.setup);

module.exports = router;
