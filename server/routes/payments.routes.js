const express = require('express');
const PaymentsController = require('../controllers/payments.controller');
const { authenticateUser } = require('../middleware/auth');

const router = express.Router();

router.post('/createSetupIntent', authenticateUser, PaymentsController.createSetupIntent);
router.post('/storePaymentMethod', authenticateUser, PaymentsController.storePaymentMethod);

module.exports = router;
