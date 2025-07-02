const express = require('express');
const router = express.Router();
const momoController = require('../Controller/momo');

router.post('/create-payment', momoController.createPayment);
router.post('/callback', momoController.handleCallback); // IPN từ Momo gửi về

module.exports = router;
