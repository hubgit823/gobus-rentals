/**
 * End-to-end API smoke test: customer signup → lead → vendor register → admin approves
 * → vendor quotes → customer accepts → booking visible to customer, vendor, admin.
 * Spawns mock-api on MOCK_API_PORT (default 3099) so it does not clash with a running dev server.
 */
import { spawn } from "node:child_process";
import { createConnection } from "node:net";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const PORT = parseInt(process.env.MOCK_API_PORT || "3099", 10);

function waitForPort(port, host = "127.0.0.1", timeoutMs = 8000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const tryOnce = () => {
      const s = createConnection({ port, host }, () => {
        s.end();
        resolve(undefined);
      });
      s.on("error", () => {
        s.destroy();
        if (Date.now() - start > timeoutMs) reject(new Error(`Timeout waiting for port ${port}`));
        else setTimeout(tryOnce, 100);
      });
    };
    tryOnce();
  });
}

async function api(path, init = {}) {
  const url = `http://127.0.0.1:${PORT}${path}`;
  const headers = { "Content-Type": "application/json", ...(init.headers || {}) };
  const res = await fetch(url, { ...init, headers });
  const text = await res.text();
  let data = {};
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }
  }
  if (!res.ok) {
    throw new Error(`${init.method || "GET"} ${path} → ${res.status}: ${data.error || text}`);
  }
  return data;
}

const child = spawn(process.execPath, [join(root, "mock-api", "server.mjs")], {
  cwd: root,
  env: { ...process.env, MOCK_API_PORT: String(PORT) },
  stdio: ["ignore", "pipe", "pipe"],
});

let stderr = "";
child.stderr?.on("data", (c) => {
  stderr += c.toString();
});

try {
  await waitForPort(PORT);
  const tag = Date.now();
  const custEmail = `cust_${tag}@e2e.test`;
  const vendEmail = `vendor_${tag}@e2e.test`;
  const password = "testpass123";

  // 1) Customer signup
  const cust = await api("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({
      name: "E2E Customer",
      email: custEmail,
      phone: "9999999999",
      password,
    }),
  });
  const custToken = cust.token;
  if (cust.user.role !== "customer") throw new Error("expected customer role");

  // 2) Vendor register (pending)
  const vend = await api("/api/auth/vendor/register", {
    method: "POST",
    body: JSON.stringify({
      name: "E2E Operator",
      email: vendEmail,
      phone: "9888888888",
      password,
      companyName: "E2E Bus Co",
      gstNumber: "GST",
      panNumber: "PAN",
      address: "Test City",
      operatingCities: "Mumbai, Pune",
      bankHolder: "E2E",
      bankAccount: "123",
      bankIfsc: "IFSC",
      bankName: "Bank",
    }),
  });
  const vendToken = vend.token;
  const vendorId = vend.user.vendorId;

  // 3) Admin login
  const admin = await api("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email: "admin@luxurybus.dev", password: "admin123" }),
  });
  const adminToken = admin.token;

  // 4) Approve vendor
  const { vendors } = await api("/api/admin/vendors", {
    headers: { Authorization: `Bearer ${adminToken}` },
  });
  const row = vendors.find((v) => v.id === vendorId);
  if (!row) throw new Error("new vendor not listed for admin");
  await api(`/api/admin/vendors/${vendorId}`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${adminToken}` },
    body: JSON.stringify({ status: "active" }),
  });

  // 5) Customer submits lead (authenticated so quotes link to customer)
  const leadRes = await api("/api/leads", {
    method: "POST",
    headers: { Authorization: `Bearer ${custToken}` },
    body: JSON.stringify({
      pickup: "Mumbai",
      drop: "Pune",
      journeyDate: "2026-05-01",
      journeyTime: "09:00",
      passengers: 24,
      busType: "32 Seater Bus",
      acPreference: "AC",
      purpose: "Corporate",
      notes: "E2E run",
      guestName: "E2E Customer",
      guestPhone: "9999999999",
    }),
  });
  if (leadRes.notifiedVendors < 1) throw new Error("expected at least one active vendor notified");

  // 6) Vendor sees lead
  const leadsJson = await api("/api/vendor/leads", {
    headers: { Authorization: `Bearer ${vendToken}` },
  });
  const leadId = leadsJson.leads?.find((l) => l.status === "New")?.id;
  if (!leadId) throw new Error("vendor should see a New lead");

  // 7) Vendor sends quote
  const quoteRes = await api("/api/vendor/quotes", {
    method: "POST",
    headers: { Authorization: `Bearer ${vendToken}` },
    body: JSON.stringify({
      leadId,
      amount: 45000,
      inclusions: "Driver, fuel",
      terms: "E2E",
    }),
  });
  if (!quoteRes.quoteId) throw new Error("quote id missing");

  // 8) Customer sees quote and accepts
  const quotesList = await api("/api/customer/quotes", {
    headers: { Authorization: `Bearer ${custToken}` },
  });
  const quoteId = quotesList.quotes?.[0]?.id;
  if (!quoteId) throw new Error("customer should see a pending quote");
  await api(`/api/customer/quotes/${quoteId}/accept`, {
    method: "POST",
    headers: { Authorization: `Bearer ${custToken}` },
  });

  // 9) Booking exists for customer + admin
  const custBook = await api("/api/customer/bookings", {
    headers: { Authorization: `Bearer ${custToken}` },
  });
  if (custBook.bookings?.length !== 1) throw new Error(`customer bookings: want 1, got ${custBook.bookings?.length}`);

  const adminBook = await api("/api/admin/bookings", {
    headers: { Authorization: `Bearer ${adminToken}` },
  });
  if (adminBook.bookings?.length !== 1) throw new Error(`admin bookings: want 1, got ${adminBook.bookings?.length}`);

  const vendBook = await api("/api/vendor/bookings", {
    headers: { Authorization: `Bearer ${vendToken}` },
  });
  if (vendBook.bookings?.length !== 1) throw new Error(`vendor bookings: want 1, got ${vendBook.bookings?.length}`);

  console.log("e2e:demo OK — customer lead → vendor quote → accept → booking visible on customer, vendor, admin panels.");
} catch (e) {
  console.error("e2e:demo FAILED:", e.message);
  if (stderr) console.error(stderr);
  process.exitCode = 1;
} finally {
  child.kill("SIGTERM");
}
