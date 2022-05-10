const express = require('express');
const PaymentsController = require('../controllers/payments.controller');

const router = express.Router();

router.post('/createSetupIntent', PaymentsController.createSetupIntent);
router.post('/storePaymentMethod', PaymentsController.storePaymentMethod);

module.exports = router;
