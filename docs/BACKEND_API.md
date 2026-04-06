# Backend API specification (Express + MongoDB)

This document describes the HTTP API consumed by the **gobus-rentals** frontend. Implement it with **Node.js**, **Express**, and **MongoDB** (Mongoose or native driver). The in-browser `local-api` and `mock-api/server.mjs` mirror these routes for local development.

---

## 1. General conventions

| Item | Convention |
|------|------------|
| Base URL | Configurable (e.g. `https://api.example.com`); frontend uses `VITE_API_URL` |
| Format | JSON bodies; `Content-Type: application/json` |
| Errors | `{ "error": "Human-readable message" }` with 4xx/5xx |
| CORS | Allow your web origin; credentials if you use cookies (current app uses `Authorization` header) |
| IDs | UUID v4 strings |
| **Booking reference** | Public-facing code `LBR-XXXXXXXX` derived from the booking UUID (last 8 hex chars of id without hyphens, uppercase). Return as `bookingRef` on quote accept. |

### Authentication

- **Register / login** return `{ token, user }`.
- **Token**: JWT recommended (`Authorization: Bearer <token>`). The dev mock uses a non-JWT prefix `mock.` + base64 payload; production must use signed JWT with claims: `sub` (user id), `role` (`customer` \| `vendor` \| `admin`), optional `vendorId` for vendors.
- **Protected routes**: require valid token; enforce role (403 if wrong role).

---

## 2. Recommended middleware stack

1. **helmet** — security headers  
2. **cors** — whitelist frontend origin  
3. **express.json({ limit: '1mb' })**  
4. **compression** (optional)  
5. **morgan** or **pino-http** — request logging  
6. **Rate limiting** — stricter on `/api/auth/login`, `/api/leads`, `/api/auth/register`  
7. **Auth middleware** — parse JWT, attach `req.user`  
8. **requireRole('admin')** etc.  
9. **Central error handler** — map Mongoose validation to 400, duplicate key to 409, cast errors to 404  

---

## 3. MongoDB collections (logical schema)

Align field names with what the UI expects. Types are conceptual (use Mongoose schemas in implementation).

### `users`

- `email` (unique, indexed), `passwordHash`, `name`, `phone`, `role`, `blocked` (bool), `vendorId` (ObjectId ref, optional), `createdAt`  
- Never return `passwordHash` in API responses.

### `vendors`

- `userId` (ref users), `companyName`, `gstNumber`, `panNumber`, `address`, `fleetSize`, `operatingCities`, bank fields, `city`, `status` (`pending` \| `active` \| `blocked` \| `rejected`), `rating`  

### `leads`

- `customerId` (nullable for guests), `guestName`, `guestEmail`, `guestPhone`, `pickup`, `drop`, `journeyDate`, `journeyTime`, `returnDate`, `passengers`, `busType`, `acPreference`, `purpose`, `notes`, `acceptedQuoteId`, `rejectedByVendorIds[]`, `createdAt`  

### `quotes`

- `leadId`, `vendorId`, `amount` (number, rental **subtotal** before GST), `inclusions`, `terms`, `status`, `responseMinutes` (or compute from `createdAt`), `createdAt`  

### `bookings`

- `leadId`, `quoteId`, `customerId`, `vendorId`, `subtotal`, `gstAmount`, `totalWithGst`, `paymentType` (`advance` \| `full`), `advanceRequired`, `amountPaid`, `rawStatus`, `displayStatus`, commission/payout fields as in frontend admin views, `createdAt`, `updatedAt`  

### `reviews`, `cms`, `settings`, `notification_logs` (or email queue)

- **notification_logs**: `{ channel, subject, body, audience, createdAt }` for admin audit (optional but matches Admin → Notifications History).

---

## 4. GST and pricing

- Quote `amount` is **subtotal** (rental). Platform **GST %** and **gstEnabled** live in company settings.  
- Compute `gstAmount` and `totalWithGst` server-side consistently with the app’s `computeGstBreakdown` logic.  
- **Advance**: `advanceRequired = paymentType === 'full' ? totalWithGst : round(totalWithGst * advanceFraction)` (default fraction matches frontend `COMPANY.advanceFractionDefault`).

---

## 5. Transactional email (required behaviour)

