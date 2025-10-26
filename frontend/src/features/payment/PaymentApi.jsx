import { axiosi } from "../../config/axios";

export const createPaymentOrder = async (orderData) => {
    try {
        const res = await axiosi.post('/payments/create-order', orderData);
        return res.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const verifyPayment = async (paymentData) => {
    try {
        const res = await axiosi.post('/payments/verify', paymentData);
        return res.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const handlePaymentFailure = async (failureData) => {
    try {
        const res = await axiosi.post('/payments/failure', failureData);
        return res.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getPaymentDetails = async (paymentId) => {
    try {
        const res = await axiosi.get(`/payments/details/${paymentId}`);
        return res.data;
    } catch (error) {
        throw error.response.data;
    }
};