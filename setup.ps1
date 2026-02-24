# Solar Directory Setup Script (Windows PowerShell)

Write-Host "🌞 Solar Directory Setup Script" -ForegroundColor Yellow
Write-Host "================================" -ForegroundColor Yellow
Write-Host ""

# Check if .env exists
if (-not (Test-Path .env)) {
    Write-Host "❌ .env file not found!" -ForegroundColor Red
    Write-Host "Creating .env from .env.example..." -ForegroundColor Yellow
    Copy-Item .env.example .env
    Write-Host "✅ .env file created." -ForegroundColor Green
    Write-Host ""
    Write-Host "⚠️  IMPORTANT: Update .env with your Supabase credentials:" -ForegroundColor Yellow
    Write-Host "   - NEXT_PUBLIC_SUPABASE_URL" -ForegroundColor White
    Write-Host "   - NEXT_PUBLIC_SUPABASE_ANON_KEY" -ForegroundColor White
    Write-Host "   - SUPABASE_SERVICE_ROLE_KEY" -ForegroundColor White
    Write-Host "   - DATABASE_URL" -ForegroundColor White
    Write-Host ""
    $continue = Read-Host "Press Enter after updating .env file..."
}

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

# Generate Prisma client
Write-Host "🔧 Generating Prisma client..." -ForegroundColor Yellow
npx prisma generate

# Push database schema
Write-Host "🗄️  Setting up database..." -ForegroundColor Yellow
npx prisma db push

# Seed database
Write-Host "🌱 Seeding sample data..." -ForegroundColor Yellow
npx prisma db seed

Write-Host ""
Write-Host "✅ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 Start development server:" -ForegroundColor Yellow
Write-Host "   npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "🌐 Visit: http://localhost:3000" -ForegroundColor Cyan
