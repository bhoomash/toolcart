const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const { 
    createPaymentOrder, 
    verifyPayment, 
    handlePaymentFailure, 
    webhookHandler, 
    getPaymentDetails 
} = require('../controllers/Payment');
const { verifyToken } = require('../middleware/VerifyToken');
const { handleValidationErrors } = require('../middleware/ValidationMiddleware');

// Payment validation rules
const paymentValidators = {
    createOrder: [
        body('amount')
            .isNumeric()
            .custom(value => value > 0)
            .withMessage('Amount must be a positive number'),
        body('currency')
            .optional()
            .isIn(['INR', 'USD'])
            .withMessage('Currency must be INR or USD'),
        body('receipt')
            .optional()
            .isLength({ max: 40 })
            .withMessage('Receipt must not exceed 40 characters'),
        handleValidationErrors
    ],
    
    verifyPayment: [
        body('razorpay_order_id')
            .notEmpty()
            .withMessage('Razorpay order ID is required'),
        body('razorpay_payment_id')
            .notEmpty()
            .withMessage('Razorpay payment ID is required'),
        body('razorpay_signature')
            .notEmpty()
            .withMessage('Razorpay signature is required'),
        handleValidationErrors
    ],
    
    paymentFailure: [
        body('error')
            .notEmpty()
            .withMessage('Error details are required'),
        handleValidationErrors
    ],
    
    getPaymentDetails: [
        param('paymentId')
            .notEmpty()
            .withMessage('Payment ID is required'),
        handleValidationErrors
    ]
};

// Create Razorpay order
router.post('/create-order', verifyToken, paymentValidators.createOrder, createPaymentOrder);

// Verify payment
router.post('/verify', verifyToken, paymentValidators.verifyPayment, verifyPayment);

// Handle payment failure
router.post('/failure', verifyToken, paymentValidators.paymentFailure, handlePaymentFailure);

// Webhook endpoint (no auth required)
router.post('/webhook', webhookHandler);

// Get payment details
router.get('/details/:paymentId', verifyToken, paymentValidators.getPaymentDetails, getPaymentDetails);

module.exports = router;