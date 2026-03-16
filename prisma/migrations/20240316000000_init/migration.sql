-- CreateTable
CREATE TABLE IF NOT EXISTS "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "Location" (
    "id" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "Listing" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "website" TEXT,
    "address" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "rating" DOUBLE PRECISION DEFAULT 0,
    "reviews" INTEGER NOT NULL DEFAULT 0,
    "categoryId" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "userId" TEXT,
    "installerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "youtubeUrl" TEXT,
    "views" INTEGER NOT NULL DEFAULT 0,
    "serviceTags" TEXT,
    "premiumExpiresAt" TIMESTAMP(3),
    "installationsCount" INTEGER,
    "yearsExperience" INTEGER,
    "capacityMw" DOUBLE PRECISION,
    "citiesCount" INTEGER,
    CONSTRAINT "Listing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "password" TEXT,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "Installer" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "contactPerson" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT,
    "website" TEXT,
    "subscriptionType" TEXT NOT NULL DEFAULT 'basic',
    "subscriptionStart" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subscriptionEnd" TIMESTAMP(3),
    "paymentStatus" TEXT NOT NULL DEFAULT 'pending',
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "enquiryCount" INTEGER NOT NULL DEFAULT 0,
    "enquiryCountResetAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Installer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "Lead" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "requirement" TEXT,
    "locationId" TEXT,
    "budget" TEXT,
    "urgency" TEXT NOT NULL DEFAULT 'normal',
    "status" TEXT NOT NULL DEFAULT 'new',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "LeadDelivery" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "installerId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "openedAt" TIMESTAMP(3),
    "readAt" TIMESTAMP(3),
    "price" DOUBLE PRECISION,
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "LeadDelivery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "ClaimRequest" (
    "id" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "message" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "installerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ClaimRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "WhatsAppClick" (
    "id" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "WhatsAppClick_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "BlogPost" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "readTime" TEXT NOT NULL DEFAULT '5 min read',
    "published" BOOLEAN NOT NULL DEFAULT true,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "ogImage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "ListingImage" (
    "id" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ListingImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "OtpVerification" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "OtpVerification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "PasswordResetToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "SolarLead" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "monthlyBill" DOUBLE PRECISION NOT NULL,
    "systemSize" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SolarLead_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "Location_slug_key" ON "Location"("slug");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "Listing_slug_key" ON "Listing"("slug");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "Listing_categoryId_idx" ON "Listing"("categoryId");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "Listing_locationId_idx" ON "Listing"("locationId");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "Listing_featured_idx" ON "Listing"("featured");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "Listing_verified_idx" ON "Listing"("verified");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "Listing_installerId_idx" ON "Listing"("installerId");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "Installer_userId_key" ON "Installer"("userId");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "Lead_status_idx" ON "Lead"("status");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "Lead_createdAt_idx" ON "Lead"("createdAt");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "LeadDelivery_installerId_idx" ON "LeadDelivery"("installerId");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "LeadDelivery_leadId_idx" ON "LeadDelivery"("leadId");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "ClaimRequest_listingId_idx" ON "ClaimRequest"("listingId");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "ClaimRequest_status_idx" ON "ClaimRequest"("status");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "WhatsAppClick_listingId_idx" ON "WhatsAppClick"("listingId");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "WhatsAppClick_city_idx" ON "WhatsAppClick"("city");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "WhatsAppClick_timestamp_idx" ON "WhatsAppClick"("timestamp");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "BlogPost_slug_key" ON "BlogPost"("slug");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "BlogPost_slug_idx" ON "BlogPost"("slug");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "BlogPost_published_idx" ON "BlogPost"("published");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "BlogPost_category_idx" ON "BlogPost"("category");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "ListingImage_listingId_idx" ON "ListingImage"("listingId");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "OtpVerification_email_idx" ON "OtpVerification"("email");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "OtpVerification_expiresAt_idx" ON "OtpVerification"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "PasswordResetToken_token_key" ON "PasswordResetToken"("token");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "PasswordResetToken_token_idx" ON "PasswordResetToken"("token");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "PasswordResetToken_email_idx" ON "PasswordResetToken"("email");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "SolarLead_city_idx" ON "SolarLead"("city");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "SolarLead_createdAt_idx" ON "SolarLead"("createdAt");

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT IF NOT EXISTS "Listing_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT IF NOT EXISTS "Listing_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT IF NOT EXISTS "Listing_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT IF NOT EXISTS "Listing_installerId_fkey" FOREIGN KEY ("installerId") REFERENCES "Installer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Installer" ADD CONSTRAINT IF NOT EXISTS "Installer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT IF NOT EXISTS "Lead_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadDelivery" ADD CONSTRAINT IF NOT EXISTS "LeadDelivery_installerId_fkey" FOREIGN KEY ("installerId") REFERENCES "Installer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadDelivery" ADD CONSTRAINT IF NOT EXISTS "LeadDelivery_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClaimRequest" ADD CONSTRAINT IF NOT EXISTS "ClaimRequest_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListingImage" ADD CONSTRAINT IF NOT EXISTS "ListingImage_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE CASCADE ON UPDATE CASCADE;
