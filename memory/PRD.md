# PJ Ours — Product Requirements Document

## Original Problem Statement
Modern, mobile-first ordering website for **PJ Ours**, a juice & shakes café in Thrissur with 2 outlets (East Fort & West Fort). Menu ordering flows to the **selected outlet's WhatsApp number** via a deep link. ₹5 parcel charge per item quantity. Strong focus on customer reviews (4.2★, 203 reviews) and affordability (₹30–₹160 range).

## Architecture
- **Frontend:** React 19 SPA (CRA + craco) with Tailwind + shadcn/ui
- **Backend:** FastAPI default template (unused — user confirmed no storage required)
- **State:** React Context for cart; static menu module (`/src/data/menu.js`)
- **Integrations:** WhatsApp Click-to-Chat (`https://wa.me/<num>?text=<encoded>`)

## User Personas
1. **Thrissur Local Customer** — orders via phone, wants quick reorder of favourites
2. **West Fort / East Fort Walk-in Hangout Crew** — needs menu browsing & pickup
3. **Delivery Customer** — needs address field + WhatsApp order handoff

## Core Requirements (Static)
- Mandatory outlet selection (East Fort / West Fort) before placing order
- Parcel charge: ₹5 × total item quantity
- WhatsApp message must include: outlet, name, phone, order type, address (if delivery), itemized list, subtotal, parcel, grand total
- Mobile-first UX with sticky floating cart button

## What's Been Implemented (as of 2026-02-24, updated 2026-04-24)

### Iteration 2 (2026-04-24) — P1 features shipped
- **Backend rewrite** (FastAPI): MongoDB-backed menu, outlets, files. Admin JWT auth (bcrypt-safe password compare + brute-force lockout). Admin CRUD endpoints for menu + outlets. Object storage integration (Emergent) with public `/api/files/{path}` proxy for uploaded images. Menu auto-seeded on first startup (175 items preserving size tiers from original PDF).
- **Size variants (S/M/L)** implemented only for categories that had 3-tier pricing in the source PDF: Juice, Fusion Shake, Avil Milk, Milk Shake, Desserts, Mocktail. Single-price categories (Ice Cream Shakes, Falooda, Ice Cream, Fruit Soda, Mojito) unchanged.
- **Cart persistence** via localStorage (`pjours_cart_v2`) with a composite `lineId` so same item in different sizes are independent cart lines; size label shown in cart and in the WhatsApp order message.
- **Admin dashboard** at `/admin` (password `pjours@2026` → `backend/.env`): Menu tab with search/filter/create/edit/delete + image upload (JPEG/PNG/WEBP/GIF ≤ 5 MB) + size-variants editor; Outlets tab to edit names, WhatsApp, address, hours, Google Maps query.
- **Test coverage**: backend pytest 19/19 pass (admin auth, JWT, CRUD, uploads, public endpoints), frontend e2e 100% on new flows.

### Iteration 1 (2026-02-24)
- Landing page with Hero (bento image layout), Highlights strip, Popular Items (5 cards), Reviews section (rating + keyword chips + 4 review cards), Locations (2 outlets with Google Maps embed + WhatsApp chat button)
- Menu page with sticky category tabs (11 categories, 175 items), search, per-item Add button, in-cart counter indicator
- Cart Drawer (shadcn Sheet) with qty +/-, remove, parcel row showing formula, subtotal/total
- Checkout form: Name, Phone, Order Type (Pickup/Delivery), Delivery Address (conditional), **Outlet (mandatory RadioGroup)**, Note
- Form validation + toast feedback
- WhatsApp deep-link generation with URL-encoded pre-filled message → opens in new tab
- Floating cart button (mobile-friendly) with live total
- Header with logo, nav, cart badge
- Footer with outlet info & WhatsApp numbers
- Design system: Fraunces (display) + Outfit (sub) + DM Sans (body), palette: coconut milk BG, papaya orange primary, deep jungle green secondary, WhatsApp green CTA

## Test Results
- Frontend e2e: **100% pass** (17/17 flows, zero console errors) — see `/app/test_reports/iteration_1.json`

## Outlet WhatsApp Numbers
- East Fort: +91 95900 12678 → `wa.me/919590012678`
- West Fort: +91 70126 11090 → `wa.me/917012611090`
- Editable in `/app/frontend/src/data/menu.js` → `OUTLETS`

## Prioritized Backlog
### P1 — Next
- **Real photography** for popular/menu items (admin upload ready; waiting on photos from owner)
- **Add-ons** (cornflakes, tutti frutti, extra ice cream) that attach to individual cart lines
- **Outlet auto-detect** via geolocation as a convenience (still overridable)
- **Combo deals** row on landing page (AOV upsell)

### P2 — Later
- Loyalty / repeat order history (requires accounts)
- QR-code dine-in ordering (per-table QR deep link)
- SEO meta + OG tags for "best shakes in Thrissur"
- Order status callback from outlet (via WhatsApp webhook — needs Twilio/Meta Cloud API)
- Image per menu item (currently only popular items have images)

## Next Tasks
1. Gather user feedback on MVP (especially menu naming, prices, outlet addresses)
2. Decide on admin panel vs. content-file edits for future menu changes
3. Capture proper photography for menu items (replace placeholder images)
