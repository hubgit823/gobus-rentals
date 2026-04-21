# Luxury Bus Rental — Backend specification (Node · Express · MongoDB · MVC)

This document describes how to implement the **REST API** that powers the `gobus-rentals` frontend. It follows **MVC** (Models, Controllers, Routes, Middleware, Services) and includes **Google OAuth**, **Razorpay**, **Cloudinary**, and **MongoDB** design.

The frontend calls APIs under `/api/*`, sends `Authorization: Bearer <JWT>` for protected routes, and expects JSON responses. Reference implementation behavior is mirrored in `src/lib/local-api.ts` (shapes and roles).

---

## 1. Stack & responsibilities

| Layer | Technology | Role |
|--------|------------|------|
| Runtime | Node.js 20+ | Server |
| HTTP | Express 4.x | Routing, JSON body, CORS |
| DB | MongoDB + Mongoose | Persistence |
| Auth | JWT (access token) + Google OAuth (ID token verification) | Sessions |
| Payments | Razorpay Orders API + signature verification | Bookings |
| Media | Cloudinary | Bus/fleet images, optional avatars & CMS assets |
| Validation | Zod or express-validator | Request bodies |
| Security | `helmet`, `express-rate-limit`, bcrypt for passwords | Hardening |

**MVC layout (suggested)**

```
src/
  app.js                 # express(), middleware, mount routes
  config/
    db.js                # mongoose.connect
    env.js               # validate process.env
  models/                # Mongoose schemas
  controllers/           # req/res handlers (thin)
  routes/                # bind paths → controller + middleware
  middleware/
    auth.js              # JWT verify + role check
    errorHandler.js
  services/              # business logic (payments, leads, notifications)
  utils/
  integrations/
    razorpay.js
    cloudinary.js
    googleOAuth.js
```

---

## 2. Environment variables

```env
# Server
NODE_ENV=development
PORT=4000
CLIENT_ORIGIN=http://localhost:8080

# MongoDB
MONGODB_URI=mongodb://localhost:27017/luxury_bus_rental

# JWT
JWT_SECRET=change-me-long-random
JWT_EXPIRES_IN=7d

# Google OAuth (SPA sends ID token; backend verifies)
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
# Optional if using server-side OAuth code flow instead:
# GOOGLE_CLIENT_SECRET=...
# GOOGLE_CALLBACK_URL=http://localhost:4000/api/auth/google/callback

# Razorpay (never expose RAZORPAY_KEY_SECRET to the browser)
RAZORPAY_KEY_ID=rzp_test_xxx
RAZORPAY_KEY_SECRET=xxx
# Webhook (optional, for async payment confirmation)
RAZORPAY_WEBHOOK_SECRET=xxx

# Cloudinary
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
```

Frontend expects **`VITE_API_URL`** pointing at this server (e.g. `http://localhost:4000`). Razorpay **order** and **verify** routes must run on the real server (secrets stay server-side).

---

## 3. Authentication model

### 3.1 JWT payload (recommended)

After email/password login, Google login, or registration, issue:

```json
{
  "sub": "<userId>",
  "role": "customer" | "vendor" | "admin",
  "vendorId": "<vendorId>" | null
}
```

Sign with `JWT_SECRET`. Frontend stores the token and sends:

`Authorization: Bearer <token>`

### 3.2 Password hashing

- Use **bcrypt** (`cost` 10–12) for `passwordHash` on `User`.
- Never return password fields in API responses.

### 3.3 Google OAuth (recommended for SPA)

**Flow A — ID token (fits React SPA)**

1. User signs in with Google on the client (`@react-oauth/google` or similar).
2. Client receives **credential** (ID token JWT).
3. `POST /api/auth/google` with body `{ idToken: string }`.
4. Server verifies ID token with **`google-auth-library`** `OAuth2Client.verifyIdToken({ idToken, audience: GOOGLE_CLIENT_ID })`.
5. Read `email`, `name`, `sub` (Google user id).
6. Find or create `User`:
   - If new user: default `role: "customer"` (or require invite for vendor/admin).
   - Store `googleId: string` on user to link account.
7. Return same shape as login: `{ token, user }`.

**Flow B — Authorization code (redirect)**

