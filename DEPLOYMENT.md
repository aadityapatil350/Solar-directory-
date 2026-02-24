# Deployment Guide - Solar Directory

## Deploy to Vercel

### Step 1: Prepare Your Code

1. Make sure all files are committed to Git:
```bash
cd solar-directory
git init
git add .
git commit -m "Initial commit - Solar Directory template"
```

2. Create a new repository on GitHub and push:
```bash
git remote add origin https://github.com/your-username/solar-directory.git
git branch -M main
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in/up
2. Click "Add New" → "Project"
3. Import your GitHub repository

### Step 3: Configure Environment Variables

In Vercel project settings, add these environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
DATABASE_URL=postgresql://postgres:[password]@[project-id].supabase.co:5432/postgres
```

Where to find these:
- **Supabase Dashboard** → Settings → API
- Copy the URL and anon key
- For service role key: Scroll down to "service_role (secret)"
- For DATABASE_URL: Format like:
  ```
  postgresql://postgres:[YOUR-PASSWORD]@[PROJECT-ID].supabase.co:5432/postgres
  ```

### Step 4: Deploy

Click "Deploy". Vercel will:
- Install dependencies
- Generate Prisma client
- Push database schema to your Supabase
- Build the Next.js app
- Deploy it

### Step 5: Seed Database

After deployment, open your Vercel project and:

1. Go to your deployed site
2. The database will be ready (schema pushed automatically)
3. To add sample data, you can either:
   - Run `npx prisma db seed` locally with your production DATABASE_URL
   - Use Supabase Dashboard to manually add data

### Step 6: Add Custom Domain

1. In Vercel project → Settings → Domains
2. Click "Add Domain"
3. Enter your domain (e.g., `solarindia.directory`)
4. Update DNS records as Vercel shows you:
   - Add an A record pointing to Vercel's IP
   - Or add a CNAME record to `cname.vercel-dns.com`

### Step 7: Enable Production Features

#### Google Analytics
1. Get tracking ID from [analytics.google.com](https://analytics.google.com)
2. Add `NEXT_PUBLIC_GA_ID` to Vercel environment variables
3. Add Google Analytics script to `src/app/layout.tsx`

#### Google Search Console
1. Add your site to [search.google.com/search-console](https://search.google.com/search-console)
2. Verify ownership (DNS method is easiest)
3. Submit sitemap: `https://yourdomain.com/sitemap.xml`

#### Google AdSense
1. Apply at [adsense.google.com](https://adsense.google.com)
2. Add AdSense script to layout after approval

## Troubleshooting

### Database Connection Error

If you see database errors during build:
- Check DATABASE_URL format in Vercel env vars
- Make sure Supabase project is active
- Verify your Supabase password is correct

### Build Fails

Common fixes:
```bash
# Locally test build
npm run build

# Regenerate Prisma client
npx prisma generate

# Clear Next.js cache
rm -rf .next
npm run build
```

### Environment Variables Not Working

- Make sure all env vars start with `NEXT_PUBLIC_` if needed in browser code
- Restart deployment after adding env vars
- Check Vercel logs for missing variable warnings

## Post-Deployment Checklist

- [ ] Site loads without errors
- [ ] Database tables created in Supabase
- [ ] Search and filters work
- [ ] Sample data displays correctly
- [ ] Mobile responsive on all pages
- [ ] Custom domain pointing correctly
- [ ] SSL certificate active
- [ ] Google Analytics tracking
- [ ] Google Search Console verified
- [ ] Sitemap submitted to GSC

## Updating the Site

After deployment, to make changes:

```bash
# Make your changes
git add .
git commit -m "Updated something"
git push

# Vercel auto-deploys on push
```

---

Need help? Check [Clawdbot docs](https://docs.clawd.bot)
