#!/bin/bash

# TASKMETRY - Command Reference
# Copy and paste these commands as needed

echo "🚀 TASKMETRY COMMAND REFERENCE"
echo "=============================="
echo ""
echo "📦 INSTALLATION & SETUP"
echo "cd /home/ashad/Downloads/taskmetry"
echo "npm install"
echo ""

echo "🚀 DEVELOPMENT"
echo "npm run dev                          # Start dev server"
echo "npm run dev -- -p 3001              # Use different port"
echo ""

echo "🏗️ BUILDING"
echo "npm run build                        # Build for production"
echo "npm run start                        # Start production server"
echo ""

echo "🧹 CLEANUP"
echo "rm -rf node_modules .next           # Clean cache"
echo "npm install && npm run dev          # Fresh start"
echo ""

echo "📤 DEPLOYMENT"
echo "git add ."
echo "git commit -m 'Update'"
echo "git push origin main                 # Auto-deploy on Vercel"
echo ""

echo "📝 CODE EDITING"
echo "nano app/page.jsx                   # Edit homepage"
echo "nano app/booking/[serviceId]/page.jsx # Edit booking"
echo "nano app/globals.css                # Edit styles"
echo ""

echo "🔍 DEBUGGING"
echo "npm run build                        # Check build errors"
echo "npm run dev                          # Check runtime errors"
echo ""

echo "📊 FILE SIZES"
echo "du -sh node_modules                 # Check dependencies"
echo "du -sh .next                        # Check build output"
echo ""

echo "✅ COMPLETE!"