Use Passport `passport-google-oauth20` with server-side callback; on success create session or issue JWT and redirect to frontend with token in hash/query (less ideal for SPAs). Prefer Flow A for this project.

**Admin / vendor via Google**

- First login with Google creates **customer** only.
- Promote to **vendor** after `/api/auth/vendor/register`-equivalent onboarding or admin approval.
- **Admin** accounts should be created only in DB or via a guarded bootstrap script — do not expose “sign up as admin” publicly.

---

## 4. MongoDB collections (models)

Names are indicative; adjust to your naming convention.

### 4.1 `users`

| Field | Type | Notes |
|-------|------|--------|
| email | String, unique, lowercase | |
| passwordHash | String, optional | null if Google-only |
| name | String | |
| phone | String | |
| role | enum: `customer`, `vendor`, `admin` | |
| vendorId | ObjectId ref `vendors`, optional | set when role is vendor |
| googleId | String, optional, sparse index | sub from Google |
| blocked | Boolean | admin can block |
| createdAt | Date | |

### 4.2 `vendors`

| Field | Type |
|-------|------|
| userId | ObjectId ref users |
| companyName | String |
| gstNumber, panNumber, address | String |
| fleetSize | Number |
| operatingCities | String |
| bankHolder, bankAccount, bankIfsc, bankName | String |
| status | `pending` \| `active` \| `blocked` \| `rejected` |
| rating | Number |
| city | String |
| logoPublicId / logoUrl | optional Cloudinary |

### 4.3 `buses` (vendor fleet)

| Field | Type |
|-------|------|
| vendorId | ObjectId |
| registrationNumber, busType, seats, ac | … |
| imagePublicId / imageUrl | Cloudinary |

### 4.4 `leads`

Trip requests from `/api/leads` (guest or logged-in customer).

| Field | Type |
|-------|------|
| customerId | ObjectId nullable |
| guestName, guestEmail, guestPhone | String |
| pickup, drop, journeyDate, journeyTime, returnDate | |
| passengers | Number |
| busType, acPreference, purpose, notes | String |
| acceptedQuoteId | ObjectId nullable |
| rejectedByVendorIds | [ObjectId] |
| createdAt | Date |

### 4.5 `quotes`

| Field | Type |
|-------|------|
| leadId, vendorId | ObjectId |
| amount | Number |
| inclusions, terms | String |
| status | `pending` \| `accepted` \| `declined` \| `withdrawn` |
| responseMinutes | Number |
| createdAt | Date |

### 4.6 `bookings`

| Field | Type |
|-------|------|
| leadId, quoteId, customerId, vendorId | ObjectId |
| subtotal, gstAmount, totalWithGst | Number |
| paymentType | `advance` \| `full` |
| advanceRequired, amountPaid | Number |
| rawStatus | `pending_payment` \| `confirmed` \| `on_trip` \| `completed` \| `cancelled` |
| displayStatus | string (human label) |
| payoutOverride, payoutStatus, commissionDeducted, payoutAmount | per business rules |
| createdAt, updatedAt | Date |

### 4.7 `payments` (Razorpay audit)

| Field | Type |
|-------|------|
| bookingId | ObjectId |
| razorpayOrderId | String |
| razorpayPaymentId | String, optional until paid |
| amountPaise | Number |
| currency | `INR` |
| purpose | `advance` \| `balance` \| `full` |
| status | `created` \| `paid` \| `failed` \| `refunded` |
| raw | Mixed | optional webhook payload |

### 4.8 `reviews`, `cms`, `notificationLogs`, `settings`

Mirror fields used in `local-api.ts` seed types (`CmsRow`, `ReviewRow`, `CompanySettings`, etc.).

---

## 5. API routes (contract with frontend)

Base URL: `https://your-api.com` (no path prefix except `/api`).

**Errors:** JSON `{ "error": "Human readable message" }` with appropriate HTTP status (`400`, `401`, `403`, `404`, `409`, `500`).

### 5.1 Auth (public)

