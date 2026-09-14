import { permanentRedirect } from "next/navigation";

/**
 * /preview is where the console landing lived while it was being looked at.
 * It is the homepage now, so this is one page making the same pitch as
 * another on one domain — the duplicate-content problem the noindex here was
 * holding off.
 *
 * Redirecting rather than deleting: the URL was shared while it was the way
 * to see the new design, and a 404 is a worse answer to one of those links
 * than the page they were pointed at.
 */
export default function PreviewRedirect(): never {
  permanentRedirect("/");
}
