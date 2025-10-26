# 🚨 URGENT: Update Vercel Environment Variables

## ❌ **Current CORS Issue**
Your app is showing CORS errors because:
1. Backend CORS is blocking frontend requests
2. Environment variables in Vercel need to be updated with actual domain

## ✅ **Immediate Fix Required**

### 1. **Update Environment Variables in Vercel Dashboard:**

Go to: **Vercel Dashboard → Your Project → Settings → Environment Variables**

**Update/Add these variables:**

```bash
# CRITICAL: Update this with your actual domain
ORIGIN=https://toolcart-gamma.vercel.app

# Database & Security (if not already set)
MONGO_URI=your-mongodb-connection-string
SECRET_KEY=your-jwt-secret-key
NODE_ENV=production
PRODUCTION=true

# Email configuration (if using)
EMAIL=your-email@gmail.com
PASSWORD=your-email-app-password

# Payment configuration (if using)
RAZORPAY_KEY_ID=your-razorpay-key
RAZORPAY_KEY_SECRET=your-razorpay-secret
```

### 2. **Redeploy After Setting Variables:**

After updating environment variables:
1. Go to **Deployments** tab in Vercel
2. Click **"Redeploy"** on the latest deployment
3. Or push a new commit to trigger automatic redeployment

## 🔧 **Code Changes Made**

I've updated the code with your actual domain:
- ✅ **Backend CORS**: Updated to include `https://toolcart-gamma.vercel.app`
- ✅ **Frontend API URL**: Updated to point to `https://toolcart-gamma.vercel.app/api`

## 📋 **Verification Steps**

After updating environment variables and redeploying:

1. **Check Network Tab**: No more CORS errors
2. **Test Authentication**: Login/signup should work
3. **Test API Calls**: All backend requests should succeed
4. **Check Console**: No more "Failed to load resource" errors

## ⚡ **Quick Action Required**

1. **Set `ORIGIN=https://toolcart-gamma.vercel.app` in Vercel**
2. **Redeploy the application**
3. **Test the application again**

The CORS errors will be resolved once the environment variable is updated! 🚀