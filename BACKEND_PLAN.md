# 🎨 Complete Backend Blueprint: Spilled Palette Studio

---

## The Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                USER                                         │
│  ┌─────────┐    ┌──────────┐    ┌─────────┐    ┌────────┐    ┌────────┐  │
│  │ Browse  │───▶│  Select  │───▶│  Pay    │───▶│ Print  │───▶│ Ship   │  │
│  │ Artwork │    │ Size/    │    │ Stripe  │    │ Prodigi│    │ To     │  │
│  │         │    │ Variant  │    │ Checkout│    │        │    │ Door   │  │
│  └─────────┘    └──────────┘    └────┬────┘    └────┬───┘    └───┬────┘  │
│                                      │               │            │        │
│                                      ▼               │            │        │
│                              ┌──────────────┐         │            │        │
│                              │   WEBHOOK    │         │            │        │
│                              │  (Verified)  │─────────┘            │        │
│                              └──────────────┘                      │        │
│                                      │                              │        │
│                                      ▼                              │        │
│                              ┌──────────────┐                      │        │
│                              │   RESEND     │◀─────────────────────┘        │
│                              │   (Receipt)  │   Shipping notification       │
│                              └──────────────┘                              │
└─────────────────────────────────────────────────────────────────────────────┘

        │                              │                              │
        ▼                              ▼                              ▼
┌───────────────┐            ┌─────────────────┐            ┌────────────────┐
│   CLOUDINARY │            │     SANITY      │            │    VERCEL      │
│   (Images)   │            │     (CMS)       │            │   (Frontend)   │
│              │            │                 │            │                │
│ Artwork      │            │ Product data    │            │ Next.js app    │
│ + In-Situ    │            │ + SKU mapping  │            │ + ISR          │
│ + Variants   │            │ + Pricing      │            │ + API routes   │
└───────────────┘            └─────────────────┘            └────────────────┘
```

---

## The Stack

| Layer | Technology | Status |
|-------|------------|--------|
| **Frontend** | Next.js 14 | Ready ✓ |
| **CMS** | Sanity.io | To build |
| **Images** | Cloudinary | Ready ✓ |
| **Payments** | Stripe | To connect |
| **Print** | Prodigi | Key ready ✓ |
| **Email** | Resend | To connect |
| **Hosting** | Vercel | Ready ✓ |

---

## Phase 1: CMS Foundation (Week 1)

### Tasks
1. Initialize Sanity.io project
2. Define Artwork schema with Prodigi fields
3. Import 99 existing artworks
4. Configure webhook → Vercel deploy

### Schema
```js
{
  name: 'artwork',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'slug', type: 'slug', options: { source: 'title' } },
    { name: 'image', type: 'image', options: { hotspot: true } },
    { name: 'insituImage', type: 'image' },
    { name: 'category', type: 'string', options: { list: ['sanctuary', 'botanical', 'floral', 'leaf', 'modern', 'dreamers', 'dopamine', 'ink', 'pattern'] } },
    { name: 'price', type: 'number' },
    { name: 'artistPick', type: 'boolean' },
    { name: 'description', type: 'text' },
    { name: 'dimensions', type: 'string' },
    { name: 'medium', type: 'string' },
    { name: 'year', type: 'string' },
    { name: 'colors', type: 'array', of: [{ type: 'string' }] },
    { name: 'printType', type: 'string', options: { list: [{title: 'Original', value: 'original'}, {title: 'Print on Demand', value: 'print'}] }},
    { name: 'variants', type: 'array', of: [{ type: 'object', fields: [
      { name: 'title', type: 'string' },
      { name: 'price', type: 'number' },
      { name: 'prodigiSku', type: 'string' },
      { name: 'shippingProfile', type: 'string' }
    ]}]},
    { name: 'status', type: 'string', options: { list: ['available', 'sold', 'reserved'] }, initialValue: 'available' }
  ]
}
```

### Deliverable
- Admin can add/edit artworks from Sanity Studio
- No code changes needed to add new art

---

## Phase 2: Frontend Integration (Week 2)

### Tasks
1. Connect Next.js to Sanity API (`next-sanity`)
2. Replace hardcoded data with dynamic fetch
3. Set up ISR (60s revalidation)
4. Add blur placeholders (LQIP)

### Deliverable
- Homepage auto-updates when new art published
- Fast image loading with blur-up effect

---

## Phase 3: Payments (Week 3)

### Tasks
1. Create Stripe account
2. Add "Buy" button to artwork detail
3. Integrate Stripe Checkout
4. Test: Complete test purchase

### Checkout Flow
```
User clicks "Buy" → Stripe Checkout → Payment → 
  ✓ Success → Webhook triggered
  ✗ Failed → Show error
