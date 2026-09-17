import { buildLlmsIndex } from "@/lib/llms";

/** Built at deploy from the catalog and the rubric; see lib/llms.ts for why. */
export const dynamic = "force-static";

export function GET() {
  return new Response(buildLlmsIndex(), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
