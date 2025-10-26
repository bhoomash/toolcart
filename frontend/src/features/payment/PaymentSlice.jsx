import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createPaymentOrder, verifyPayment, handlePaymentFailure, getPaymentDetails } from "./PaymentApi";

const initialState = {
    status: "idle",
    paymentOrder: null,
    paymentVerification: null,
    paymentDetails: null,
    errors: null,
    successMessage: null
};

export const createPaymentOrderAsync = createAsyncThunk(
    "payment/createPaymentOrderAsync",
    async (orderData) => {
        const paymentOrder = await createPaymentOrder(orderData);
        return paymentOrder;
    }
);

export const verifyPaymentAsync = createAsyncThunk(
    "payment/verifyPaymentAsync",
    async (paymentData) => {
        const verification = await verifyPayment(paymentData);
        return verification;
    }
);

export const handlePaymentFailureAsync = createAsyncThunk(
    "payment/handlePaymentFailureAsync",
    async (failureData) => {
        const result = await handlePaymentFailure(failureData);
        return result;
    }
);

export const getPaymentDetailsAsync = createAsyncThunk(
    "payment/getPaymentDetailsAsync",
    async (paymentId) => {
        const details = await getPaymentDetails(paymentId);
        return details;
    }
);

const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
        clearPaymentErrors: (state) => {
            state.errors = null;
        },
        clearPaymentSuccessMessage: (state) => {
            state.successMessage = null;
        },
        clearPaymentOrder: (state) => {
            state.paymentOrder = null;
        },
        resetPaymentStatus: (state) => {
            state.status = "idle";
        }
    },
    extraReducers: (builder) => {
        builder
            // Create Payment Order
            .addCase(createPaymentOrderAsync.pending, (state) => {
                state.status = "pending";
                state.errors = null;
            })
            .addCase(createPaymentOrderAsync.fulfilled, (state, action) => {
                state.status = "fulfilled";
                state.paymentOrder = action.payload;
                state.errors = null;
            })
            .addCase(createPaymentOrderAsync.rejected, (state, action) => {
                state.status = "rejected";
                state.errors = action.error.message;
                state.paymentOrder = null;
            })
            // Verify Payment
            .addCase(verifyPaymentAsync.pending, (state) => {
                state.status = "pending";
                state.errors = null;
            })
            .addCase(verifyPaymentAsync.fulfilled, (state, action) => {
                state.status = "fulfilled";
                state.paymentVerification = action.payload;
                state.successMessage = "Payment verified successfully";
                state.errors = null;
            })
            .addCase(verifyPaymentAsync.rejected, (state, action) => {
                state.status = "rejected";
                state.errors = action.error.message;
                state.paymentVerification = null;
            })
            // Handle Payment Failure
            .addCase(handlePaymentFailureAsync.pending, (state) => {
                state.status = "pending";
            })
            .addCase(handlePaymentFailureAsync.fulfilled, (state, action) => {
                state.status = "fulfilled";
                state.successMessage = "Payment failure recorded";
            })
            .addCase(handlePaymentFailureAsync.rejected, (state, action) => {
                state.status = "rejected";
                state.errors = action.error.message;
            })
            // Get Payment Details
            .addCase(getPaymentDetailsAsync.pending, (state) => {
                state.status = "pending";
            })
            .addCase(getPaymentDetailsAsync.fulfilled, (state, action) => {
                state.status = "fulfilled";
                state.paymentDetails = action.payload;
            })
            .addCase(getPaymentDetailsAsync.rejected, (state, action) => {
                state.status = "rejected";
                state.errors = action.error.message;
            });
    }
});

// Selectors
export const selectPaymentStatus = (state) => state.PaymentSlice.status;
export const selectPaymentOrder = (state) => state.PaymentSlice.paymentOrder;
export const selectPaymentVerification = (state) => state.PaymentSlice.paymentVerification;
export const selectPaymentDetails = (state) => state.PaymentSlice.paymentDetails;
export const selectPaymentErrors = (state) => state.PaymentSlice.errors;
export const selectPaymentSuccessMessage = (state) => state.PaymentSlice.successMessage;

// Actions
export const { 
    clearPaymentErrors, 
    clearPaymentSuccessMessage, 
    clearPaymentOrder, 
    resetPaymentStatus 
} = paymentSlice.actions;

export default paymentSlice.reducer;