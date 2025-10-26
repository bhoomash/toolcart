#!/bin/bash

# ToolCart MERN E-commerce Deployment Script

echo "🚀 Starting deployment preparation..."

# Check if we're in the right directory
if [ ! -f "vercel.json" ]; then
    echo "❌ Error: vercel.json not found. Please run from the project root directory."
    exit 1
fi

echo "📦 Building frontend..."
cd frontend
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Frontend build failed!"
    exit 1
fi

echo "✅ Frontend built successfully!"
cd ..

echo "🔍 Checking backend dependencies..."
cd backend
npm install

if [ $? -ne 0 ]; then
    echo "❌ Backend dependency installation failed!"
    exit 1
fi

echo "✅ Backend dependencies ready!"
cd ..

echo "🎯 Ready for Vercel deployment!"
echo ""
echo "Next steps:"
echo "1. Update CORS origins in backend/index.js with your Vercel domain"
echo "2. Update frontend/.env.production with your Vercel domain"
echo "3. Set environment variables in Vercel dashboard"
echo "4. Run: vercel --prod"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions"