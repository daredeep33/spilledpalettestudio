# 🎨 COMPLETE BACKEND BLUEPRINT: Spilled Palette Studio

---

# EXECUTIVE SUMMARY

**Project:** Build a headless e-commerce backend for an art gallery website (Spilled Palette Studio) that enables easy artwork uploads and automated print-on-demand fulfillment.

**The Goal:** Move from manual code-based updates to a CMS-managed system where:
- Aswathi (the artist) can upload new artworks via a beautiful admin interface
- Customers can browse, select print sizes, and purchase
- Orders automatically trigger Prodigi to print and ship
- You (the operator) get email notifications and dashboard tracking

**The Stack:**
- CMS: Sanity.io
- Images: Cloudinary (existing)
- Payments: Stripe
- Print: Prodigi
- Email: Resend
- Hosting: Vercel (existing)

---

# CURRENT STATE

| Component | Current Status |
|-----------|---------------|
| Frontend | Next.js 14, static export on Vercel |
| Data Storage | Hardcoded in data/artworks.ts + data/artwork-metadata.json |
| Images | 99 artworks + in-situ versions on Cloudinary |
| Payments | None |
| Print-on-Demand | Prodigi API key ready |
| Updates | Manual git push + Vercel deploy |

---

# THE COMPLETE FLOW

```
1. ARTWORK MANAGEMENT
   You/Aswathi → Sanity Studio (upload artwork) → Publish → Webhook → Vercel rebuild

2. CUSTOMER JOURNEY  
   Browse → Select Size → Buy (Stripe) → Payment → Webhook → Prodigi (print) → Ship → Email (tracking)

3. ORDER FULFILLMENT
   Stripe payment → Webhook verified → Create Prodigi order → Update Sanity status → Send email
```

---

# PHASE 1: SANITY CMS SETUP

**Duration:** Week 1

## Tasks

1. Initialize Sanity.io project
2. Define artwork schema with all fields
3. Define category schema  
4. Import 99 existing artworks
5. Customize Sanity Studio branding
6. Configure webhook → Vercel deploy
7. Test: Add new artwork from Sanity Studio

## Schema Fields

- title, slug
- image, insituImage
- category (9 categories)
- printType (original/print)
- basePrice
- variants[] (size, price, Prodigi SKU, shipping)
- description, dimensions, medium, year
- colors (palette)
- artistPick
- status (available/sold/reserved)
- seo (metaTitle, metaDescription)

---

# PHASE 2: FRONTEND INTEGRATION

**Duration:** Week 2

## Tasks

1. Install next-sanity
2. Configure Sanity client
3. Add environment variables
4. Update Gallery to fetch from Sanity
5. Update detail page to fetch from Sanity
6. Enable ISR (60 second revalidation)
7. Add blur placeholders (LQIP)
8. Test: New artwork appears within 60 seconds

---

# PHASE 3: STRIPE PAYMENTS

**Duration:** Week 3

## Tasks

1. Create Stripe account
2. Get API keys (test mode)
3. Install Stripe dependencies
4. Configure Stripe client
5. Create checkout API route
6. Create Buy button component
7. Add Buy button to detail page
8. Set up webhook endpoint
9. Test: Complete test purchase

## Checkout Flow

```
User clicks Buy → /api/checkout → Stripe → Payment → 
  ✓ Success: webhook fires
  ✗ Failed: show error
```

---

# PHASE 4: PRODIGI AUTOMATION

**Duration:** Week 4

## Tasks

1. Review Prodigi API
2. Create Prodigi client library
3. Update webhook to create Prodigi order
4. Add error handling
5. Test: Purchase → Prodigi order created

## Webhook Flow

```
Stripe webhook → Verify signature → 
  Extract artwork, variant, shipping address →
  Create Prodigi order → 
  Update Sanity status →
  Send email
```

---

# PHASE 5: EMAIL & NOTIFICATIONS

**Duration:** Week 4-5

## Tasks

1. Create Resend account
2. Install Resend
3. Create email templates (confirmation, shipping)
4. Update webhook to send confirmation email
5. Set up Prodigi webhook for shipping updates
6. Test: Email sent on order

---

# DAY 1 ESSENTIALS

## 1. Security (Webhook Signatures) ⚠️ CRITICAL
Verify Stripe webhook signatures to prevent fake payments.

## 2. SEO (JSON-LD Product Schema)
Add structured data for Google Shopping + "In Stock" badge.

## 3. Images (Blur Placeholders)
Use LQIP for fast-loading blur-up effect.

## 4. Error Handling (Sentry)
Set up instant alerts if Prodigi fails.

---

# SEO CHECKLIST

- [ ] Dynamic meta titles per artwork
- [ ] Dynamic meta descriptions per artwork  
- [ ] Open Graph images (social sharing)
- [ ] JSON-LD Product structured data
- [ ] XML sitemap (auto-generated)
- [ ] Canonical URLs

---

# SECURITY CHECKLIST

- [ ] Environment variables for ALL API keys
- [ ] Stripe webhook signature verification
- [ ] Sanity API token (read-only frontend, write webhooks)
- [ ] Rate limiting on webhook endpoints
- [ ] Input validation on API routes

---

# COST BREAKDOWN

| Service | Free | Paid |
|---------|------|------|
| Sanity.io | 10GB | $99/mo |
| Vercel | 100GB | $20/mo |
| Cloudinary | 25GB | $89/mo |
| Stripe | Free | 2.9% + $0.30 |
| Prodigi | Free | Wholesale |
| Resend | 3,000/mo | $0.01/email |

---

# TIMELINE

| Week | Phase | Deliverable |
|------|-------|-------------|
| 1 | CMS | Sanity + 99 artworks imported |
| 2 | Frontend | Dynamic fetching + ISR |
| 3 | Payments | Stripe checkout working |
| 4 | Automation | Prodigi order creation |
| 5 | Email | Confirmations + shipping |

---

# WHAT WE NEED FROM YOU

## Before Start
- [ ] Stripe account + test API keys
- [ ] Resend account + API key
- [ ] Prodigi account access confirmed

## During Build
- [ ] 1 test artwork with real Prodigi SKU
- [ ] Test card: 4242 4242 4242 4242

## After Launch
- [ ] Monitor orders daily
- [ ] Update pricing in Sanity
- [ ] Respond to customer inquiries

---

# COMPLETE ARCHITECTURE DIAGRAM

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   USER     │────▶│   STRIPE    │────▶│   WEBHOOK  │────▶│  PRODIGI   │
│ picks art  │     │   pays $    │     │  (verified)│     │  prints    │
└─────────────┘     └──────┬──────┘     └──────┬──────┘     └──────┬──────┘
                           │                   │                   │
                           │                   ▼                   │
                           │            ┌─────────────┐            │
                           │            │  VALIDATE   │            │
                           │            │  SIGNATURE  │            │
                           │            └──────┬──────┘            │
                           │                   │                   │
                           ▼                   ▼                   ▼
                    ┌─────────────┐      ┌─────────────┐     ┌─────────────┐
                    │  RESEND     │◀─────│   CLOUDINARY│     │   SANITY    │
                    │  (email)    │      │  (images)   │     │   (CMS)     │
                    └─────────────┘      └─────────────┘     └─────────────┘
```

---

# READY TO START?

This blueprint covers everything from Phase 1 to launch and beyond.

Say GO and we'll begin with Phase 1: Sanity CMS Setup.

---

# CORRECTIONS & REFINEMENTS (Added 2026-02-16)

## 1. Cost Correction

**Original:** Sanity $99/mo, Cloudinary $89/mo  
**Corrected:** Free tiers are sufficient for now

| Service | Expected Cost | Notes |
|---------|---------------|-------|
| Sanity.io | **Free** | 10GB storage, 25GB bandwidth — plenty for 99 artworks |
| Cloudinary | **Free** | Already on free tier, 25GB is enough |
| Vercel | $20/mo | Pro plan for ISR |
| Stripe | Free | 2.9% + $0.30 per transaction (paid by customer) |
| Prodigi | Free | No upfront cost |
| Resend | **Free** | 3,000 emails/month |

**Updated Monthly Cost:** ~$20/mo (just Vercel)

---

## 2. The "Address Format" Trap ⚠️

**Problem:** Stripe accepts loose addresses ("USA" instead of "US"), but Prodigi's API is strict and requires ISO 3166-1 alpha-2 country codes.

**Fix:** Enable "Stripe Tax" or configure Stripe Checkout to force structured address validation.

```typescript
// In checkout session creation:
billing_address_collection: 'required',
shipping_address_collection: {
  allowed_countries: ['US', 'GB', 'CA', 'AU', 'DE', 'FR'], // ISO codes only
},
```

This ensures clean data flows to Prodigi without rejection.

---

## 3. The "Draft Order" Strategy

**Problem:** First orders might have quality issues (crop, color, print).

**Fix:** Create orders in "Draft" mode initially.

```typescript
// In Prodigi order creation:
{
  ...order,
  status: 'draft'  // Don't submit yet!
}
```

**Workflow:**
1. First 5-10 orders: Created as "Draft"
2. You manually review in Prodigi Dashboard
3. Click "Submit" when satisfied
4. Once confident: Change code to `status: 'submitted'`

This prevents accidental printing of bad orders.

---

## Summary of Fixes

| Issue | Fix |
|-------|-----|
| Cost estimates too high | Free tiers are sufficient |
| Address format rejection | Force ISO codes via Stripe Checkout |
| Quality control risk | Create as "Draft" initially |

---

