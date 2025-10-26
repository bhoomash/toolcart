const express = require('express');
const router = express.Router();
const { 
    createPaymentOrder, 
    verifyPayment, 
    handlePaymentFailure, 
    webhookHandler, 
    getPaymentDetails 
} = require('../controllers/Payment');
const { verifyToken } = require('../middleware/VerifyToken');

// Create Razorpay order
router.post('/create-order', verifyToken, createPaymentOrder);

// Verify payment
router.post('/verify', verifyToken, verifyPayment);

// Handle payment failure
router.post('/failure', verifyToken, handlePaymentFailure);

// Webhook endpoint (no auth required)
router.post('/webhook', webhookHandler);

// Get payment details
router.get('/details/:paymentId', verifyToken, getPaymentDetails);

module.exports = router;