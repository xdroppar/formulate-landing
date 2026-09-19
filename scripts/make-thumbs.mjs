#!/usr/bin/env node
/**
 * Small list thumbnails for the gear catalogs that render photos in rows.
 *
 * WHY. next.config sets `images.unoptimized: true` (the Vercel image quota), so
 * <Image sizes="64px"> is a promise nothing keeps: the browser gets the file
 * as stored. The skincare and sleep lists showed full product photography in
 * 64px squares, 2.4 MB of images on /skincare/best/* and 1.9 MB on /sleep/best/*;
 * one Olay PNG alone was 1.26 MB. Supplements solved this long ago with a
 * pre-made thumb.webp beside each primary (lib/products thumbUrl); this is the
 * same idea for catalogs whose files are named by the retailer.
 *
 * For every image_url in the catalogs below that exists under public/, writes
 * `<same name>.thumb.webp` beside it: at most EDGE px on the long side, WebP.
 * Every thumb is re-encoded on every run (~15 s for ~900) and written only if
 * its bytes changed. Not an mtime check: copyFileSync keeps the source's
 * timestamp on Windows and git checkouts reset them, so a photo replaced under
 * the same name could look older than its stale thumb. The encoder is
 * deterministic (same input, same bytes), so an unchanged photo leaves git
 * clean.
 *
 * Run by scripts/sync-from-web.mjs after it copies gear images, so new
 * products arrive with thumbs (including the scheduled sleep deploy, which
 * runs that sync and keeps everything under public/sleep-assets/). A missing
 * thumb is never an error on the page: lib/thumbs falls back to the original.
 *
 *   node scripts/make-thumbs.mjs
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
export const THUMB_CATALOGS = ["skin-catalog.json", "sleep-catalog.json"];
// Rendered at 48–64px; 192 covers a 3x phone screen.
const EDGE = 192;
const QUALITY = 78;

export const thumbPathFor = (rel) => rel.replace(/\.(jpe?g|png|webp|avif|gif)$/i, "") + ".thumb.webp";

function catalogRows(root, file) {
  const path = join(root, "src/data", file);
  if (!existsSync(path)) return [];
  const d = JSON.parse(readFileSync(path, "utf8"));
  return Array.isArray(d) ? d : (d.products ?? []);
}

export async function makeThumbs({ root = ROOT, catalogs = THUMB_CATALOGS, log = console.log } = {}) {
  let sharp;
  try {
    sharp = (await import("sharp")).default;
  } catch {
    log("  thumbs: sharp is not installed here — skipped; pages fall back to full images.");
    return { made: 0, fresh: 0, failed: 0, skipped: true };
  }
  let made = 0;
  let fresh = 0;
  const failed = [];
  for (const file of catalogs) {
    const seen = new Set();
    for (const p of catalogRows(root, file)) {
      const u = p.image_url;
      if (typeof u !== "string" || !u.startsWith("/")) continue;
      const rel = u.split("?")[0].slice(1);
      if (seen.has(rel) || /\.thumb\.webp$/.test(rel)) continue;
      seen.add(rel);
      const src = join(root, "public", rel);
      if (!existsSync(src)) continue;
      const out = join(root, "public", thumbPathFor(rel));
      try {
        const buf = await sharp(src, { failOn: "none" })
          .rotate()
          .resize(EDGE, EDGE, { fit: "inside", withoutEnlargement: true })
          .webp({ quality: QUALITY })
          .toBuffer();
        if (existsSync(out) && buf.equals(readFileSync(out))) {
          fresh++;
          continue;
        }
        writeFileSync(out, buf);
        made++;
      } catch (e) {
        failed.push(`${rel}: ${e.message}`);
      }
    }
  }
  log(`  thumbs: ${made} written, ${fresh} unchanged${failed.length ? `, ${failed.length} failed` : ""}`);
  for (const f of failed.slice(0, 5)) log(`    ! ${f}`);
  return { made, fresh, failed: failed.length, skipped: false };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const r = await makeThumbs();
  process.exit(r.failed ? 1 : 0);
}
