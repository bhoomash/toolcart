# 🔧 Environment Variables for Vercel Deployment

## 📋 Required Environment Variables

When deploying to Vercel, you need to set these environment variables in your Vercel dashboard:

### 🔐 **Essential Variables (Required)**

```bash
# Database Connection
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name

# JWT & Security
SECRET_KEY=your-super-secure-jwt-secret-key-here

# Email Configuration (for OTP and password reset)
EMAIL=your-email@gmail.com
PASSWORD=your-email-app-password

# Frontend Origin (Update after deployment)
ORIGIN=https://your-vercel-app-name.vercel.app

# Environment
NODE_ENV=production
PRODUCTION=true
```

### 💳 **Payment Integration (Razorpay)**

```bash
# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_or_live_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret_key
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
```

### ⏰ **Timing Configuration (Optional - has defaults)**

```bash
# Token Expiration Settings
LOGIN_TOKEN_EXPIRATION=7d
PASSWORD_RESET_TOKEN_EXPIRATION=1h
OTP_EXPIRATION_TIME=300000
COOKIE_EXPIRATION_DAYS=7
```

---

## 🚀 Complete Deployment Process

### Step 1: Commit to Git

```bash
# Add all changes
git add .

# Commit with descriptive message
git commit -m "feat: Deploy ready - all security issues fixed, Vercel config added"

# Push to GitHub
git push origin main
```

### Step 2: Deploy to Vercel

1. **Go to [vercel.com](https://vercel.com) and login**

2. **Import from GitHub:**
   - Click "New Project"
   - Select your GitHub repository: `toolcart`
   - Import the project

3. **Configure Build Settings:**
   - Framework Preset: `Create React App`
   - Root Directory: `./` (leave as default)
   - Build Command: Will be auto-detected from `vercel.json`
   - Output Directory: Will be auto-detected

4. **Set Environment Variables:**
   - Go to Project Settings → Environment Variables
   - Add all the variables listed above
   - Make sure to set them for "Production" environment

### Step 3: Update Domain References

After deployment, update these with your actual Vercel URL:

1. **Update ORIGIN environment variable:**
   ```
   ORIGIN=https://your-actual-vercel-domain.vercel.app
   ```

2. **Update CORS in backend if needed:**
   The CORS is already configured to accept Vercel domains automatically.

---

## 📧 Email Setup Guide

For email functionality (OTP, password reset), you need an App Password:

### Gmail Setup:
1. Enable 2-Factor Authentication on your Gmail account
2. Go to Google Account Settings → Security → App Passwords
3. Generate an App Password for "Mail"
4. Use this App Password (not your regular password) in the `PASSWORD` variable

---

## 💳 Razorpay Setup (If using payments)

1. **Create Razorpay Account:**
   - Go to [razorpay.com](https://razorpay.com)
   - Create account and get API keys

2. **Test Mode vs Live Mode:**
   - Use test keys for development
   - Switch to live keys for production

3. **Webhook Setup:**
   - In Razorpay dashboard, add webhook URL: `https://your-domain.vercel.app/api/payment/webhook`
   - Copy the webhook secret to `RAZORPAY_WEBHOOK_SECRET`

---

## ✅ Environment Variables Checklist

Copy this checklist when setting up Vercel:

- [ ] `MONGO_URI` - MongoDB connection string
- [ ] `SECRET_KEY` - JWT secret (generate a strong random string)
- [ ] `EMAIL` - Your email address
- [ ] `PASSWORD` - Email app password
- [ ] `ORIGIN` - Your Vercel domain
- [ ] `NODE_ENV=production`
- [ ] `PRODUCTION=true`
- [ ] `RAZORPAY_KEY_ID` (if using payments)
- [ ] `RAZORPAY_KEY_SECRET` (if using payments)
- [ ] `RAZORPAY_WEBHOOK_SECRET` (if using payments)

---

## 🔍 How to Find Your Values

### MongoDB URI:
```
mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database_name>
```

### JWT Secret Key:
Generate a strong random string (32+ characters):
```bash
# You can generate one online or use:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Email App Password:
- Gmail: Account Settings → Security → App Passwords
- Outlook: Account Security → Advanced Security → App Passwords

---

**Note:** Never commit actual environment variables to Git. The `.gitignore` file is already configured to exclude `.env` files.