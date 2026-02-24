# 🌞 Solar Directory - Setup Quick Start

## What Was Created

A complete, modern directory website template for solar installers in India with:
- ✅ Next.js 15 + TypeScript
- ✅ Prisma ORM + Supabase (PostgreSQL)
- ✅ Tailwind CSS with orange solar theme
- ✅ Search & filter functionality
- ✅ Verified/featured listings system
- ✅ Sample data seeder
- ✅ Ready for deployment to Vercel
- ✅ Git repository initialized

## Project Location
```
C:\Users\frost\clawd\solar-directory\
```

## Next Steps

### 1. Create Supabase Project

Go to https://supabase.com and:
- Create a free account
- Click "New Project"
- Name it (e.g., "solar-directory")
- Choose "South Asia (Mumbai)" region for faster performance
- Set a strong password
- Wait ~2 minutes for setup

### 2. Get Supabase Credentials

Once project is ready:
- Go to **Settings → API**
- Copy these values:
  - **Project URL** (starts with https://)
  - **anon public** key
  - **service_role** key (scroll down)
- Also note your database password from project setup

### 3. Configure Environment Variables

Create `.env` file in `solar-directory/` folder:

```powershell
cd solar-directory
copy .env.example .env
```

Then edit `.env` and replace with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@[YOUR-PROJECT-ID].supabase.co:5432/postgres
```

### 4. Run Setup Script

**Windows (PowerShell):**
```powershell
.\setup.ps1
```

**This will:**
- Install all dependencies
- Generate Prisma client
- Push database schema to Supabase
- Seed sample data (6 listings, 5 categories, 5 locations)

### 5. Test Locally

```powershell
npm run dev
```

Visit: http://localhost:3000

You should see:
- Hero section with search bar
- Statistics (500+ listings, etc.)
- 6 sample solar company listings
- Filter sidebar

### 6. Deploy to Vercel

**Option A: Quick Deploy (Easiest)**
1. Go to https://vercel.com
2. Click "New Project"
3. Import from your local git (after pushing to GitHub)
4. Add environment variables from step 3
5. Deploy!

**Option B: Push to GitHub First**
```powershell
# Create GitHub repo
# Then push:
git remote add origin https://github.com/YOUR_USERNAME/solar-directory.git
git branch -M main
git push -u origin main
```

Then import in Vercel as above.

### 7. Add Custom Domain

After deployment in Vercel:
- Go to Project → Settings → Domains
- Add your domain (e.g., `solarindia.directory`)
- Update DNS records as shown

## File Structure

```
solar-directory/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Sample data
├── src/
│   ├── app/
│   │   ├── page.tsx       # Homepage
│   │   └── api/listings/  # Listings API
│   ├── components/        # UI components
│   └── lib/               # Prisma & Supabase clients
├── README.md              # Full documentation
├── DEPLOYMENT.md          # Deployment guide
├── STRUCTURE.md           # Project structure
└── package.json
```

## Features Implemented

✅ **Homepage** with hero, stats, and listings grid
✅ **Search** by business name
✅ **Filter** by category, location, verified, featured
✅ **Listing Cards** with ratings, reviews, contact info
✅ **Verified Badge** for trusted businesses
✅ **Featured Badge** for premium listings
✅ **API Endpoint** for dynamic filtering
✅ **Database Schema** ready for production
✅ **Sample Data** to test immediately

## What's Next (After Launch)

### Content
- [ ] Add more listings (aim for 100+ in first month)
- [ ] Write 20+ city-specific pages
- [ ] Create Hinglish guides (subsidy, cost calculator, etc.)

### SEO
- [ ] Add meta tags to all pages
- [ ] Submit sitemap to Google Search Console
- [ ] Build backlinks from solar-related sites

### Monetization
- [ ] Apply for Google AdSense
- [ ] Join affiliate programs (Amazon, Flipkart)
- [ ] Create pricing tiers for featured listings
- [ ] Add lead generation forms

### Features
- [ ] User authentication (claim listings)
- [ ] Review submission system
- [ ] Quote request form
- [ ] Admin dashboard

## Troubleshooting

**Error: "No listings found"**
- Run `npx prisma db seed` to populate sample data

**Database connection error**
- Check `.env` values are correct
- Verify Supabase project is active
- Test DATABASE_URL format

**Build fails**
- Delete `.next` folder and rebuild
- Run `npx prisma generate`

## Support

Docs: https://docs.clawd.bot
Clawdbot Community: https://discord.com/invite/clawd

---

Built by Nova & Aditya 🚀
