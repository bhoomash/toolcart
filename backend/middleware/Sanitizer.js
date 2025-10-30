const mongoSanitize = require('express-mongo-sanitize');

// Custom NoSQL injection sanitizer
const sanitizeInput = (req, res, next) => {
    // Sanitize req.body, req.query and req.params
    mongoSanitize.sanitize(req.body);
    mongoSanitize.sanitize(req.query);
    mongoSanitize.sanitize(req.params);
    
    // Additional custom sanitization
    const sanitizeObject = (obj) => {
        if (obj && typeof obj === 'object') {
            Object.keys(obj).forEach(key => {
                if (typeof obj[key] === 'string') {
                    // Remove potential NoSQL operators
                    obj[key] = obj[key].replace(/[${}]/g, '');
                    
                    // Basic XSS prevention
                    obj[key] = obj[key].replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
                } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                    sanitizeObject(obj[key]);
                }
            });
        }
    };

    sanitizeObject(req.body);
    sanitizeObject(req.query);
    sanitizeObject(req.params);

    next();
};

module.exports = { sanitizeInput };