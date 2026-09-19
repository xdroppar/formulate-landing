import { existsSync } from "node:fs";
import { join } from "node:path";

/**
 * The src for a gear photo shown small in a list row. Server-only (reads the
 * disk at render, which is build time for these static pages).
 *
 * Returns the `.thumb.webp` scripts/make-thumbs.mjs writes beside the photo,
 * or the photo itself when there is none yet. A new product that arrived
 * before its thumb is a heavier row, never a broken one.
 *
 * ENCODED, because the catalogs hold raw disk paths. Three skincare folders
 * are named for a percentage ("naturium-retinol-complex-serum-25%"), and a raw
 * "%" followed by something that is not two hex digits is an invalid URL:
 * Vercel answered 400 and those rows showed a broken image (2026-09-18).
 * Each path segment is encoded once, here, for thumb and fallback alike.
 */
const PUBLIC = join(process.cwd(), "public");
const memo = new Map<string, string>();

const encodePath = (p: string) => p.split("/").map(encodeURIComponent).join("/");

export function listThumb(url: string): string {
  const hit = memo.get(url);
  if (hit) return hit;
  let out = url;
  if (url.startsWith("/")) {
    const path = url.split("?")[0];
    const thumb = path.replace(/\.(jpe?g|png|webp|avif|gif)$/i, "") + ".thumb.webp";
    let useThumb = false;
    try {
      useThumb = thumb !== path && existsSync(join(PUBLIC, thumb));
    } catch {
      // no filesystem here: the original is always a working answer
    }
    out = encodePath(useThumb ? thumb : path);
  }
  memo.set(url, out);
  return out;
}
