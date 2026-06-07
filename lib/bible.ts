import type { ResolvedVerse } from "./examine";

// ============================================================
// Verse resolver — fetches REAL Scripture text so nothing the
// user reads is quoted from the model's memory (anti-hallucination).
//
// MVP source: bible-api.com (World English Bible — free, modern,
// public domain). Upgrade path: Berean Standard Bible + Strong's
// interlinear once we wire a richer dataset.
// ============================================================

const TRANSLATION = "web"; // World English Bible
export const TRANSLATION_NAME = "World English Bible (WEB)";

function gatewayUrl(reference: string): string {
  // Link out so the user can read the full passage in context.
  return `https://www.biblegateway.com/passage/?search=${encodeURIComponent(
    reference,
  )}&version=WEB`;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function fetchOne(reference: string, attempt = 0): Promise<ResolvedVerse> {
  const url = `https://bible-api.com/${encodeURIComponent(reference)}?translation=${TRANSLATION}`;
  const fail = { reference, text: "", url: gatewayUrl(reference), ok: false };
  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      // Cache verse lookups — Scripture text doesn't change.
      next: { revalidate: 60 * 60 * 24 * 30 },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      // bible-api.com rate-limits bursts (429); back off and retry.
      if ((res.status === 429 || res.status >= 500) && attempt < 3) {
        await sleep(450 * (attempt + 1));
        return fetchOne(reference, attempt + 1);
      }
      return fail;
    }
    const data = (await res.json()) as { text?: string; reference?: string };
    const text = (data.text || "").replace(/\s+/g, " ").trim();
    return {
      reference: data.reference || reference,
      text,
      url: gatewayUrl(reference),
      ok: text.length > 0,
    };
  } catch {
    if (attempt < 3) {
      await sleep(450 * (attempt + 1));
      return fetchOne(reference, attempt + 1);
    }
    return fail;
  }
}

/**
 * Resolve references to real verse text. Runs with a small concurrency pool so
 * we don't trip bible-api.com's burst rate limit (which silently empties verses).
 */
export async function resolveVerses(
  references: string[],
): Promise<Record<string, ResolvedVerse>> {
  const unique = Array.from(
    new Set(references.map((r) => r.trim()).filter(Boolean)),
  ).slice(0, 24); // safety cap

  const map: Record<string, ResolvedVerse> = {};
  const CONCURRENCY = 2;
  let cursor = 0;

  async function worker() {
    while (cursor < unique.length) {
      const ref = unique[cursor++];
      map[ref] = await fetchOne(ref);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, unique.length) }, worker),
  );
  return map;
}
