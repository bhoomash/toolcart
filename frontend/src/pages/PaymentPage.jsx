import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    Container,
    Paper,
    Typography,
    Box,
    Stepper,
    Step,
    StepLabel,
    Alert,
    CircularProgress,
    Button
} from '@mui/material';
import PaymentComponent from '../features/payment/components/PaymentComponent';
import { selectCartItems } from '../features/cart/CartSlice';
import { selectLoggedInUser } from '../features/auth/AuthSlice';
import { selectAddresses } from '../features/address/AddressSlice';
import { createOrderAsync } from '../features/order/OrderSlice';
import { Footer } from '../features/footer/Footer';
import { SHIPPING, TAXES } from '../constants';

const PaymentPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [activeStep, setActiveStep] = useState(0);
    
    const cartItems = useSelector(selectCartItems);
    const currentUser = useSelector(selectLoggedInUser);
    const addresses = useSelector(selectAddresses);
    
    // Calculate cart total from items
    const cartTotal = cartItems?.reduce((acc, item) => acc + (item.product.price * item.quantity), 0) || 0;
    const finalTotal = cartTotal + SHIPPING + TAXES;
    
    // Use first address as selected for now (should be passed from checkout)
    const selectedAddress = addresses?.[0];

    const steps = ['Review Order', 'Payment', 'Confirmation'];

    useEffect(() => {
        // Redirect if no items in cart
        if (!cartItems || cartItems.length === 0) {
            navigate('/cart');
            return;
        }
        
        // Redirect if user not logged in
        if (!currentUser) {
            navigate('/login');
            return;
        }
        
        // Redirect if no address selected
        if (!selectedAddress) {
            navigate('/checkout');
            return;
        }
    }, [cartItems, currentUser, selectedAddress, navigate]);

    const handlePaymentSuccess = (paymentData) => {
        setActiveStep(2);
        
        // Create order with payment details
        const order = {
            user: currentUser._id,
            item: cartItems,
            address: selectedAddress,
            paymentMode: 'razorpay',
            total: finalTotal,
            paymentStatus: 'paid',
            paymentId: paymentData.paymentId,
            razorpayOrderId: paymentData.razorpay_order_id,
            razorpaySignature: paymentData.razorpay_signature
        };
        
        dispatch(createOrderAsync(order));
        
        // Redirect to success page after a delay
        setTimeout(() => {
            navigate('/order-success');
        }, 2000);
    };

    const handlePaymentCancel = () => {
        navigate('/checkout');
    };

    const orderData = {
        amount: finalTotal * 100, // Razorpay expects amount in paise
        currency: 'INR',
        items: cartItems,
        address: selectedAddress,
        user: currentUser
    };

    if (!cartItems || cartItems.length === 0) {
        return (
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Alert severity="warning">
                    Your cart is empty. Please add items to proceed with payment.
                </Alert>
            </Container>
        );
    }

    return (
        <>
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h4" gutterBottom align="center">
                        Complete Your Payment
                    </Typography>
                    
                    <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    {activeStep === 0 && (
                        <Box>
                            <Typography variant="h6" gutterBottom>
                                Order Summary
                            </Typography>
                            <Box sx={{ mb: 3 }}>
                                {cartItems.map((item) => (
                                    <Box key={item._id} sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                                        <Typography>
                                            {item.product.title} × {item.quantity}
                                        </Typography>
                                        <Typography>
                                            ₹{(item.product.price * item.quantity).toFixed(2)}
                                        </Typography>
                                    </Box>
                                ))}
                                <Box sx={{ borderTop: 1, borderColor: 'divider', pt: 2, mt: 2 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography>Subtotal:</Typography>
                                        <Typography>₹{cartTotal.toFixed(2)}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography>Shipping:</Typography>
                                        <Typography>₹{SHIPPING}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography>Taxes:</Typography>
                                        <Typography>₹{TAXES}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                                        <Typography variant="h6">Total:</Typography>
                                        <Typography variant="h6">₹{finalTotal.toFixed(2)}</Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Button
                                variant="contained"
                                fullWidth
                                size="large"
                                onClick={() => setActiveStep(1)}
                            >
                                Proceed to Payment
                            </Button>
                        </Box>
                    )}

                    {activeStep === 1 && (
                        <PaymentComponent
                            orderData={orderData}
                            onPaymentSuccess={handlePaymentSuccess}
                            onPaymentCancel={handlePaymentCancel}
                            selectedAddress={selectedAddress}
                        />
                    )}

                    {activeStep === 2 && (
                        <Box textAlign="center">
                            <CircularProgress sx={{ mb: 2 }} />
                            <Typography variant="h6" gutterBottom>
                                Payment Successful!
                            </Typography>
                            <Typography color="text.secondary">
                                Processing your order... You will be redirected shortly.
                            </Typography>
                        </Box>
                    )}
                </Paper>
            </Container>
            <Footer />
        </>
    );
};

export default PaymentPage;