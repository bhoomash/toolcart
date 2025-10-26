const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/Order');

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay order
exports.createPaymentOrder = async (req, res) => {
    try {
        const { amount, currency = 'INR', orderId } = req.body;
        
        console.log('Payment order request:', { amount, currency, orderId });

        const options = {
            amount: amount, // amount should already be in paise from frontend
            currency,
            receipt: `order_rcptid_${orderId}`,
            payment_capture: 1, // Auto capture payment
        };

        const razorpayOrder = await razorpay.orders.create(options);

        res.status(200).json({
            id: razorpayOrder.id,
            currency: razorpayOrder.currency,
            amount: razorpayOrder.amount,
            orderId: orderId
        });
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).json({ 
            message: 'Failed to create payment order',
            error: error.message 
        });
    }
};

// Verify payment signature
exports.verifyPayment = async (req, res) => {
    try {
        const { 
            razorpay_order_id, 
            razorpay_payment_id, 
            razorpay_signature,
            orderId 
        } = req.body;

        // Create signature
        const body = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            // Update order status to paid
            const order = await Order.findByIdAndUpdate(
                orderId,
                {
                    paymentStatus: 'paid',
                    paymentId: razorpay_payment_id,
                    razorpayOrderId: razorpay_order_id,
                    razorpaySignature: razorpay_signature,
                    paymentMethod: 'razorpay',
                    paidAt: new Date()
                },
                { new: true }
            );

            res.status(200).json({
                success: true,
                message: 'Payment verified successfully',
                order: order
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Payment verification failed'
            });
        }
    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({
            success: false,
            message: 'Payment verification failed',
            error: error.message
        });
    }
};

// Handle payment failure
exports.handlePaymentFailure = async (req, res) => {
    try {
        const { orderId, error } = req.body;

        // Update order status to failed
        await Order.findByIdAndUpdate(
            orderId,
            {
                paymentStatus: 'failed',
                paymentError: error
            }
        );

        res.status(200).json({
            success: true,
            message: 'Payment failure recorded'
        });
    } catch (error) {
        console.error('Error handling payment failure:', error);
        res.status(500).json({
            message: 'Failed to record payment failure',
            error: error.message
        });
    }
};

// Webhook handler for Razorpay events
exports.webhookHandler = async (req, res) => {
    try {
        const signature = req.headers['x-razorpay-signature'];
        const body = JSON.stringify(req.body);

        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET)
            .update(body)
            .digest('hex');

        if (signature === expectedSignature) {
            const event = req.body.event;
            const paymentEntity = req.body.payload.payment.entity;

            switch (event) {
                case 'payment.captured':
                    // Handle successful payment
                    console.log('Payment captured:', paymentEntity.id);
                    break;
                case 'payment.failed':
                    // Handle failed payment
                    console.log('Payment failed:', paymentEntity.id);
                    break;
                default:
                    console.log('Unhandled event:', event);
            }

            res.status(200).json({ status: 'ok' });
        } else {
            res.status(400).json({ error: 'Invalid signature' });
        }
    } catch (error) {
        console.error('Webhook error:', error);
        res.status(500).json({ error: 'Webhook handler failed' });
    }
};

// Get payment details
exports.getPaymentDetails = async (req, res) => {
    try {
        const { paymentId } = req.params;
        
        const payment = await razorpay.payments.fetch(paymentId);
        
        res.status(200).json({
            success: true,
            payment: payment
        });
    } catch (error) {
        console.error('Error fetching payment details:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch payment details',
            error: error.message
        });
    }
};