Use **Nodemailer + SMTP**, **SendGrid**, **Resend**, or similar. Store each send (or queue job) in `notification_logs` for admin visibility.

### 5.1 When a vendor submits a quote (`POST /api/vendor/quotes`)

**To:** lead’s `guestEmail`, or if `customerId` set, the customer user’s email.

**Subject (example):** `New price proposal for your trip (Pickup → Drop)`

**HTML body (guidelines):**

- Branded header (logo, platform name).  
- Trip one-liner: route, date, bus type, passengers.  
- Operator name, **rental subtotal**, note that GST is shown at checkout / in app.  
- Quote ID.  
- Primary CTA button: **View quotes** (deep link to `/customer/quotes`).  
- Secondary: link to refund/cancellation policy.

**No PDF required** for this event (optional one-page summary).

### 5.2 When a customer accepts a quote (`POST /api/customer/quotes/:id/accept`)

Send **two** emails.

**A) Customer — confirmation**

**Subject:** `Your trip is booked — LBR-XXXXXXXX`

**HTML:** Congratulations, **booking reference `bookingRef`**, full itinerary (pickup, drop, date/time, bus), operator name, line items (subtotal, GST %, total), **payment plan** (`advance` vs `full`), **amount due now** (`advanceRequired` or full total), placeholder for **Pay now** button (payment gateway URL in phase 2).

**PDF attachment (recommended):**

- Same data as HTML, styled like a one-page invoice / booking voucher: reference, customer name & email & phone, vendor legal name & GST if available, trip details, amounts, payment status (“Pending”), terms snippet.  
- Generate with **pdfkit**, **puppeteer** (HTML → PDF), or **@react-pdf/renderer** on a worker.  
- Filename: `LuxuryBusRental-Booking-LBR-XXXXXXXX.pdf`.

**B) Vendor — booking accepted**

**Subject:** `Booking accepted — LBR-XXXXXXXX`

**HTML:** Customer name, email, phone, route, date, bus, `bookingRef`, quote summary, reminder to confirm vehicle assignment and monitor payment status.

### 5.3 Future: payment webhooks

When integrating Razorpay/Stripe/etc., on `payment.captured` email **customer** (receipt) and optionally **vendor** (payment received for booking `LBR-…`). Update `bookings.amountPaid` and statuses accordingly.

---

## 6. API endpoints

All paths are prefixed as shown (no `/v1` in the current frontend).

### 6.1 Auth

| Method | Path | Auth | Body | Success response |
|--------|------|------|------|------------------|
| POST | `/api/auth/register` | No | `name`, `email`, `phone`, `password` | `{ token, user: { id, email, name, role: "customer" } }` |
| POST | `/api/auth/vendor/register` | No | `name`, `email`, `phone`, `password`, `companyName`, optional KYC/bank fields | `{ token, user: { id, email, name, role: "vendor", vendorId } }` — create vendor with `status: "pending"` |
| POST | `/api/auth/login` | No | `email`, `password` | `{ token, user }` — include `vendorId` when role is vendor |
| GET | `/api/auth/me` | Bearer | — | `{ user: { id, email, name, phone?, role, vendorId? } }` |

### 6.2 Public leads

| Method | Path | Auth | Body | Response |
|--------|------|------|------|----------|
| POST | `/api/leads` | Optional Bearer (customer) | `pickup`, `drop`, `journeyDate`, `journeyTime`, `passengers`, `busType`, `acPreference`, `purpose`, `notes`, `guestName`, `guestEmail`, optional `returnDate` | `{ ok, leadId, notifiedVendors? }` — if logged-in customer, set `customerId` |

### 6.3 Customer

| Method | Path | Role | Notes |
|--------|------|------|--------|
| GET | `/api/customer/dashboard-stats` | customer | Aggregates for dashboard cards |
| GET | `/api/customer/bookings` | customer | List bookings with display fields expected by `customer.bookings` route |
| POST | `/api/customer/bookings/:id/cancel` | customer | |
| POST | `/api/customer/bookings/:id/pay-advance` | customer | Simulated or real payment initiation later |
| POST | `/api/customer/bookings/:id/pay-balance` | customer | |
| POST | `/api/customer/bookings/:id/pay-full` | customer | |
| GET | `/api/customer/quotes` | customer | Pending quotes for this customer’s leads; each item includes `vendor`, `route`, `bus`, `price`, `amount`, `quoteSubtotal`, `gstAmount`, `totalWithGst`, `rating`, `responseTime`, `responseMinutes`, `inclusions` |
| POST | `/api/customer/quotes/:id/accept` | customer | Body: `{ paymentType: "advance" \| "full", policyAccepted: true }`. Creates booking, declines other pending quotes on same lead. **Send emails + PDF.** Response: `{ ok, bookingId, bookingRef }` |
| POST | `/api/customer/quotes/:id/decline` | customer | `{ ok }` |
| GET | `/api/customer/reviews` | customer | |
| POST | `/api/customer/reviews` | customer | Create review |
| PATCH | `/api/customer/profile` | customer | Update profile fields used by UI |