| Method | Path | Body | Response |
|--------|------|------|----------|
| POST | `/api/auth/register` | `{ email, password, name, phone? }` | `{ token, user }` |
| POST | `/api/auth/login` | `{ email, password }` | `{ token, user }` |
| POST | `/api/auth/vendor/register` | `{ email, password, name, phone?, companyName, gstNumber?, … }` | `{ token, user }` with `vendorId` |
| POST | `/api/auth/google` | `{ idToken }` | `{ token, user }` |
| GET | `/api/auth/me` | Authorization | `{ user: { id, email, name, phone?, role, vendorId? } }` |

`user` shape for frontend `StoredUser`:

```ts
{ id: string; email: string; name: string; role: "customer"|"vendor"|"admin"; vendorId?: string }
```

### 5.2 Public leads

| Method | Path | Body | Response |
|--------|------|------|----------|
| POST | `/api/leads` | BookingForm payload (pickup, drop, dates, passengers, busType, …) | `{ ok, leadId, notifiedVendors? }` |

Optional `Authorization`: if customer token present, attach `customerId` to lead.

### 5.3 Customer (Bearer, role `customer`)

| Method | Path | Notes |
|--------|------|--------|
| GET | `/api/customer/dashboard-stats` | |
| GET | `/api/customer/bookings` | List + amounts as strings for display (see mock) |
| POST | `/api/customer/bookings/:id/cancel` | |
| POST | `/api/customer/bookings/:id/pay-advance` | Optional shortcut; real money via Razorpay below |
| POST | `/api/customer/bookings/:id/pay-balance` | |
| POST | `/api/customer/bookings/:id/pay-full` | |
| GET | `/api/customer/quotes` | |
| POST | `/api/customer/quotes/:id/accept` | |
| POST | `/api/customer/quotes/:id/decline` | |
| GET | `/api/customer/reviews` | |
| POST | `/api/customer/reviews` | |
| PATCH | `/api/customer/profile` | |

### 5.4 Vendor (Bearer, role `vendor`)

| Method | Path |
|--------|------|
| GET | `/api/vendor/leads` |
| POST | `/api/vendor/leads/:id/reject` |
| GET | `/api/vendor/quotes` |
| POST | `/api/vendor/quotes` |
| GET | `/api/vendor/dashboard-stats` |
| GET | `/api/vendor/profile` |
| PATCH | `/api/vendor/profile` |
| GET | `/api/vendor/buses` |
| POST | `/api/vendor/buses` |
| PATCH | `/api/vendor/buses/:id` |
| DELETE | `/api/vendor/buses/:id` |
| GET | `/api/vendor/bookings` |
| POST | `/api/vendor/bookings/:id/status` |
| GET | `/api/vendor/earnings` |

### 5.5 Admin (Bearer, role `admin`)

| Method | Path |
|--------|------|
| GET | `/api/admin/stats` |
| GET | `/api/admin/bookings` |
| PATCH | `/api/admin/bookings/:id` |
| POST | `/api/admin/bookings/:id/payout-override` |
| GET | `/api/admin/vendors` |
| PATCH | `/api/admin/vendors/:id` |
| GET | `/api/admin/users` |
| PATCH | `/api/admin/users/:id` |
| GET | `/api/admin/payments` |
| POST | `/api/admin/payments/:id/refund` |
| GET | `/api/admin/cms` |
| POST | `/api/admin/cms` |
| PATCH | `/api/admin/cms/:id` |
| DELETE | `/api/admin/cms/:id` |
| GET | `/api/admin/settings` |
| PATCH | `/api/admin/settings` |
| GET | `/api/admin/notification-logs` |
| POST | `/api/admin/notifications` |
| GET | `/api/admin/quotes` |

---

## 6. Razorpay integration

The frontend (`RazorpayBookingPayButton.tsx`) expects:

### 6.1 Create order

`POST /api/payments/razorpay/order`  
**Auth:** Bearer (customer).  
**Body:**

```json
{ "bookingId": "<id>", "purpose": "advance" | "balance" | "full" }
```

**Response:**

```json
{
  "id": "<razorpay_order_id>",
  "amount": 12345,
  "currency": "INR",
  "keyId": "<RAZORPAY_KEY_ID>"
}
```

**Server logic (service layer)**

1. Load booking; ensure `req.user.sub === booking.customerId`.
2. Compute amount in **paise** (`amount` integer) from `purpose` and remaining balance.
3. `razorpay.orders.create({ amount, currency: "INR", receipt: bookingId, notes: { bookingId, purpose } })`.
4. Persist `payments` row with status `created`.
5. Return `keyId` from env (public), never the secret.

