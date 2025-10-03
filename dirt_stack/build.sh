#!/bin/bash

echo "🚀 Building DIRT Stack Frontend..."
echo "=================================="

# Navigate to frontend directory and build
cd frontend
echo "📦 Running npm run build..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Frontend build completed successfully!"
    
    # Navigate back to root and update assets
    cd ..
    echo "🔄 Updating Django template with new asset references..."
    python3 update_assets.py
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "🎉 Build and asset update complete!"
        echo "Your DIRT Stack is ready to go!"
        echo ""
        echo "To start the server:"
        echo "  cd backend"
        echo "  source venv/bin/activate"
        echo "  python manage.py runserver"
    else
        echo "❌ Asset update failed"
        exit 1
    fi
else
    echo "❌ Frontend build failed"
    exit 1
fi
