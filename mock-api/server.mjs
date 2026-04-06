/**
 * Dev-only in-memory API for LuxuryBusRental UI (not for production).
 * Matches /api/* routes used by gobus-rentals. Start: npm run mock-api
 *
 * Data shapes mirror intended DB collections:
 * - companySettings: name, about, operatingLocations, contact*, gstEnabled, gstPercentage, commissionPercent, payout*
 * - booking: subtotal, gstAmount, totalWithGst, paymentType (advance|full), advanceRequired, amountPaid,
 *   commissionDeducted, payoutStatus, payoutOverride, payoutAmount, payoutAt, rawStatus, displayStatus
 */
import http from "node:http";
import { randomUUID } from "node:crypto";

const PORT = parseInt(String(process.env.MOCK_API_PORT || process.env.PORT || 3001), 10);

/** @type {Map<string, any>} */
const users = new Map();
/** @type {Map<string, any>} */
const vendors = new Map();
/** @type {any[]} */
const leads = [];
/** @type {any[]} */
const quotes = [];
/** @type {any[]} */
const bookings = [];
/** key `${leadId}:${vendorId}` -> 'rejected' */
const leadVendorReject = new Map();

const ADVANCE_FRACTION = 0.3;

/** In-memory company / platform settings (mirrors production Company Settings collection). */
let companySettings = {
  name: "Kartar Travels Private Limited",
  about:
    "Kartar Travels Private Limited is a trusted luxury bus rental service provider since 2018, offering Volvo, Mercedes-Benz, seater and sleeper buses for comfortable journeys. We are committed to delivering safe, reliable, and premium travel experiences across North India at the best prices.",
  operatingLocations:
    "Chandigarh, Mohali, Panchkula, Delhi, Punjab, Haryana, Himachal Pradesh & North regions",
  contactPhone: "7380027102",
  contactEmail: "support@luxurybusrental.in",
  gstNumber: "GSTIN on invoice — configure in Admin Settings",
  gstEnabled: true,
  gstPercentage: 18,
  commissionPercent: 10,
  quoteWindowHours: 24,
  payoutType: "automatic",
  payoutTrigger: "after_trip_completion",
};

function round2(n) {
  return Math.round(Number(n) * 100) / 100;
}

function pricingFromSubtotal(subtotal) {
  const s = round2(subtotal);
  const gst = companySettings.gstEnabled ? round2(s * (companySettings.gstPercentage / 100)) : 0;
  return { subtotal: s, gstAmount: gst, totalWithGst: round2(s + gst) };
}

function commissionOnSubtotal(subtotal) {
  return round2(subtotal * (companySettings.commissionPercent / 100));
}

function bookingConfirmedByPayment(b) {
  if (!b.advanceRequired) return false;
  if (b.paymentType === "full") return b.amountPaid >= b.totalWithGst - 0.01;
  return b.amountPaid >= b.advanceRequired - 0.01;
}

function applyCustomerPayment(b, targetPaid) {
  b.amountPaid = round2(Math.min(targetPaid, b.totalWithGst));
  if (b.rawStatus === "pending_payment" && bookingConfirmedByPayment(b)) {
    b.rawStatus = "confirmed";
    b.displayStatus = "Confirmed";
  }
}

function paymentLabel(b) {
  if (b.amountPaid >= b.totalWithGst - 0.01) return "Paid in full";
  if (b.amountPaid > 0) return "Partial";
  return "Unpaid";
}

function tryAutoPayout(book) {
  if (book.rawStatus !== "completed") return;
  if (book.payoutOverride === "hold") return;
  if (book.payoutStatus === "paid") return;
  book.commissionDeducted = commissionOnSubtotal(book.subtotal);
  book.payoutAmount = round2(book.subtotal - book.commissionDeducted);
  book.payoutStatus = "paid";
  book.payoutAt = new Date().toISOString();
}

function assertFullSettlementBeforeTrip(book) {
  if (book.amountPaid < book.totalWithGst - 0.01) {
    return "Full payment (including GST) is required before the trip can start.";
  }
  return null;
}

function rupee(n) {
  return `₹${Number(n).toLocaleString("en-IN")}`;
}

function tokenFor(userId, role, vendorId) {
  const payload = Buffer.from(JSON.stringify({ sub: userId, role, vendorId: vendorId || null })).toString(
    "base64url",
  );
  return `mock.${payload}`;
}

function parseAuth(req) {
  const h = req.headers.authorization;
  if (!h?.startsWith("Bearer ")) return null;
  const raw = h.slice(7);
  if (!raw.startsWith("mock.")) return null;
  try {
    return JSON.parse(Buffer.from(raw.slice(5), "base64url").toString("utf8"));
  } catch {
    return null;
  }
}

function userFromAuth(req) {
  const p = parseAuth(req);
  if (!p?.sub) return null;
  const u = users.get(p.sub);
  if (!u) return null;
  return { ...p, user: u };
}

function json(res, status, body, extraHeaders = {}) {
  const data = JSON.stringify(body);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET,POST,PATCH,DELETE,OPTIONS",
    ...extraHeaders,
  });
  res.end(data);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let b = "";
    req.on("data", (c) => (b += c));
    req.on("end", () => {
      if (!b) return resolve({});
      try {
        resolve(JSON.parse(b));
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
    req.on("error", reject);
  });
}

function seedAdmin() {
  const id = randomUUID();
  users.set(id, {
    id,
    email: "admin@luxurybus.dev",
    password: "admin123",
    name: "Platform Admin",
    phone: "",
    role: "admin",
  });
  console.log("[mock-api] Seeded admin: admin@luxurybus.dev / admin123");
}