### 6.2 Verify payment

`POST /api/payments/razorpay/verify`  
**Body:**

```json
{
  "razorpay_order_id": "...",
  "razorpay_payment_id": "...",
  "razorpay_signature": "..."
}
```

**Server**

1. `crypto.createHmac("sha256", RAZORPAY_KEY_SECRET).update(order_id + "|" + payment_id).digest("hex") === signature`.
2. On success: mark payment `paid`, update `booking.amountPaid` / status, idempotent if already processed.

### 6.3 Webhook (recommended)

`POST /api/payments/razorpay/webhook` — verify `X-Razorpay-Signature` with `RAZORPAY_WEBHOOK_SECRET`; handle `payment.captured` / `refunded` for reliability if client closes before verify.

---

## 7. Cloudinary integration

**Use cases**

- Vendor fleet photos (`POST /api/vendor/buses` multipart → upload → store `secure_url` + `public_id`).
- Optional: user avatar, CMS hero images.

**Pattern**

1. `multer` memory storage or `streamifier` → `cloudinary.uploader.upload_stream`.
2. Store `public_id` and `url` on `Bus` or `Vendor`.
3. On delete, `cloudinary.uploader.destroy(public_id)`.

**Env** never in frontend; only signed URLs or public `secure_url` as needed.

---

## 8. Middleware

### 8.1 `requireAuth`

- Read `Authorization: Bearer`.
- Verify JWT; attach `req.user = { sub, role, vendorId }`.
- `401` if missing/invalid.

### 8.2 `requireRole(...roles)`

- After `requireAuth`; `403` if `req.user.role` not in list.

### 8.3 CORS

- `CLIENT_ORIGIN` allowlist for browser requests.

### 8.4 Rate limiting

- Stricter on `/api/auth/login`, `/api/auth/register`, `/api/payments/*`.

---

## 9. Controllers vs services

- **Controllers:** parse `req`, call service, return `res.json()` / `next(err)`.
- **Services:** `LeadService.create`, `RazorpayService.createOrder`, `GoogleAuthService.verifyAndUpsertUser`, `CloudinaryService.uploadBusImage`.

---

## 10. Google OAuth controller sketch

```http
POST /api/auth/google
Content-Type: application/json

{ "idToken": "eyJhbGciOiJSUzI1NiIs..." }
```

```js
// pseudo-code
const ticket = await client.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID });
const payload = ticket.getPayload();
const email = payload.email;
const googleId = payload.sub;
let user = await User.findOne({ $or: [{ email }, { googleId }] });
if (!user) user = await User.create({ email, name: payload.name, googleId, role: 'customer' });
else if (!user.googleId) user.googleId = googleId; await user.save();
const token = jwt.sign({ sub: user.id, role: user.role, vendorId: user.vendorId }, JWT_SECRET);
return res.json({ token, user: toPublicUser(user) });
```

---

## 11. Security checklist

- [ ] HTTPS in production  
- [ ] JWT secret rotation plan  
- [ ] No secrets in client bundle  
- [ ] Razorpay signature always verified server-side  
- [ ] Input validation on all POST/PATCH bodies  
- [ ] Mongo injection safe (Mongoose parameterized)  
- [ ] Admin routes only `role === 'admin'`  
- [ ] Vendor scoped by `vendorId` from token, not from client body  

---

## 12. Alignment with this repo

- Frontend API helper: `src/lib/api.ts`  
- Mock contract reference: `src/lib/local-api.ts`  
- Auth storage: `src/lib/auth-storage.ts`  
- Razorpay UI: `src/components/payments/RazorpayBookingPayButton.tsx`  

Implementing the routes and payloads above will allow `VITE_USE_LOCAL_API=false` and `VITE_API_URL` pointed at your Express server for full integration.

---

## 13. Suggested npm packages

```
express mongoose jsonwebtoken bcrypt cors helmet express-rate-limit
google-auth-library
razorpay
cloudinary multer
zod (or express-validator)
dotenv
morgan (dev)
```

---

*Document version: 1.0 — matches frontend expectations for Luxury Bus Rental / gobus-rentals.*
