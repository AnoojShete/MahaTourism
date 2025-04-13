const express = require('express');
const router = express.Router();
const { sendOTP, verifyOTP } = require('../controllers/authController');

// Route to send OTP
router.post('/send-confirmation-code', sendOTP);
// Route to verify OTP
router.post('/verify-confirmation-code', verifyOTP);

module.exports = router;