### 6.4 Vendor

| Method | Path | Role | Notes |
|--------|------|------|--------|
| GET | `/api/vendor/leads` | vendor | Open leads (exclude rejected-by-this-vendor, exclude leads with accepted quote). Optional `notice` string in response for inactive accounts |
| POST | `/api/vendor/leads/:id/reject` | vendor | |
| POST | `/api/vendor/quotes` | vendor | Body: `leadId`, `amount`, `inclusions`, `terms`. **Send customer email.** Response `{ ok, quoteId }` |
| GET | `/api/vendor/quotes` | vendor | Quotes sent by this vendor |
| GET | `/api/vendor/dashboard-stats` | vendor | |
| GET/PATCH | `/api/vendor/profile` | vendor | |
| GET/POST | `/api/vendor/buses` | vendor | Fleet CRUD |
| PATCH/DELETE | `/api/vendor/buses/:id` | vendor | |
| GET | `/api/vendor/bookings` | vendor | |
| PATCH | `/api/vendor/bookings/:id/status` | vendor | |
| GET | `/api/vendor/earnings` | vendor | |

### 6.5 Admin

| Method | Path | Role | Notes |
|--------|------|------|--------|
| GET | `/api/admin/stats` | admin | |
| GET | `/api/admin/bookings` | admin | |
| PATCH | `/api/admin/bookings/:id` | admin | Status / fields |
| POST | `/api/admin/bookings/:id/payout-override` | admin | |
| GET | `/api/admin/vendors` | admin | List with `id`, `name` (company), `owner`, `city`, `buses`, `kyc`, `status`, `rawStatus` |
| PATCH | `/api/admin/vendors/:id` | admin | Body: `{ status: "active" \| "pending" \| "blocked" \| "rejected" }` |
| GET | `/api/admin/users` | admin | Customers: `id`, `name`, `email`, `phone`, `bookings` (count), `joined` (formatted date), `status` (`Active`/`Blocked`), `blocked` |
| PATCH | `/api/admin/users/:id` | admin | Body: `{ blocked: boolean }` — **manage all customers** |
| GET | `/api/admin/payments` | admin | |
| POST | `/api/admin/payments/:id/refund` | admin | |
| GET | `/api/admin/cms` | admin | |
| POST | `/api/admin/cms` | admin | |
| PATCH/DELETE | `/api/admin/cms/:id` | admin | |
| GET | `/api/admin/settings` | admin | Company / platform settings |
| PATCH | `/api/admin/settings` | admin | |
| GET | `/api/admin/notification-logs` | admin | `{ logs: [{ id, channel, subject, body, audience, date }] }` |
| POST | `/api/admin/notifications` | admin | Broadcast / manual log entry |
| GET | `/api/admin/quotes` | admin | Monitor quotes |

---

## 7. Optional public route

The mock exposes `GET /api/public/company` for marketing content; the main app may read from static config. Include if you centralize CMS-driven company data.

---

## 8. Checklist for production

- [ ] JWT secret rotation, short access token + refresh if needed  
- [ ] Password hashing (**bcrypt** or **argon2**)  
- [ ] Input validation (**zod** / **joi** / express-validator) on all write endpoints  
- [ ] Idempotency key on payment creation (future)  
- [ ] Email queue (**BullMQ** + Redis) for reliable delivery and retries  
- [ ] PDF generation off the request thread (worker)  
- [ ] Indexes: `users.email`, `leads.customerId`, `quotes.leadId`, `bookings.customerId`, `bookings.vendorId`  

This spec matches the current frontend routes in `src/lib/local-api.ts` and `mock-api/server.mjs`.
