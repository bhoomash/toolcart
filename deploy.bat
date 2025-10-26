@echo off
REM ToolCart MERN E-commerce Deployment Script for Windows

echo 🚀 Starting deployment preparation...

REM Check if we're in the right directory
if not exist "vercel.json" (
    echo ❌ Error: vercel.json not found. Please run from the project root directory.
    exit /b 1
)

echo 📦 Building frontend...
cd frontend
call npm run build

if %errorlevel% neq 0 (
    echo ❌ Frontend build failed!
    exit /b 1
)

echo ✅ Frontend built successfully!
cd ..

echo 🔍 Checking backend dependencies...
cd backend
call npm install

if %errorlevel% neq 0 (
    echo ❌ Backend dependency installation failed!
    exit /b 1
)

echo ✅ Backend dependencies ready!
cd ..

echo 🎯 Ready for Vercel deployment!
echo.
echo Next steps:
echo 1. Update CORS origins in backend/index.js with your Vercel domain
echo 2. Update frontend/.env.production with your Vercel domain
echo 3. Set environment variables in Vercel dashboard
echo 4. Run: vercel --prod
echo.
echo 📖 See DEPLOYMENT.md for detailed instructions

pause