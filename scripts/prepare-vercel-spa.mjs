import { cp, rm, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const clientDir = path.join(distDir, "client");
const serverDir = path.join(distDir, "server");

async function exists(p) {
  try {
    await readdir(p);
    return true;
  } catch {
    return false;
  }
}

async function prepareStaticDist() {
  const hasClient = await exists(clientDir);
  if (!hasClient) {
    console.warn("[prepare-vercel-spa] dist/client not found; skipping flatten step.");
    return;
  }

  // Move client build output to dist root so Vercel static hosting can use dist/index.html.
  await cp(clientDir, distDir, { recursive: true, force: true });

  // Remove TanStack Start server/client folders for a static-only deploy artifact.
  await rm(clientDir, { recursive: true, force: true });
  await rm(serverDir, { recursive: true, force: true });

  const rootFiles = await readdir(distDir);
  if (!rootFiles.includes("index.html")) {
    throw new Error("[prepare-vercel-spa] dist/index.html not found after copying dist/client.");
  }

  console.log("[prepare-vercel-spa] Static dist prepared at dist/ (index.html + assets).");
}

await prepareStaticDist();
