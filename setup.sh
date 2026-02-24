#!/bin/bash

echo "🌞 Solar Directory Setup Script"
echo "================================"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ .env file not found!"
    echo "Creating .env from .env.example..."
    cp .env.example .env
    echo "✅ .env file created."
    echo ""
    echo "⚠️  IMPORTANT: Update .env with your Supabase credentials:"
    echo "   - NEXT_PUBLIC_SUPABASE_URL"
    echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY"
    echo "   - SUPABASE_SERVICE_ROLE_KEY"
    echo "   - DATABASE_URL"
    echo ""
    read -p "Press Enter after updating .env file..."
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Push database schema
echo "🗄️  Setting up database..."
npx prisma db push

# Seed database
echo "🌱 Seeding sample data..."
npx prisma db seed

echo ""
echo "✅ Setup complete!"
echo ""
echo "🚀 Start development server:"
echo "   npm run dev"
echo ""
echo "🌐 Visit: http://localhost:3000"
