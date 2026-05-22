#!/bin/bash

# Taskmetry Quick Setup Script
# This script sets up the project for development

echo "🚀 Taskmetry Setup"
echo "=================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install it first."
    exit 1
fi

echo "✓ Node.js $(node -v) found"
echo "✓ npm $(npm -v) found"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Installation failed"
    exit 1
fi

echo "✓ Dependencies installed"
echo ""

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local from template..."
    cp .env.example .env.local
    echo "✓ .env.local created (please update with your keys)"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env.local with your API keys"
echo "2. Run: npm run dev"
echo "3. Open: http://localhost:3000"
echo ""
echo "📚 Documentation:"
echo "  - README.md - Project overview"
echo "  - DEVELOPMENT.md - Development guide"
echo ""
