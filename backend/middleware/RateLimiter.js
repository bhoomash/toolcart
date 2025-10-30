const rateLimit = require('express-rate-limit');

// Rate limiter for authentication routes (login, signup, password reset)
const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: {
    error: 'Too many authentication attempts',
    message: 'Too many authentication attempts from this IP, please try again after 15 minutes.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  skipSuccessfulRequests: false,
  skipFailedRequests: false,
  // Handler for when rate limit is exceeded
  handler: (req, res) => {
    res.status(429).json({
      error: 'Too many authentication attempts',
      message: 'Too many authentication attempts from this IP, please try again after 15 minutes.',
      retryAfter: '15 minutes',
      timestamp: new Date().toISOString()
    });
  }
});

// Stricter rate limiter for password reset attempts
const passwordResetRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // Limit each IP to 3 password reset requests per hour
  message: {
    error: 'Too many password reset attempts',
    message: 'Too many password reset attempts from this IP, please try again after 1 hour.',
    retryAfter: '1 hour'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false,
  skipFailedRequests: false,
  handler: (req, res) => {
    res.status(429).json({
      error: 'Too many password reset attempts',
      message: 'Too many password reset attempts from this IP, please try again after 1 hour.',
      retryAfter: '1 hour',
      timestamp: new Date().toISOString()
    });
  }
});

// Rate limiter for OTP verification attempts
const otpRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 10, // Limit each IP to 10 OTP attempts per 10 minutes
  message: {
    error: 'Too many OTP verification attempts',
    message: 'Too many OTP verification attempts from this IP, please try again after 10 minutes.',
    retryAfter: '10 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // Don't count successful OTP verifications
  skipFailedRequests: false,
  handler: (req, res) => {
    res.status(429).json({
      error: 'Too many OTP verification attempts',
      message: 'Too many OTP verification attempts from this IP, please try again after 10 minutes.',
      retryAfter: '10 minutes',
      timestamp: new Date().toISOString()
    });
  }
});

// General API rate limiter for all routes
const generalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests',
    message: 'Too many requests from this IP, please try again after 15 minutes.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false,
  skipFailedRequests: false,
  handler: (req, res) => {
    res.status(429).json({
      error: 'Too many requests',
      message: 'Too many requests from this IP, please try again after 15 minutes.',
      retryAfter: '15 minutes',
      timestamp: new Date().toISOString()
    });
  }
});

// Create account rate limiter (stricter for signup)
const createAccountRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // Limit each IP to 3 account creation attempts per hour
  message: {
    error: 'Too many account creation attempts',
    message: 'Too many account creation attempts from this IP, please try again after 1 hour.',
    retryAfter: '1 hour'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false,
  skipFailedRequests: false,
  handler: (req, res) => {
    res.status(429).json({
      error: 'Too many account creation attempts',
      message: 'Too many account creation attempts from this IP, please try again after 1 hour.',
      retryAfter: '1 hour',
      timestamp: new Date().toISOString()
    });
  }
});

module.exports = {
  authRateLimiter,
  passwordResetRateLimiter,
  otpRateLimiter,
  generalRateLimiter,
  createAccountRateLimiter
};