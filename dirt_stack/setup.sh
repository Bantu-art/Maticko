#!/bin/bash

echo "🚀 Setting up DIRT Stack (Django + Inertia + React + Tailwind)"
echo "=============================================================="

# Backend setup
echo "📦 Setting up Django backend..."
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Run Django migrations
python manage.py migrate

echo "✅ Django backend setup complete!"

# Frontend setup
echo "📦 Setting up React frontend..."
cd ../frontend

# Install Node.js dependencies
npm install

# Build frontend assets
npm run build

echo "✅ React frontend setup complete!"

cd ..

echo ""
echo "🎉 DIRT Stack setup complete!"
echo ""
echo "To start the development servers:"
echo ""
echo "Backend (Django):"
echo "  cd backend"
echo "  source venv/bin/activate"
echo "  python manage.py runserver"
echo ""
echo "Frontend (React - for development):"
echo "  cd frontend"
echo "  npm run dev"
echo ""
echo "Then visit: http://localhost:8000"
echo ""
echo "Available pages:"
echo "  • Home: /"
echo "  • About: /about/"
echo "  • Services: /services/"
echo "  • Contact: /contact/"
echo "  • Blog: /blog/"
echo "  • Portfolio: /portfolio/"
echo "  • Team: /team/"
echo "  • Pricing: /pricing/"
