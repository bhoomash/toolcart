# 🚀 Quick Vercel Deployment Guide

## ✅ Code Successfully Committed to GitHub

Your code is now available at: `https://github.com/bhoomash/toolcart`

## 🔧 Vercel Deployment Steps

### 1. Import Project to Vercel
1. Go to [vercel.com](https://vercel.com) and login
2. Click "New Project"
3. Import from GitHub: `bhoomash/toolcart`
4. Select the repository and click "Import"

### 2. ⚙️ **CRITICAL: Set Environment Variables**

In Vercel Dashboard → Project Settings → Environment Variables, add:

#### **Required for Basic Functionality:**
```
MONGO_URI=mongodb+srv://your-connection-string
SECRET_KEY=your-jwt-secret-key
NODE_ENV=production
PRODUCTION=true
```

#### **Required for Email Features:**
```
EMAIL=your-email@gmail.com
PASSWORD=your-email-app-password
```

#### **Required for Payments (if using Razorpay):**
```
RAZORPAY_KEY_ID=rzp_test_xxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxx
RAZORPAY_WEBHOOK_SECRET=xxxxxxxxxxxxxxxx
```

### 3. 🌐 Update Domain After Deployment

After your first deployment, update this environment variable:
```
ORIGIN=https://your-actual-vercel-domain.vercel.app
```

## 📋 Environment Variables Checklist

**Essential (App won't work without these):**
- [ ] `MONGO_URI` - Your MongoDB Atlas connection string
- [ ] `SECRET_KEY` - JWT secret (generate random 32+ char string)
- [ ] `NODE_ENV=production`
- [ ] `PRODUCTION=true`

**For Email Functionality:**
- [ ] `EMAIL` - Your email address
- [ ] `PASSWORD` - Email app password (not regular password)

**For Payments:**
- [ ] `RAZORPAY_KEY_ID`
- [ ] `RAZORPAY_KEY_SECRET` 
- [ ] `RAZORPAY_WEBHOOK_SECRET`

**After First Deployment:**
- [ ] `ORIGIN` - Update with your actual Vercel URL

## 🎯 Post-Deployment Testing

Test these features after deployment:
1. **Homepage loads** ✅
2. **User registration/login** (requires EMAIL vars)
3. **Product browsing** ✅
4. **Cart functionality** ✅
5. **Payment processing** (requires Razorpay vars)

---

## 📞 Need Help?

- **Email Setup:** Check `VERCEL_ENVIRONMENT_SETUP.md` for detailed email configuration
- **Database Issues:** Verify MongoDB Atlas connection string format
- **Payment Issues:** Ensure Razorpay keys are correct and webhook URL is set

Your project is ready for deployment! 🚀