require("dotenv").config()
const express=require('express')
const cors=require('cors')
const morgan=require("morgan")
const helmet=require("helmet")
const cookieParser=require("cookie-parser")
const authRoutes=require("./routes/Auth")
const productRoutes=require("./routes/Product")
const orderRoutes=require("./routes/Order")
const cartRoutes=require("./routes/Cart")
const brandRoutes=require("./routes/Brand")
const categoryRoutes=require("./routes/Category")
const userRoutes=require("./routes/User")
const addressRoutes=require('./routes/Address')
const reviewRoutes=require("./routes/Review")
const wishlistRoutes=require("./routes/Wishlist")
const paymentRoutes=require("./routes/Payment")
const { connectToDB } = require("./database/db")
const { 
    errorHandler, 
    notFoundHandler, 
    handleUnhandledRejection, 
    handleUncaughtException 
} = require('./middleware/ErrorHandler')


// server init
const server=express()

// Set up global error handlers
handleUnhandledRejection()
handleUncaughtException()

// database connection
connectToDB()


// middlewares
const allowedOrigins = [
    process.env.ORIGIN,
    'https://toolcart-gamma.vercel.app',
    'https://your-vercel-app.vercel.app', // Keep as fallback
    'http://localhost:3000',
    'http://localhost:3001'
];

server.use(cors({
    origin: function (origin, callback) {
        // Only log CORS origin in development environment
        if (process.env.NODE_ENV === 'development') {
            console.log('CORS Origin:', origin);
        }
        
        // Allow requests with no origin (mobile apps, etc.)
        if (!origin) return callback(null, true);
        
        // Allow all Vercel deployments
        if (origin.includes('vercel.app')) {
            return callback(null, true);
        }
        
        // Allow localhost for development
        if (origin.includes('localhost')) {
            return callback(null, true);
        }
        
        // Check allowed origins list
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        
        // Only log blocked origins in development environment
        if (process.env.NODE_ENV === 'development') {
            console.log('CORS blocked origin:', origin);
        }
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    exposedHeaders: ['X-Total-Count'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
}));

server.use(express.json())
server.use(cookieParser())
server.use(morgan("tiny"))

// Apply security headers
server.use(helmet({
    crossOriginEmbedderPolicy: false, // Allow embedding for development
    contentSecurityPolicy: false, // Disable CSP for development (customize for production)
}))

// Security middlewares
const { sanitizeInput } = require('./middleware/Sanitizer')
const { generalRateLimiter } = require('./middleware/RateLimiter')

// Apply general rate limiting to all routes
server.use(generalRateLimiter)

// Apply input sanitization
server.use(sanitizeInput)

// Health check endpoint for monitoring
server.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// routeMiddleware
server.use("/auth",authRoutes)
server.use("/users",userRoutes)
server.use("/products",productRoutes)
server.use("/orders",orderRoutes)
server.use("/cart",cartRoutes)
server.use("/brands",brandRoutes)
server.use("/categories",categoryRoutes)
server.use("/address",addressRoutes)
server.use("/reviews",reviewRoutes)
server.use("/wishlist",wishlistRoutes)
server.use("/payments",paymentRoutes)

// 404 handler for undefined routes
server.use(notFoundHandler)

// Global error handling middleware (must be last)
server.use(errorHandler)

server.get("/",(req,res)=>{
    res.status(200).json({message:'running'})
})

const PORT = process.env.PORT || 8001;
server.listen(PORT,()=>{
    console.log(`server [STARTED] ~ http://localhost:${PORT}`);
})