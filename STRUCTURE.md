# Solar Directory - Project Structure

```
solar-directory/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Sample data seeder
├── public/                    # Static assets
├── src/
│   ├── app/
│   │   ├── api/               # API routes
│   │   │   └── listings/
│   │   │       └── route.ts   # Listings API endpoint
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Homepage
│   ├── components/
│   │   ├── Header.tsx         # Site header
│   │   ├── SearchBar.tsx      # Search component
│   │   ├── ListingCard.tsx    # Individual listing card
│   │   └── Filter.tsx         # Filter sidebar
│   └── lib/
│       ├── prisma.ts          # Prisma client
│       └── supabase.ts        # Supabase client
├── .env.example               # Environment variables template
├── .gitignore
├── DEPLOYMENT.md              # Deployment guide
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── README.md
├── setup.sh                   # Setup script (Linux/Mac)
├── setup.ps1                  # Setup script (Windows)
├── tailwind.config.ts
└── tsconfig.json
```

## Key Files Explained

### Configuration Files
- **package.json** - Dependencies and scripts
- **tsconfig.json** - TypeScript configuration
- **tailwind.config.ts** - Tailwind CSS customization (orange theme)
- **next.config.mjs** - Next.js configuration

### Database
- **prisma/schema.prisma** - Database models (Category, Location, Listing, User)
- **prisma/seed.ts** - Sample data for testing

### Core Application
- **src/app/layout.tsx** - Root layout with metadata
- **src/app/page.tsx** - Homepage with hero, stats, listings grid
- **src/app/api/listings/route.ts** - API for fetching filtered listings

### Components
- **Header** - Navigation bar with logo
- **SearchBar** - Search by name and location
- **ListingCard** - Individual business listing card
- **Filter** - Sidebar with category, location, and quick filters

### Utilities
- **src/lib/prisma.ts** - Singleton Prisma client
- **src/lib/supabase.ts** - Supabase clients (public and admin)

## Adding New Pages

To add new pages (like `/categories`, `/listing/[slug]`):

```bash
# Categories page
mkdir src/app/categories
# Create src/app/categories/page.tsx

# Listing detail page
mkdir src/app/listing/[slug]
# Create src/app/listing/[slug]/page.tsx
```

## Database Models

### Category
- Solar installer categories (residential, commercial, etc.)

### Location
- Cities and states across India

### Listing
- Business listings with:
  - Verification status
  - Featured badge
  - Ratings and reviews
  - Contact info

### User
- User accounts (for claiming listings, admin)

## Styling System

Uses Tailwind CSS with custom orange color palette:
- Primary: orange-500 (#f97316)
- Hover: orange-600 (#ea580c)
- Secondary shades: 50-900

All components follow the same design system with rounded corners, shadows, and consistent spacing.

## Environment Variables

Required in `.env`:
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase public key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase admin key
- `DATABASE_URL` - PostgreSQL connection string

---

Built with Next.js 15 + Prisma + Supabase
