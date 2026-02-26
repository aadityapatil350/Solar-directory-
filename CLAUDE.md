# CLAUDE.md — GoSolarIndex Project Brain

> This file is loaded into Claude's context every session. Keep it updated as the project evolves.

---

## Project Identity

- **Name:** GoSolarIndex (gosolarindex.in)
- **Type:** Indian B2B Solar Directory & Lead Generation Platform
- **Goal:** Make money via paid listings, lead sales, and ads
- **Stack:** Next.js 15 + TypeScript + Prisma + Supabase (PostgreSQL) + Tailwind CSS
- **Deployment:** Vercel (region: hkg1)
- **Database:** Supabase PostgreSQL (`db.rwkopscocilrmkqijjxa.supabase.co`)

---

## Tech Stack Quick Reference

| Layer | Tech |
|-------|------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| ORM | Prisma 6 |
| Database | Supabase PostgreSQL |
| Styling | Tailwind CSS 3 (orange theme) |
| Icons | Lucide React |
| Deploy | Vercel |

---

## Database Models (Prisma)

1. **Category** — Solar service categories (5 types)
2. **Location** — Indian cities with slug (10 cities in seed)
3. **Listing** — Core business listings (89 in seed)
4. **User** — User accounts (role: user/installer/admin)
5. **Installer** — Extended installer profile with subscription
6. **Lead** — Customer enquiries
7. **LeadDelivery** — Junction: lead → installer assignments

**Admin email:** `aadityabiz350@gmail.com`

---

## All Routes

### Public Pages
| Route | File | Notes |
|-------|------|-------|
| `/` | `src/app/page.tsx` | Homepage — client component |
| `/categories` | `src/app/categories/page.tsx` | Browse categories |
| `/locations` | `src/app/locations/page.tsx` | Browse locations |
| `/about` | `src/app/about/page.tsx` | About page |
| `/listing/[slug]` | `src/app/listing/[slug]/page.tsx` | Listing detail |
| `/[city]` | `src/app/[city]/page.tsx` | Dynamic city pages (10 cities) |
| `/installers/signup` | `src/app/installers/signup/page.tsx` | 4-step signup form |
| `/admin` | `src/app/admin/page.tsx` | Admin dashboard |

### API Routes
| Route | Methods | Auth | Notes |
|-------|---------|------|-------|
| `/api/listings` | GET | None | Filtered listings |
| `/api/categories` | GET | None | All categories |
| `/api/locations` | GET | None | All locations |
| `/api/leads` | POST, GET | None | Lead creation/fetch |
| `/api/installers/signup` | POST | None | Register installer |
| `/api/admin/listings` | GET,POST,PATCH,DELETE | Bearer | Admin CRUD |
| `/api/admin/leads` | GET,PATCH,DELETE | Bearer | Admin CRUD |
| `/api/admin/installers` | GET,POST | Bearer | Admin verify |

### SEO Routes
- `/sitemap.xml` — Dynamic sitemap
- `/robots.txt` — Allows all except /admin

---

## Components

| Component | File | Purpose |
|-----------|------|---------|
| Header | `src/components/Header.tsx` | Nav with logo |
| SearchBar | `src/components/SearchBar.tsx` | Query + location search |
| ListingCard | `src/components/ListingCard.tsx` | Listing grid card |
| Filter | `src/components/Filter.tsx` | Category/location filter |
| LeadForm | `src/components/LeadForm.tsx` | Lead capture form |

---

## Monetization Plan

1. **Paid Listings** — Featured placement ₹500-2000/month
2. **Lead Sales** — Pay-per-lead to installers (₹50-100 each)
3. **Google AdSense** — Display ads on listing pages
4. **Affiliate** — Amazon/Flipkart solar products

---

## What's DONE ✅

### Core Directory
- Homepage: hero, search, filters (working), pagination (12/page), stats, listings grid, lead form
- Category browse + individual category pages (/categories/[slug])
- Location browse + 10 dynamic city pages + state pages (/states/[slug])
- Listing detail pages with LocalBusiness Schema.org JSON-LD
- 89 seed listings across 10 cities, 5 categories

### Installer System
- 4-step signup form + API (city/state auto-creates location)
- JWT session auth (jose) with bcrypt password hashing on login
- /installers/login — clean login page
- /installers/dashboard — full dashboard: Overview, Leads, My Listing, Subscription tabs
- Middleware protects /installers/dashboard
- Lead reveal workflow (click to unlock contact details)