function activeVendorCount() {
  return [...vendors.values()].filter((v) => v.status === "active").length;
}

function leadOpen(lead) {
  return !lead.acceptedQuoteId;
}

function vendorDisplayStatus(v) {
  if (v.status === "active") return { status: "Active", kyc: "Approved", rawStatus: "active" };
  if (v.status === "blocked") return { status: "Blocked", kyc: "Approved", rawStatus: "blocked" };
  if (v.status === "rejected") return { status: "Rejected", kyc: "Rejected", rawStatus: "rejected" };
  return { status: "Pending", kyc: "Pending", rawStatus: "pending" };
}

function mapVendorAdmin(v) {
  const u = users.get(v.userId);
  const d = vendorDisplayStatus(v);
  return {
    id: v.id,
    name: v.companyName,
    owner: u?.name || u?.email || "—",
    city: v.city || "—",
    buses: v.buses?.length ?? 0,
    kyc: d.kyc,
    status: d.status,
    rawStatus: d.rawStatus,
  };
}

/** @param {import('node:http').IncomingMessage} req */
async function handle(req, res) {
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Methods": "GET,POST,PATCH,DELETE,OPTIONS",
    });
    return res.end();
  }

  const url = new URL(req.url || "/", `http://127.0.0.1`);
  const path = url.pathname;
  const method = req.method || "GET";

  try {
    /* ---------- Auth ---------- */
    if (method === "POST" && path === "/api/auth/register") {
      const b = await readBody(req);
      if ([b.name, b.email, b.phone, b.password].some((x) => !x)) {
        return json(res, 400, { error: "Missing fields" });
      }
      if ([...users.values()].some((u) => u.email === b.email)) {
        return json(res, 400, { error: "Email already registered" });
      }
      const id = randomUUID();
      users.set(id, {
        id,
        email: b.email,
        password: b.password,
        name: b.name,
        phone: b.phone,
        role: "customer",
        blocked: false,
      });
      const u = users.get(id);
      return json(res, 200, {
        token: tokenFor(id, "customer"),
        user: { id: u.id, email: u.email, name: u.name, role: "customer" },
      });
    }

    if (method === "POST" && path === "/api/auth/vendor/register") {
      const b = await readBody(req);
      if (!b.email || !b.password || !b.name || !b.companyName) {
        return json(res, 400, { error: "Missing required fields" });
      }
      if ([...users.values()].some((u) => u.email === b.email)) {
        return json(res, 400, { error: "Email already registered" });
      }
      const uid = randomUUID();
      users.set(uid, {
        id: uid,
        email: b.email,
        password: b.password,
        name: b.name,
        phone: b.phone || "",
        role: "vendor",
      });
      const vid = randomUUID();
      const city = (b.operatingCities || "").split(/[,;]/)[0]?.trim() || "—";
      vendors.set(vid, {
        id: vid,
        userId: uid,
        companyName: b.companyName,
        address: b.address || "",
        gstNumber: b.gstNumber || "",
        panNumber: b.panNumber || "",
        city,
        status: "pending",
        buses: [],
      });
      users.get(uid).vendorId = vid;
      const u = users.get(uid);
      return json(res, 200, {
        token: tokenFor(uid, "vendor", vid),
        user: { id: u.id, email: u.email, name: u.name, role: "vendor", vendorId: vid },
      });
    }

    if (method === "POST" && path === "/api/auth/login") {
      const b = await readBody(req);
      const u = [...users.values()].find((x) => x.email === b.email);
      if (!u || u.password !== b.password) {
        return json(res, 401, { error: "Invalid email or password" });
      }
      if (u.blocked) {
        return json(res, 403, { error: "Account blocked" });
      }
      const vendorId = u.role === "vendor" ? u.vendorId : undefined;
      return json(res, 200, {
        token: tokenFor(u.id, u.role, vendorId),
        user: {
          id: u.id,
          email: u.email,
          name: u.name,
          role: u.role,
          ...(vendorId ? { vendorId } : {}),
        },
      });
    }

    if (method === "GET" && path === "/api/auth/me") {
      const s = userFromAuth(req);
      if (!s) return json(res, 401, { error: "Unauthorized" });
      const u = s.user;
      return json(res, 200, {
        user: {
          id: u.id,
          email: u.email,
          name: u.name,
          role: u.role,
          ...(u.vendorId ? { vendorId: u.vendorId } : {}),
        },
      });
    }

    /* ---------- Public lead ---------- */
    if (method === "POST" && path === "/api/leads") {
      const b = await readBody(req);
      const auth = userFromAuth(req);
      const id = randomUUID();
      const customerName = b.guestName || auth?.user?.name || "Guest";
      leads.push({
        id,
        customerId: auth?.user?.role === "customer" ? auth.user.id : null,
        guestName: b.guestName,
        guestEmail: b.guestEmail,
        pickup: b.pickup,
        drop: b.drop,
        journeyDate: b.journeyDate,
        journeyTime: b.journeyTime,
        returnDate: b.returnDate,
        passengers: b.passengers,
        busType: b.busType,
        acPreference: b.acPreference,
        purpose: b.purpose,
        notes: b.notes,
        acceptedQuoteId: null,
      });
      return json(res, 200, { ok: true, leadId: id, notifiedVendors: activeVendorCount() });
    }

    /* ---------- Customer ---------- */
    if (method === "GET" && path === "/api/customer/dashboard-stats") {
      const s = userFromAuth(req);
      if (!s || s.user.role !== "customer") return json(res, 403, { error: "Forbidden" });
      const cid = s.user.id;
      const activeBookings = bookings.filter(
        (b) => b.customerId === cid && !["cancelled", "completed"].includes(b.rawStatus),
      ).length;
      const pendingQuotes = quotes.filter((q) => {
        const lead = leads.find((l) => l.id === q.leadId);
        return lead?.customerId === cid && q.status === "pending";
      }).length;
      return json(res, 200, {
        activeBookings: String(activeBookings),
        pendingQuotes: String(pendingQuotes),
        reviewsGiven: "0",
      });
    }

    if (method === "GET" && path === "/api/customer/bookings") {
      const s = userFromAuth(req);
      if (!s || s.user.role !== "customer") return json(res, 403, { error: "Forbidden" });
      const list = bookings
        .filter((b) => b.customerId === s.user.id)
        .map((b) => ({
          id: b.id,
          from: b.from,
          to: b.to,
          date: b.date,
          bus: b.bus,
          vendor: b.vendorName,
          status: b.displayStatus,
          rawStatus: b.rawStatus,
          amount: rupee(b.totalWithGst ?? 0),
          subtotal: rupee(b.subtotal ?? 0),
          gstAmount: rupee(b.gstAmount ?? 0),
          totalWithGst: rupee(b.totalWithGst ?? 0),
          paymentType: b.paymentType,
          advanceRequired: rupee(b.advanceRequired ?? 0),
          amountPaid: rupee(b.amountPaid ?? 0),
          balanceDue: rupee(Math.max(0, round2((b.totalWithGst ?? 0) - (b.amountPaid ?? 0)))),
          paymentStatus: paymentLabel(b),
          gstRatePercent: companySettings.gstEnabled ? companySettings.gstPercentage : 0,
        }));
      return json(res, 200, { bookings: list });
    }

    if (method === "POST" && path.match(/^\/api\/customer\/bookings\/[^/]+\/cancel$/)) {
      const s = userFromAuth(req);
      if (!s || s.user.role !== "customer") return json(res, 403, { error: "Forbidden" });
      const id = path.split("/")[4];
      const b = bookings.find((x) => x.id === id && x.customerId === s.user.id);
      if (!b) return json(res, 404, { error: "Not found" });
      b.rawStatus = "cancelled";
      b.displayStatus = "Cancelled";
      return json(res, 200, { ok: true });
    }

    if (method === "POST" && path.match(/^\/api\/customer\/bookings\/[^/]+\/pay-advance$/)) {
      const s = userFromAuth(req);
      if (!s || s.user.role !== "customer") return json(res, 403, { error: "Forbidden" });
      const id = path.split("/")[4];
      const b = bookings.find((x) => x.id === id && x.customerId === s.user.id);
      if (!b) return json(res, 404, { error: "Not found" });
      if (b.paymentType !== "advance") return json(res, 400, { error: "This booking uses full payment. Use pay full instead." });
      if (b.rawStatus === "cancelled") return json(res, 400, { error: "Booking is cancelled" });
      applyCustomerPayment(b, Math.max(b.amountPaid, b.advanceRequired));
      return json(res, 200, { ok: true, paymentStatus: paymentLabel(b) });
    }

    if (method === "POST" && path.match(/^\/api\/customer\/bookings\/[^/]+\/pay-balance$/)) {
      const s = userFromAuth(req);
      if (!s || s.user.role !== "customer") return json(res, 403, { error: "Forbidden" });
      const id = path.split("/")[4];
      const b = bookings.find((x) => x.id === id && x.customerId === s.user.id);
      if (!b) return json(res, 404, { error: "Not found" });
      if (b.rawStatus === "cancelled") return json(res, 400, { error: "Booking is cancelled" });
      applyCustomerPayment(b, b.totalWithGst);
      return json(res, 200, { ok: true, paymentStatus: paymentLabel(b) });
    }

    if (method === "POST" && path.match(/^\/api\/customer\/bookings\/[^/]+\/pay-full$/)) {
      const s = userFromAuth(req);
      if (!s || s.user.role !== "customer") return json(res, 403, { error: "Forbidden" });
      const id = path.split("/")[4];
      const b = bookings.find((x) => x.id === id && x.customerId === s.user.id);
      if (!b) return json(res, 404, { error: "Not found" });
      if (b.paymentType !== "full") return json(res, 400, { error: "This booking is on advance plan. Use advance/balance payments." });
      if (b.rawStatus === "cancelled") return json(res, 400, { error: "Booking is cancelled" });
      applyCustomerPayment(b, b.totalWithGst);
      return json(res, 200, { ok: true, paymentStatus: paymentLabel(b) });
    }

    if (method === "GET" && path === "/api/customer/quotes") {
      const s = userFromAuth(req);
      if (!s || s.user.role !== "customer") return json(res, 403, { error: "Forbidden" });
      const cid = s.user.id;
      const list = quotes
        .filter((q) => {
          const lead = leads.find((l) => l.id === q.leadId);
          return lead?.customerId === cid && q.status === "pending";
        })
        .map((q) => {
          const lead = leads.find((l) => l.id === q.leadId);
          const v = vendors.get(q.vendorId);
          const pr = pricingFromSubtotal(q.amount);
          return {
            id: q.id,
            vendor: v?.companyName || "Operator",
            route: `${lead?.pickup} → ${lead?.drop}`,
            bus: lead?.busType || "—",
            price: rupee(pr.totalWithGst),
            amount: pr.totalWithGst,
            quoteSubtotal: pr.subtotal,
            gstAmount: pr.gstAmount,
            totalWithGst: pr.totalWithGst,
            rating: 4.6,
            responseTime: "~1h",
            responseMinutes: 55,
            inclusions: q.inclusions || "",
          };
        });
      return json(res, 200, { quotes: list });
    }

    if (method === "POST" && path.match(/^\/api\/customer\/quotes\/[^/]+\/accept$/)) {
      const s = userFromAuth(req);
      if (!s || s.user.role !== "customer") return json(res, 403, { error: "Forbidden" });
      const body = await readBody(req);
      if (!body.policyAccepted) return json(res, 400, { error: "You must accept the refund & cancellation policy." });
      const paymentType = body.paymentType === "full" ? "full" : "advance";
      const qid = path.split("/")[4];
      const q = quotes.find((x) => x.id === qid);
      if (!q || q.status !== "pending") return json(res, 400, { error: "Invalid quote" });
      const lead = leads.find((l) => l.id === q.leadId);
      if (!lead || lead.customerId !== s.user.id) return json(res, 403, { error: "Forbidden" });
      q.status = "accepted";
      for (const o of quotes.filter((x) => x.leadId === lead.id && x.id !== qid)) o.status = "declined";
      lead.acceptedQuoteId = qid;
      const v = vendors.get(q.vendorId);
      const bid = randomUUID();
      const { subtotal, gstAmount, totalWithGst } = pricingFromSubtotal(q.amount);
      const advanceRequired =
        paymentType === "full" ? totalWithGst : round2(totalWithGst * ADVANCE_FRACTION);
      bookings.push({
        id: bid,
        customerId: s.user.id,
        vendorId: q.vendorId,
        quoteId: qid,
        leadId: lead.id,
        from: lead.pickup,
        to: lead.drop,
        date: lead.journeyDate,
        bus: lead.busType,
        vendorName: v?.companyName || "Operator",
        displayStatus: "Pending payment",
        rawStatus: "pending_payment",
        subtotal,
        gstAmount,
        totalWithGst,
        paymentType,
        advanceRequired,
        amountPaid: 0,
        commissionDeducted: 0,
        payoutAmount: 0,
        payoutStatus: "pending",
        payoutOverride: null,
        payoutAt: null,
        amount: rupee(totalWithGst),
      });
      return json(res, 200, { ok: true, bookingId: bid, pricing: { subtotal, gstAmount, totalWithGst, paymentType } });
    }

    if (method === "POST" && path.match(/^\/api\/customer\/quotes\/[^/]+\/decline$/)) {
      const s = userFromAuth(req);
      if (!s || s.user.role !== "customer") return json(res, 403, { error: "Forbidden" });
      const qid = path.split("/")[4];
      const q = quotes.find((x) => x.id === qid);
      if (!q) return json(res, 404, { error: "Not found" });
      const lead = leads.find((l) => l.id === q.leadId);
      if (!lead || lead.customerId !== s.user.id) return json(res, 403, { error: "Forbidden" });
      q.status = "declined";
      return json(res, 200, { ok: true });
    }

    if (method === "GET" && path === "/api/customer/reviews") {
      const s = userFromAuth(req);
      if (!s || s.user.role !== "customer") return json(res, 403, { error: "Forbidden" });
      return json(res, 200, { reviews: [] });
    }

    if (method === "POST" && path === "/api/customer/reviews") {
      const s = userFromAuth(req);
      if (!s || s.user.role !== "customer") return json(res, 403, { error: "Forbidden" });
      return json(res, 200, { ok: true });
    }

    if (method === "PATCH" && path === "/api/customer/profile") {
      const s = userFromAuth(req);
      if (!s || s.user.role !== "customer") return json(res, 403, { error: "Forbidden" });
      const b = await readBody(req);
      Object.assign(s.user, { name: b.name ?? s.user.name, phone: b.phone ?? s.user.phone });
      return json(res, 200, { ok: true });
    }

    /* ---------- Vendor ---------- */
    if (method === "GET" && path === "/api/vendor/leads") {
      const s = userFromAuth(req);
      if (!s || s.user.role !== "vendor" || !s.vendorId) return json(res, 403, { error: "Forbidden" });
      const v = vendors.get(s.vendorId);
      if (v.status !== "active") {
        return json(res, 200, {
          leads: [],
          notice: "Your operator account is pending admin approval. You will see leads once approved.",
        });
      }
      const out = [];
      for (const lead of leads) {
        if (!leadOpen(lead)) continue;
        const rk = `${lead.id}:${s.vendorId}`;
        if (leadVendorReject.get(rk)) {
          out.push({
            id: lead.id,
            customer: lead.guestName || users.get(lead.customerId)?.name || "Customer",
            from: lead.pickup,
            to: lead.drop,
            date: lead.journeyDate,
            passengers: lead.passengers,
            bus: lead.busType,
            purpose: lead.purpose,
            status: "Rejected",
          });
          continue;
        }
        const vq = quotes.find((q) => q.leadId === lead.id && q.vendorId === s.vendorId);
        if (vq) {
          out.push({
            id: lead.id,
            customer: lead.guestName || users.get(lead.customerId)?.name || "Customer",
            from: lead.pickup,
            to: lead.drop,
            date: lead.journeyDate,
            passengers: lead.passengers,
            bus: lead.busType,
            purpose: lead.purpose,
            status: vq.status === "accepted" ? "Accepted" : "Quoted",
          });
        } else {
          out.push({
            id: lead.id,
            customer: lead.guestName || users.get(lead.customerId)?.name || "Customer",
            from: lead.pickup,
            to: lead.drop,
            date: lead.journeyDate,
            passengers: lead.passengers,
            bus: lead.busType,
            purpose: lead.purpose,
            status: "New",
          });
        }
      }
      return json(res, 200, { leads: out });
    }

    if (method === "POST" && path.match(/^\/api\/vendor\/leads\/[^/]+\/reject$/)) {
      const s = userFromAuth(req);
      if (!s || s.user.role !== "vendor") return json(res, 403, { error: "Forbidden" });
      const leadId = path.split("/")[4];
      leadVendorReject.set(`${leadId}:${s.vendorId}`, true);
      return json(res, 200, { ok: true });
    }

    if (method === "POST" && path === "/api/vendor/quotes") {
      const s = userFromAuth(req);
      if (!s || s.user.role !== "vendor") return json(res, 403, { error: "Forbidden" });
      const b = await readBody(req);
      const lead = leads.find((l) => l.id === b.leadId);
      if (!lead || !leadOpen(lead)) return json(res, 400, { error: "Invalid lead" });
      const qid = randomUUID();
      quotes.push({
        id: qid,
        leadId: b.leadId,
        vendorId: s.vendorId,
        amount: Number(b.amount),
        inclusions: b.inclusions || "",
        terms: b.terms || "",
        status: "pending",
      });
      return json(res, 200, { ok: true, quoteId: qid });
    }

    if (method === "GET" && path === "/api/vendor/dashboard-stats") {
      const s = userFromAuth(req);
      if (!s || s.user.role !== "vendor") return json(res, 403, { error: "Forbidden" });
      const vid = s.vendorId;
      const v = vendors.get(vid);
      const openLeads = leads.filter((l) => leadOpen(l)).length;
      const vb = bookings.filter((b) => b.vendorId === vid);
      const netPaid = vb.filter((b) => b.payoutStatus === "paid").reduce((a, b) => a + (b.payoutAmount || 0), 0);
      return json(res, 200, {
        totalBuses: String(v?.buses?.length ?? 0),
        activeLeads: String(v?.status === "active" ? openLeads : 0),
        confirmedBookings: String(
          vb.filter((b) => ["confirmed", "on_trip", "completed"].includes(b.rawStatus)).length,
        ),
        totalEarnings: rupee(vb.filter((b) => b.rawStatus === "completed").reduce((a, b) => a + (b.subtotal || 0), 0)),
        netAfterCommission: rupee(netPaid),
        commissionPercent: companySettings.commissionPercent,
        payoutRule: "Automatic after trip completion (10% platform commission deducted from your side).",
        avgRating: "4.8",
        thisMonth: "₹0",
        recentLeads: leads
          .filter((l) => leadOpen(l))
          .slice(0, 3)
          .map((l) => ({
            id: l.id,
            customer: l.guestName || "Customer",
            route: `${l.pickup} → ${l.drop}`,
            date: l.journeyDate,
            bus: l.busType,
            status: "New",
          })),
      });
    }

    if (method === "GET" && path === "/api/vendor/profile") {
      const s = userFromAuth(req);
      if (!s || s.user.role !== "vendor") return json(res, 403, { error: "Forbidden" });
      const v = vendors.get(s.vendorId);
      const u = s.user;
      return json(res, 200, {
        user: { name: u.name, email: u.email, phone: u.phone },
        vendor: {
          companyName: v?.companyName,
          address: v?.address,
          gstNumber: v?.gstNumber,
          panNumber: v?.panNumber,
          status: v?.status,
          operatingCities: v?.city ? [v.city] : [],
        },
      });
    }

    if (method === "PATCH" && path === "/api/vendor/profile") {
      const s = userFromAuth(req);
      if (!s || s.user.role !== "vendor") return json(res, 403, { error: "Forbidden" });
      const b = await readBody(req);
      const v = vendors.get(s.vendorId);
      if (b.name) s.user.name = b.name;
      if (b.phone) s.user.phone = b.phone;
      if (v && b.companyName) v.companyName = b.companyName;
      if (v && b.address) v.address = b.address;
      return json(res, 200, { ok: true });
    }

    if (method === "GET" && path === "/api/vendor/buses") {
      const s = userFromAuth(req);
      if (!s || s.user.role !== "vendor") return json(res, 403, { error: "Forbidden" });
      const v = vendors.get(s.vendorId);
      const buses = (v?.buses || []).map((bus) => ({
        ...bus,
        rawStatus: bus.rawStatus || "active",
      }));
      return json(res, 200, { buses });
    }

    if (method === "POST" && path === "/api/vendor/buses") {
      const s = userFromAuth(req);
      if (!s || s.user.role !== "vendor") return json(res, 403, { error: "Forbidden" });
      const b = await readBody(req);
      const v = vendors.get(s.vendorId);
      const id = randomUUID();
      const row = {
        id,
        name: b.name || "Bus",
        type: b.type || "seater",
        capacity: Number(b.capacity) || 40,
        ac: b.ac !== false,
        pricePerKm: Number(b.pricePerKm) || 0,
        pricePerDay: Number(b.pricePerDay) || 0,
        status: "Active",
        rawStatus: "active",
      };
      v.buses.push(row);
      return json(res, 200, { ok: true, bus: row });
    }

    if (method === "PATCH" && path.match(/^\/api\/vendor\/buses\/[^/]+$/)) {
      const s = userFromAuth(req);
      if (!s || s.user.role !== "vendor") return json(res, 403, { error: "Forbidden" });
      const id = path.split("/")[4];
      const b = await readBody(req);
      const v = vendors.get(s.vendorId);
      const bus = v?.buses?.find((x) => x.id === id);
      if (!bus) return json(res, 404, { error: "Not found" });
      Object.assign(bus, b);
      return json(res, 200, { ok: true });
    }

    if (method === "DELETE" && path.match(/^\/api\/vendor\/buses\/[^/]+$/)) {
      const s = userFromAuth(req);
      if (!s || s.user.role !== "vendor") return json(res, 403, { error: "Forbidden" });
      const id = path.split("/")[4];
      const v = vendors.get(s.vendorId);
      if (v?.buses) v.buses = v.buses.filter((x) => x.id !== id);
      return json(res, 200, { ok: true });
    }

    if (method === "GET" && path === "/api/vendor/bookings") {
      const s = userFromAuth(req);
      if (!s || s.user.role !== "vendor") return json(res, 403, { error: "Forbidden" });
      const list = bookings
        .filter((b) => b.vendorId === s.vendorId)
        .map((b) => ({
          id: b.id,
          customer: users.get(b.customerId)?.name || "Customer",
          route: `${b.from} → ${b.to}`,
          date: b.date,
          bus: b.bus,
          amount: b.amount,
          status: b.displayStatus,
          rawStatus: b.rawStatus,
          payoutStatus: b.payoutStatus || "pending",
          commissionDeducted: rupee(b.commissionDeducted ?? 0),
          netPayout: rupee(b.payoutAmount ?? 0),
        }));
      return json(res, 200, { bookings: list });
    }

    if (method === "PATCH" && path.match(/^\/api\/vendor\/bookings\/[^/]+\/status$/)) {
      const s = userFromAuth(req);
      if (!s || s.user.role !== "vendor") return json(res, 403, { error: "Forbidden" });
      const id = path.split("/")[4];
      const b = await readBody(req);
      const book = bookings.find((x) => x.id === id && x.vendorId === s.vendorId);
      if (!book) return json(res, 404, { error: "Not found" });
      const raw = b.status || book.rawStatus;
      const map = {
        pending_payment: ["Pending payment", "pending_payment"],
        confirmed: ["Confirmed", "confirmed"],
        on_trip: ["On Trip", "on_trip"],
        completed: ["Completed", "completed"],
        cancelled: ["Cancelled", "cancelled"],
      };
      const m = map[raw];
      if (!m) return json(res, 400, { error: "Invalid status" });
      if (raw === "on_trip") {
        const err = assertFullSettlementBeforeTrip(book);
        if (err) return json(res, 400, { error: err });
      }
      if (raw === "completed") {
        const err = assertFullSettlementBeforeTrip(book);
        if (err) return json(res, 400, { error: err });
      }
      book.displayStatus = m[0];
      book.rawStatus = m[1];
      if (raw === "completed") tryAutoPayout(book);
      return json(res, 200, { ok: true, payoutStatus: book.payoutStatus });
    }

    if (method === "GET" && path === "/api/vendor/quotes") {
      const s = userFromAuth(req);
      if (!s || s.user.role !== "vendor") return json(res, 403, { error: "Forbidden" });
      const list = quotes
        .filter((q) => q.vendorId === s.vendorId)
        .map((q) => ({
          id: q.id,
          lead: q.leadId,
          amount: rupee(q.amount),
          status: q.status,
        }));
      return json(res, 200, { quotes: list });
    }

    if (method === "GET" && path === "/api/vendor/earnings") {
      const s = userFromAuth(req);
      if (!s || s.user.role !== "vendor") return json(res, 403, { error: "Forbidden" });
      const vid = s.vendorId;
      const vb = bookings.filter((b) => b.vendorId === vid && b.rawStatus === "completed");
      let totalNet = 0;
      const transactions = vb.map((b) => {
        const c = b.commissionDeducted || commissionOnSubtotal(b.subtotal);
        const net = b.payoutAmount != null ? b.payoutAmount : round2(b.subtotal - c);
        if (b.payoutStatus === "paid") totalNet += net;
        return {
          id: `txn-${b.id.slice(0, 8)}`,
          booking: b.id.slice(-8),
          amount: rupee(b.subtotal),
          commission: rupee(c),
          net: rupee(net),
          date: b.date,
          status:
            b.payoutStatus === "paid" ? "Paid" : b.payoutStatus === "admin_hold" ? "On hold" : "Pending",
          payoutStatus: b.payoutStatus || "pending",
        };
      });
      const pendingCount = vb.filter((b) => b.payoutStatus !== "paid").length;
      return json(res, 200, {
        totalEarnings: rupee(vb.reduce((a, b) => a + (b.subtotal || 0), 0)),
        netPayoutTotal: rupee(totalNet),
        pendingPayments: pendingCount,
        thisMonth: "₹0",
        commissionDisplay: `${companySettings.commissionPercent}% (vendor)`,
        payoutRule: "Automatic payout after trip completion",
        transactions,
      });
    }

    /* ---------- Admin ---------- */
    if (method === "GET" && path === "/api/admin/stats") {
      const s = userFromAuth(req);
      if (!s || s.user.role !== "admin") return json(res, 403, { error: "Forbidden" });
      const cust = [...users.values()].filter((u) => u.role === "customer").length;
      const activeV = [...vendors.values()].filter((v) => v.status === "active").length;
      const commissionPool = bookings.reduce(
        (a, b) => a + (b.commissionDeducted || (b.subtotal ? commissionOnSubtotal(b.subtotal) : 0)),
        0,
      );
      const gross = bookings.reduce((a, b) => a + (b.totalWithGst || 0), 0);
      return json(res, 200, {
        totalUsers: cust,
        activeVendors: activeV,
        totalBookings: bookings.length,
        totalBuses: [...vendors.values()].reduce((a, v) => a + (v.buses?.length || 0), 0),
        revenueDisplay: rupee(gross),
        commissionDisplay: rupee(commissionPool),
        commissionPercent: companySettings.commissionPercent,
        gstEnabled: companySettings.gstEnabled,
      });
    }

    if (method === "GET" && path === "/api/admin/bookings") {
      const s = userFromAuth(req);
      if (!s || s.user.role !== "admin") return json(res, 403, { error: "Forbidden" });
      const list = bookings.map((b) => ({
        id: b.id,
        customer: users.get(b.customerId)?.name || "—",
        vendor: b.vendorName,
        route: `${b.from} → ${b.to}`,
        amount: b.amount,
        subtotal: rupee(b.subtotal ?? 0),
        gstAmount: rupee(b.gstAmount ?? 0),
        totalWithGst: rupee(b.totalWithGst ?? 0),
        paymentType: b.paymentType,
        paymentStatus: paymentLabel(b),
        status: b.rawStatus,
        date: b.date,
        payoutStatus: b.payoutStatus || "pending",
        commissionDeducted: rupee(b.commissionDeducted ?? 0),
        vendorPayout: rupee(b.payoutAmount ?? 0),
      }));
      return json(res, 200, { bookings: list });
    }

    if (method === "PATCH" && path.match(/^\/api\/admin\/bookings\/[^/]+$/)) {
      const s = userFromAuth(req);
      if (!s || s.user.role !== "admin") return json(res, 403, { error: "Forbidden" });
      const id = path.split("/")[4];
      const b = await readBody(req);
      const book = bookings.find((x) => x.id === id);
      if (!book) return json(res, 404, { error: "Not found" });
      const labels = {
        pending_payment: ["Pending payment", "pending_payment"],
        confirmed: ["Confirmed", "confirmed"],
        on_trip: ["On Trip", "on_trip"],
        completed: ["Completed", "completed"],
        cancelled: ["Cancelled", "cancelled"],
      };
      const m = labels[b.status];
      if (!m) return json(res, 400, { error: "Invalid status" });
      if (b.status === "on_trip" || b.status === "completed") {
        const err = assertFullSettlementBeforeTrip(book);
        if (err) return json(res, 400, { error: err });
      }
      book.displayStatus = m[0];
      book.rawStatus = m[1];
      if (b.status === "completed") tryAutoPayout(book);
      return json(res, 200, { ok: true, payoutStatus: book.payoutStatus });
    }

    if (method === "POST" && path.match(/^\/api\/admin\/bookings\/[^/]+\/payout-override$/)) {
      const s = userFromAuth(req);
      if (!s || s.user.role !== "admin") return json(res, 403, { error: "Forbidden" });
      const id = path.split("/")[4];
      const body = await readBody(req);
      const book = bookings.find((x) => x.id === id);
      if (!book) return json(res, 404, { error: "Not found" });
      if (body.action === "hold") {
        book.payoutOverride = "hold";
        book.payoutStatus = "admin_hold";
        return json(res, 200, { ok: true, payoutStatus: book.payoutStatus });
      }
      if (body.action === "release") {
        book.payoutOverride = null;
        book.payoutStatus = "pending";
        tryAutoPayout(book);
        return json(res, 200, { ok: true, payoutStatus: book.payoutStatus });
      }
      return json(res, 400, { error: "Invalid action (use hold or release)" });
    }

    if (method === "GET" && path === "/api/admin/vendors") {
      const s = userFromAuth(req);
      if (!s || s.user.role !== "admin") return json(res, 403, { error: "Forbidden" });
      return json(res, 200, { vendors: [...vendors.values()].map(mapVendorAdmin) });
    }

    if (method === "PATCH" && path.match(/^\/api\/admin\/vendors\/[^/]+$/)) {
      const s = userFromAuth(req);
      if (!s || s.user.role !== "admin") return json(res, 403, { error: "Forbidden" });
      const id = path.split("/")[4];
      const b = await readBody(req);
      const v = vendors.get(id);
      if (!v) return json(res, 404, { error: "Not found" });
      if (["active", "rejected", "blocked", "pending"].includes(b.status)) v.status = b.status;
      return json(res, 200, { ok: true });
    }

    if (method === "GET" && path === "/api/admin/users") {
      const s = userFromAuth(req);
      if (!s || s.user.role !== "admin") return json(res, 403, { error: "Forbidden" });
      const list = [...users.values()]
        .filter((u) => u.role === "customer")
        .map((u) => ({
          id: u.id,
          name: u.name,
          email: u.email,
          phone: u.phone,
          bookings: bookings.filter((b) => b.customerId === u.id).length,
          joined: "2026-01-01",
          status: u.blocked ? "Blocked" : "Active",
          blocked: !!u.blocked,
        }));
      return json(res, 200, { users: list });
    }

    if (method === "PATCH" && path.match(/^\/api\/admin\/users\/[^/]+$/)) {
      const s = userFromAuth(req);
      if (!s || s.user.role !== "admin") return json(res, 403, { error: "Forbidden" });
      const id = path.split("/")[4];
      const b = await readBody(req);
      const u = users.get(id);
      if (!u) return json(res, 404, { error: "Not found" });
      u.blocked = !!b.blocked;
      return json(res, 200, { ok: true });
    }

    if (method === "GET" && path === "/api/admin/payments") {
      const s = userFromAuth(req);
      if (!s || s.user.role !== "admin") return json(res, 403, { error: "Forbidden" });
      const payments = bookings.map((b) => {
        const c = b.commissionDeducted || (b.subtotal ? commissionOnSubtotal(b.subtotal) : 0);
        const pay = b.payoutAmount || (b.subtotal ? round2(b.subtotal - c) : 0);
        let status = "Pending";
        if (b.payoutStatus === "paid") status = "Paid";
        else if (b.payoutStatus === "admin_hold") status = "On hold";
        else if (paymentLabel(b) === "Paid in full") status = "Collected";
        return {
          id: `pay-${b.id}`,
          booking: b.id.slice(-8),
          vendor: b.vendorName,
          amount: rupee(b.totalWithGst || 0),
          commission: rupee(c),
          payout: rupee(pay),
          status,
          date: b.date,
          payoutStatus: b.payoutStatus || "pending",
        };
      });
      return json(res, 200, { payments });
    }

    if (method === "POST" && path.match(/^\/api\/admin\/payments\/[^/]+\/refund$/)) {
      const s = userFromAuth(req);
      if (!s || s.user.role !== "admin") return json(res, 403, { error: "Forbidden" });
      return json(res, 200, { ok: true });
    }

    if (method === "GET" && path === "/api/admin/cms") {
      const s = userFromAuth(req);
      if (!s || s.user.role !== "admin") return json(res, 403, { error: "Forbidden" });
      return json(res, 200, { items: [] });
    }

    if (method === "POST" && path === "/api/admin/cms") {
      const s = userFromAuth(req);
      if (!s || s.user.role !== "admin") return json(res, 403, { error: "Forbidden" });
      return json(res, 200, { ok: true, id: randomUUID() });
    }

    if (method === "PATCH" && path.match(/^\/api\/admin\/cms\/[^/]+$/)) {
      const s = userFromAuth(req);
      if (!s || s.user.role !== "admin") return json(res, 403, { error: "Forbidden" });
      return json(res, 200, { ok: true });
    }

    if (method === "DELETE" && path.match(/^\/api\/admin\/cms\/[^/]+$/)) {
      const s = userFromAuth(req);
      if (!s || s.user.role !== "admin") return json(res, 403, { error: "Forbidden" });
      return json(res, 200, { ok: true });
    }

    if (method === "GET" && path === "/api/admin/settings") {
      const s = userFromAuth(req);
      if (!s || s.user.role !== "admin") return json(res, 403, { error: "Forbidden" });
      return json(res, 200, {
        siteName: companySettings.name,
        legalName: companySettings.name,
        about: companySettings.about,
        operatingLocations: companySettings.operatingLocations,
        contactPhone: companySettings.contactPhone,
        contactEmail: companySettings.contactEmail,
        gstNumber: companySettings.gstNumber,
        gstEnabled: companySettings.gstEnabled,
        gstPercentage: companySettings.gstPercentage,
        commissionPercent: companySettings.commissionPercent,
        quoteWindowHours: companySettings.quoteWindowHours,
        payoutType: companySettings.payoutType,
        payoutTrigger: companySettings.payoutTrigger,
      });
    }

    if (method === "PATCH" && path === "/api/admin/settings") {
      const s = userFromAuth(req);
      if (!s || s.user.role !== "admin") return json(res, 403, { error: "Forbidden" });
      const b = await readBody(req);
      if (typeof b.commissionPercent === "number") companySettings.commissionPercent = b.commissionPercent;
      if (typeof b.quoteWindowHours === "number") companySettings.quoteWindowHours = b.quoteWindowHours;
      if (typeof b.gstEnabled === "boolean") companySettings.gstEnabled = b.gstEnabled;
      if (typeof b.gstPercentage === "number") companySettings.gstPercentage = b.gstPercentage;
      if (typeof b.name === "string") companySettings.name = b.name;
      if (typeof b.about === "string") companySettings.about = b.about;
      if (typeof b.operatingLocations === "string") companySettings.operatingLocations = b.operatingLocations;
      if (typeof b.contactPhone === "string") companySettings.contactPhone = b.contactPhone;
      if (typeof b.contactEmail === "string") companySettings.contactEmail = b.contactEmail;
      if (typeof b.gstNumber === "string") companySettings.gstNumber = b.gstNumber;
      return json(res, 200, { ok: true });
    }

    if (method === "GET" && path === "/api/public/company") {
      return json(res, 200, {
        name: companySettings.name,
        about: companySettings.about,
        operatingLocations: companySettings.operatingLocations,
        contactPhone: companySettings.contactPhone,
        contactEmail: companySettings.contactEmail,
        gstNumber: companySettings.gstNumber,
        gstEnabled: companySettings.gstEnabled,
        gstPercentage: companySettings.gstPercentage,
      });
    }

    if (method === "POST" && path === "/api/admin/notifications") {
      const s = userFromAuth(req);
      if (!s || s.user.role !== "admin") return json(res, 403, { error: "Forbidden" });
      return json(res, 200, { ok: true, queued: 1 });
    }

    return json(res, 404, { error: "Not found" });
  } catch (e) {
    console.error(e);
    return json(res, 500, { error: e?.message || "Server error" });
  }
}

seedAdmin();

http
  .createServer((req, res) => {
    handle(req, res).catch((e) => {
      console.error(e);
      json(res, 500, { error: "Server error" });
    });
  })
  .listen(PORT, () => {
    console.log(`[mock-api] http://127.0.0.1:${PORT} (in-memory; dev only)`);
  });
