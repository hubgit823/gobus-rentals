import { cp, rm, readdir, writeFile } from "node:fs/promises";
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

  // TanStack Start client build does not emit dist/index.html by default.
  // Generate an SPA entrypoint that loads the hashed main bundle.
  const assetsDir = path.join(distDir, "assets");
  const assetFiles = await readdir(assetsDir);
  const mainJs = assetFiles.find((name) => /^main-.*\.js$/.test(name));
  const mainCss = assetFiles.find((name) => /^styles-.*\.css$/.test(name));

  if (!mainJs) {
    throw new Error("[prepare-vercel-spa] Could not find main-*.js in dist/assets.");
  }

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>LuxuryBusRental</title>
    ${mainCss ? `<link rel="stylesheet" href="/assets/${mainCss}" />` : ""}
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/assets/${mainJs}"></script>
  </body>
</html>
`;

  await writeFile(path.join(distDir, "index.html"), html, "utf8");

  console.log("[prepare-vercel-spa] Static dist prepared at dist/ (index.html + assets).");
}

await prepareStaticDist();