```

### Deliverable
- Can accept real payments

---

## Phase 4: Automation (Week 4)

### Tasks
1. Create API route: `/api/webhooks/stripe`
2. Verify Stripe signature (CRITICAL)
3. Call Prodigi API with order details
4. Add Prodigi webhook → send email via Resend
5. Update Sanity status on sale

### Webhook Flow
```
Stripe webhook 
  → Validate signature
  → Extract: artwork, variant, shipping address
  → Call Prodigi API: create order
  → Patch Sanity: status = "sold"
  → Send confirmation email (Resend)
```

### Error Handling
- Log to Sentry
- Alert if Prodigi fails
- Manual fulfillment fallback

---

## Day 1 Essentials (Must Have)

| Feature | Why | How |
|---------|-----|-----|
| **Webhook Signature** | Stop hackers | Verify Stripe signature |
| **JSON-LD Schema** | Google Shopping | Add Product structured data |
| **Blur Placeholders** | Fast images | Cloudinary LQIP |
| **Sentry** | Error alerts | Free tier |

---

## Security Checklist

- [ ] Environment variables for all API keys
- [ ] Stripe webhook signature verification
- [ ] Sanity API token (read-only frontend)
- [ ] Rate limiting on webhook endpoints

---

## Cost Breakdown (Updated)

| Service | Free | Expected Cost | Notes |
|---------|------|---------------|-------|
| Sanity.io | 10GB, 25GB bandwidth | **Free** ✓ | Plenty for 99 artworks |
| Cloudinary | 25GB | **Free** ✓ | Already on free tier |
| Vercel | 100GB (free) | $20/mo after launch | Free during build phases 1-3 |
| Stripe | Free | Free | 2.9% + $0.30 (customer pays) |
| Prodigi | Free | Free | No upfront |
| Resend | 3,000/mo | **Free** ✓ | 3k emails/month |

**Estimated Monthly Cost: ~$0/mo during build, $20/mo after launch (Pro for ISR)**

---

## Critical Corrections

### 1. Address Format Trap ⚠️
**Problem:** Stripe accepts "USA", Prodigi requires "US" (ISO code).

**Fix:** Force structured address in Stripe Checkout:
```typescript
shipping_address_collection: {
  allowed_countries: ['US', 'GB', 'CA', 'AU', 'DE', 'FR'], // ISO codes only
}
```

### 2. Draft Order Strategy
**Problem:** First orders might have quality issues.

**Fix:** Create Prodigi orders as "draft" initially:
```typescript
{ ...order, status: 'draft' }
```
- First 5-10 orders: Review in Prodigi Dashboard manually
- Once confident: Switch to `status: 'submitted'`

---

## Timeline

| Week | Phase | Milestone |
|------|-------|-----------|
| 1 | CMS | Sanity setup + import |
| 2 | Frontend | Dynamic display + ISR |
| 3 | Payments | Stripe integration |
| 4 | Automation | Webhook + Prodigi |

---

## What We Need From You

- [ ] Stripe account + API keys (test mode)
- [ ] Resend API key
- [ ] 1 test artwork with Prodigi SKU

---

## Next Step

When ready, I'll start **Phase 1: Sanity CMS Setup**
