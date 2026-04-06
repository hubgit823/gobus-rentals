import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const input = path.join(root, "public/images/logo.jpeg");
const outPng = path.join(root, "public/images/logo.png");

const buf = readFileSync(input);
const meta = await sharp(buf).metadata();
const trimmed = await sharp(buf)
  .trim({
    threshold: 12,
    lineArt: false,
  })
  .png({ compressionLevel: 9, effort: 9 })
  .toBuffer();

writeFileSync(outPng, trimmed);
const outMeta = await sharp(trimmed).metadata();
console.log("logo.jpeg:", meta.width, "x", meta.height);
console.log("logo.png (trimmed):", outMeta.width, "x", outMeta.height);
