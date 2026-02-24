# Solar Directory India 🌞

A modern, fast directory website for solar panel installers and service providers in India.

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Prisma** - ORM for database operations
- **Supabase** - PostgreSQL database & authentication
- **Vercel** - Hosting platform

## Features

- 🔍 Search and filter listings by category and location
- ⭐ Verified and featured listings with ratings
- 📍 Location-based search (city/state)
- 📱 Fully responsive design
- 🎨 Modern, clean UI with orange solar theme
- 🔐 Admin dashboard for managing listings
- 💰 4 revenue streams ready (ads, affiliate, paid listings, sponsored)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Git account
- Supabase account (free tier works)
- Vercel account

### Setup Instructions

1. **Clone and Install Dependencies**
```bash
cd solar-directory
npm install
```

2. **Set Up Supabase Database**

   a. Go to [supabase.com](https://supabase.com) and create a new project
   
   b. Get your credentials:
   - Project URL
   - anon public key
   - service_role secret (for admin operations)

   c. Create a `.env` file in the root:
```bash
cp .env.example .env
```

   d. Update `.env` with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
DATABASE_URL=postgresql://postgres:[password]@[project-id].supabase.co:5432/postgres
```

3. **Initialize Database with Prisma**

```bash
npx prisma generate
npx prisma db push
```

4. **Seed Sample Data** (Optional - creates sample categories, locations, and listings)
```bash
npx prisma db seed
```

5. **Run Development Server**
```bash
npm run dev
```

Visit `http://localhost:3000` to see your directory!

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Add environment variables from your `.env` file
4. Click Deploy!

### Add Custom Domain

1. In Vercel project settings → Domains → Add
2. Enter your domain (e.g., `solarindia.directory`)
3. Update DNS records as shown in Vercel

## Database Schema

- **Categories** - Listing categories (installers, dealers, etc.)
- **Locations** - Cities and states
- **Listings** - Business listings with verification, ratings, featured status
- **Users** - User accounts for claiming listings

## Monetization Setup

### 1. Google AdSense
- Apply at [adsense.google.com](https://adsense.google.com)
- Add ad units to listing pages, homepage, category pages

### 2. Affiliate Links
- Join Amazon Associates, Flipkart Affiliate
- Add affiliate links to product pages (solar panels, inverters)

### 3. Paid Listings
- Create pricing plans (₹500-2000/month)
- Add "Premium" badge and priority ranking for paid listings
- Integrate Razorpay/PayU for payments

### 4. Lead Generation
- Contact forms that send leads to businesses
- Charge per qualified lead (₹50-100)

## Future Enhancements

- [ ] User authentication with Supabase Auth
- [ ] Business dashboard for managing listings
- [ ] Review and rating system
- [ ] Quote request form
- [ ] Admin panel for approval workflow
- [ ] Blog section for SEO content
- [ ] Multi-language support (Hindi)

## Support

For issues or questions, check [Clawdbot docs](https://docs.clawd.bot)

---

Built with ❤️ by Nova & Aditya
