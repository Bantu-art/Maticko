@echo off
echo 🚀 Setting up DIRT Stack (Django + Inertia + React + Tailwind)
echo ==============================================================

REM Backend setup
echo 📦 Setting up Django backend...
cd backend

REM Create virtual environment
python -m venv venv
call venv\Scripts\activate

REM Install Python dependencies
pip install -r requirements.txt

REM Run Django migrations
python manage.py migrate

echo ✅ Django backend setup complete!

REM Frontend setup
echo 📦 Setting up React frontend...
cd ..\frontend

REM Install Node.js dependencies
npm install

REM Build frontend assets
npm run build

echo ✅ React frontend setup complete!

cd ..

echo.
echo 🎉 DIRT Stack setup complete!
echo.
echo To start the development servers:
echo.
echo Backend (Django):
echo   cd backend
echo   venv\Scripts\activate
echo   python manage.py runserver
echo.
echo Frontend (React - for development):
echo   cd frontend
echo   npm run dev
echo.
echo Then visit: http://localhost:8000
echo.
echo Available pages:
echo   • Home: /
echo   • About: /about/
echo   • Services: /services/
echo   • Contact: /contact/
echo   • Blog: /blog/
echo   • Portfolio: /portfolio/
echo   • Team: /team/
echo   • Pricing: /pricing/

pause
