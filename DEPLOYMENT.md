# ToolCart MERN E-commerce - Vercel Deployment Guide

## 🚀 Deployment Steps

### 1. **Prepare Environment Variables**

Create these environment variables in your Vercel project dashboard:

#### Backend Environment Variables:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
ORIGIN=https://your-vercel-app.vercel.app
EMAIL=your-email@gmail.com
PASSWORD=your-email-app-password
LOGIN_TOKEN_EXPIRATION=30d
OTP_EXPIRATION_TIME=120000
PASSWORD_RESET_TOKEN_EXPIRATION=2m
COOKIE_EXPIRATION_DAYS=30
SECRET_KEY=your-super-secure-jwt-secret-key-here
RAZORPAY_KEY_ID=rzp_test_or_live_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret_key
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
PRODUCTION=true
NODE_ENV=production
```

### 2. **Update Frontend Environment**

Update `frontend/.env.production` with your actual Vercel domain:
```
REACT_APP_BASE_URL=https://your-vercel-app.vercel.app/api
GENERATE_SOURCEMAP=false
```

### 3. **Update CORS Configuration**

In `backend/index.js`, update the allowed origins with your actual Vercel domain:
```javascript
const allowedOrigins = [
    process.env.ORIGIN,
    'https://your-actual-vercel-domain.vercel.app', // ← Update this
    'http://localhost:3000'
];
```

### 4. **Deploy to Vercel**

#### Option A: Using Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from root directory
vercel --prod
```

#### Option B: Using GitHub Integration
1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically

### 5. **Project Structure**
```
mern-ecommerce/
├── vercel.json          # Root deployment config
├── frontend/            # React app
│   ├── package.json
│   ├── .env.production
│   └── build/          # Generated after build
├── backend/             # Express API
│   ├── index.js
│   ├── package.json
│   └── vercel.json     # Backend specific config
└── README.md
```

### 6. **Important Notes**

- **MongoDB**: Ensure your MongoDB Atlas cluster allows connections from anywhere (0.0.0.0/0) for Vercel
- **Cookies**: Cross-origin cookies work with proper CORS configuration
- **API Routes**: All backend routes will be accessible at `/api/*`
- **Environment**: Make sure to set `PRODUCTION=true` in Vercel environment

### 7. **Post-Deployment Checklist**

✅ Frontend loads correctly  
✅ API endpoints respond (test `/api/health` if you add one)  
✅ Database connection works  
✅ Authentication flow works  
✅ Payment integration works  
✅ File uploads work (if any)  

### 8. **Troubleshooting**

- **CORS Errors**: Check allowed origins in backend
- **API 404**: Ensure routes start with `/api/`
- **Database Connection**: Verify MongoDB URI and network access
- **Environment Variables**: Double-check all required vars are set

## 🔧 Additional Optimizations

### Add Health Check Endpoint
Add this to your backend for monitoring:

```javascript
// In backend/index.js
server.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV 
    });
});
```

### Performance
- Frontend builds with optimizations enabled
- Backend runs as serverless functions (fast cold starts)
- Static assets served from Vercel's CDN

## 📞 Support

If you encounter issues during deployment, check:
1. Vercel deployment logs
2. Browser developer console
3. Network tab for failed requests
4. MongoDB Atlas logs