### Lead Distribution
- Leads auto-assigned to up to 3 verified installers in same city on submission
- LeadDelivery records created, lead marked 'assigned'
- Installers see new lead badge count, can update status

### Payments (Razorpay)
- /api/payment/create-order + /api/payment/verify
- PaymentButton component loads Razorpay SDK dynamically
- On successful payment: subscription upgraded, listing promoted to featured

### Admin
- Admin dashboard (Leads, Listings, Installers tabs)
- Admin CRUD APIs with Bearer token auth

### SEO
- Dynamic sitemap + robots.txt
- WebSite + Organization schema in root layout
- LocalBusiness + BreadcrumbList on listing pages
- /blog — index with 8 SEO articles targeting Indian solar keywords
- /blog/[slug] — Article schema + related posts + CTA
- /contact, /pricing (with 3-tier plans + FAQ)

### Navigation & UX
- Mobile hamburger menu
- GoSolarIndex branding throughout
- Full Tailwind orange theme + responsive design

---

## What's STILL TODO ❌

### Revenue (need Razorpay keys in production)
- [ ] Add RAZORPAY_KEY_ID + RAZORPAY_KEY_SECRET to Vercel env vars
- [ ] Test Razorpay checkout end-to-end
- [ ] WhatsApp/SMS notification to installer when new lead arrives

### Auth & Security
- [ ] Admin middleware (currently only API-level Bearer token)
- [ ] Forgot password flow
- [ ] Email verification on signup

### SEO (ongoing)
- [ ] Add 10+ more blog articles
- [ ] Google Analytics (NEXT_PUBLIC_GA_ID env var)
- [ ] Google Search Console verification (GOOGLE_SITE_VERIFICATION env var)
- [ ] Image OG tags per page
- [ ] FAQ Schema on pricing + blog pages
- [ ] More state pages (currently 10 states, India has 28)

### Growth
- [ ] Review/rating submission system
- [ ] Installer profile edit from dashboard
- [ ] More listings (currently 89 — aim for 500+)
- [ ] Google AdSense integration

---

## Seed Data Summary

- **Cities:** Mumbai, Delhi, Bangalore, Pune, Hyderabad, Chennai, Kolkata, Ahmedabad, Jaipur, Lucknow
- **Categories:** Residential Installers, Commercial Installers, Solar Panel Dealers, Inverter Specialists, AMC & Maintenance
- **Listings:** 89 total

---

## Environment Variables

```
DATABASE_URL=postgresql://...@supabase...
NEXT_PUBLIC_SUPABASE_URL=https://rwkopscocilrmkqijjxa.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Phase Roadmap

### Phase 1 — Fix & Stabilize (CURRENT)
- Fix security issues (password hashing)
- Fix broken UI (filter checkboxes, pagination)
- Add missing core pages (contact, pricing, category detail pages)
- Proper admin auth

### Phase 2 — Revenue Features
- Payment integration (Razorpay)
- Installer dashboard with lead management
- Lead purchase workflow

### Phase 3 — SEO Domination
- Blog system with 20+ articles
- State + district level pages
- Structured data (LocalBusiness, FAQ, Article)
- Google Analytics + Search Console
- Core Web Vitals audit

### Phase 4 — Growth
- Mobile app (React Native)
- SMS/WhatsApp lead notifications
- Installer verification with Aadhaar API
- Review system with moderation

---

## Development Commands

```bash
npm run dev          # Start dev server
npm run build        # Build (prisma generate + next build)
npx prisma studio    # Browse DB
npx tsx prisma/seed-comprehensive.ts  # Seed data
```

---

## Key Files to Know

- `prisma/schema.prisma` — Database schema (source of truth)
- `src/lib/prisma.ts` — Prisma singleton client
- `src/app/layout.tsx` — Root layout + global metadata
- `src/app/page.tsx` — Homepage (client, most complex component)
- `tailwind.config.ts` — Orange theme config
- `vercel.json` — Deployment config

---

## Notes & Decisions

- Using App Router (not Pages Router)
- Supabase used for DB only (not Supabase Auth — using custom auth)
- All city pages statically pre-generated
- Admin dashboard is NOT protected by middleware yet — just Bearer token in API
- The project is in MVP state — works but needs polish before launch
- Domain: gosolarindex.in (production), localhost:3000 (dev)
