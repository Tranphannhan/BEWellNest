const express = require('express');
const router = express.Router();
const momoController = require('../Controller/momo');
const { kiemTraVaiTroThuNgan } = require('../Middleware/authenticate');

router.post('/create-payment',kiemTraVaiTroThuNgan, momoController.createPayment);
router.post('/callback',kiemTraVaiTroThuNgan, momoController.handleCallback); // IPN từ Momo gửi về

module.exports = router;
