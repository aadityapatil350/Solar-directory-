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

- Homepage with hero, search, stats, listings grid, lead form
- Category and Location browse pages
- 10 dynamic city pages (Mumbai, Delhi, Bangalore, etc.)
- Listing detail pages
- Installer 4-step signup form + API
- Admin dashboard (Leads, Listings, Installers tabs)
- Admin CRUD APIs (listings, leads, installers)
- 89 seed listings across 10 cities, 5 categories
- Dynamic sitemap + robots.txt
- Full Tailwind orange theme + responsive design

---

## What's MISSING / Broken ❌

### Critical Security Issues
- [ ] Passwords stored as PLAIN TEXT — must add bcrypt
- [ ] Admin uses hardcoded email — need proper auth
- [ ] No session management / JWT

### Missing Features
- [ ] Proper user auth (login/logout/sessions)
- [ ] Installer dashboard (after login)
- [ ] Payment integration (Razorpay for subscriptions + leads)
- [ ] Review/rating submission by users
- [ ] Working filter checkboxes (Verified Only, Featured Only)
- [ ] Pagination on listing pages
- [ ] Full-text search
- [ ] Email verification / OTP
- [ ] Lead distribution workflow (automated assignment)
- [ ] Blog/content pages for SEO
- [ ] Individual category pages (e.g., `/categories/residential`)
- [ ] Individual state pages (beyond city)
- [ ] Contact page
- [ ] Pricing page (for installer subscriptions)
- [ ] FAQ page

### SEO Phase (To complete for rankings)
- [ ] Blog with solar education content (10+ articles)
- [ ] State-level landing pages (28 states)
- [ ] Service-specific pages (e.g., `/solar-panels-for-home`)
- [ ] Schema.org LocalBusiness structured data on listing pages
- [ ] Schema.org FAQ structured data on content pages
- [ ] Image optimization + alt texts
- [ ] Core Web Vitals optimization
- [ ] Google Analytics integration
- [ ] Google Search Console setup
- [ ] Backlink strategy (directories, forums)

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
