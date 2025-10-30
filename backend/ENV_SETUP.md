# 🔐 Environment Variables Setup Guide

## 📋 **Required Environment Variables**

Copy `.env.example` to `.env` and fill in your actual values:

```bash
cp .env.example .env
```

## 🔑 **How to Get Your Values**

### **MongoDB URI:**
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a cluster or use existing one
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<username>`, `<password>`, and `<database>` with your values

### **JWT Secret Key:**
Generate a secure random string (64+ characters):
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### **Email Configuration:**
For Gmail:
1. Enable 2-Factor Authentication
2. Go to Google Account Settings → Security → App Passwords
3. Generate an app password for "Mail"
4. Use your Gmail address and the generated app password

### **Razorpay Keys:**
1. Sign up at [Razorpay](https://razorpay.com/)
2. Go to Dashboard → Settings → API Keys
3. Generate Test/Live keys
4. Set up webhook endpoint and get webhook secret

## ⚠️ **Security Notes**

- **NEVER** commit `.env` files to version control
- Use different values for development, staging, and production
- Rotate secrets regularly
- Use environment variables in production deployment platforms

## 🚀 **Production Deployment**

For Vercel/production:
1. Set environment variables in your deployment platform
2. Set `PRODUCTION=true` and `NODE_ENV=production`
3. Update `ORIGIN` to your actual domain
4. Use production database and API keys