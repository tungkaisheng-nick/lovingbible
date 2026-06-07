import type { ResolvedVerse } from "./examine";

// ============================================================
// Verse resolver — fetches REAL Scripture text so nothing the
// user reads is quoted from the model's memory (anti-hallucination).
//
// Primary:  YouVersion Platform API (YOUVERSION_API_KEY env var)
//           Authenticated, WEB translation (version_id 206).
// Fallback: bible-api.com (World English Bible, public domain, no auth).
// Both sources serve the same translation so output is consistent.
// ============================================================

export const TRANSLATION_NAME = "World English Bible (WEB)";

const YV_BASE = "https://api.youversion.com/v1";
const YV_VERSION_ID = 206; // World English Bible on YouVersion

// ============================================================
// Reference parser: "John 3:16" → {usfm, chapter, startVerse, endVerse}
// Supports: single verses, ranges (3:16-17), chapter-only (Psalm 23)
// ============================================================

const BOOK_USFM: Record<string, string> = {
  // ── Old Testament ─────────────────────────────────────────
  genesis: "GEN", gen: "GEN",
  exodus: "EXO", exo: "EXO", ex: "EXO",
  leviticus: "LEV", lev: "LEV",
  numbers: "NUM", num: "NUM",
  deuteronomy: "DEU", deut: "DEU", deu: "DEU",
  joshua: "JOS", josh: "JOS", jos: "JOS",
  judges: "JDG", judg: "JDG", jdg: "JDG",
  ruth: "RUT", rut: "RUT",
  "1 samuel": "1SA", "1 sam": "1SA", "1sa": "1SA",
  "2 samuel": "2SA", "2 sam": "2SA", "2sa": "2SA",
  "1 kings": "1KI", "1 kgs": "1KI", "1ki": "1KI",
  "2 kings": "2KI", "2 kgs": "2KI", "2ki": "2KI",
  "1 chronicles": "1CH", "1 chron": "1CH", "1 chr": "1CH", "1ch": "1CH",
  "2 chronicles": "2CH", "2 chron": "2CH", "2 chr": "2CH", "2ch": "2CH",
  ezra: "EZR", ezr: "EZR",
  nehemiah: "NEH", neh: "NEH",
  esther: "EST", esth: "EST", est: "EST",
  job: "JOB",
  psalms: "PSA", psalm: "PSA", ps: "PSA", psa: "PSA",
  proverbs: "PRO", prov: "PRO", pro: "PRO",
  ecclesiastes: "ECC", eccl: "ECC", ecc: "ECC",
  "song of solomon": "SNG", "song of songs": "SNG", song: "SNG",
  sos: "SNG", sng: "SNG",
  isaiah: "ISA", isa: "ISA",
  jeremiah: "JER", jer: "JER",
  lamentations: "LAM", lam: "LAM",
  ezekiel: "EZK", ezek: "EZK", ezk: "EZK",
  daniel: "DAN", dan: "DAN",
  hosea: "HOS", hos: "HOS",
  joel: "JOL", jol: "JOL",
  amos: "AMO", amo: "AMO",
  obadiah: "OBA", obad: "OBA", oba: "OBA",
  jonah: "JON", jon: "JON",
  micah: "MIC", mic: "MIC",
  nahum: "NAM", nah: "NAM", nam: "NAM",
  habakkuk: "HAB", hab: "HAB",
  zephaniah: "ZEP", zeph: "ZEP", zep: "ZEP",
  haggai: "HAG", hag: "HAG",
  zechariah: "ZEC", zech: "ZEC", zec: "ZEC",
  malachi: "MAL", mal: "MAL",
  // ── New Testament ─────────────────────────────────────────
  matthew: "MAT", matt: "MAT", mat: "MAT",
  mark: "MRK", mrk: "MRK",
  luke: "LUK", luk: "LUK",
  john: "JHN", jhn: "JHN", jn: "JHN",
  acts: "ACT", act: "ACT",
  romans: "ROM", rom: "ROM",
  "1 corinthians": "1CO", "1 cor": "1CO", "1co": "1CO",
  "2 corinthians": "2CO", "2 cor": "2CO", "2co": "2CO",
  galatians: "GAL", gal: "GAL",
  ephesians: "EPH", eph: "EPH",
  philippians: "PHP", phil: "PHP", php: "PHP",
  colossians: "COL", col: "COL",
  "1 thessalonians": "1TH", "1 thess": "1TH", "1th": "1TH",
  "2 thessalonians": "2TH", "2 thess": "2TH", "2th": "2TH",
  "1 timothy": "1TI", "1 tim": "1TI", "1ti": "1TI",
  "2 timothy": "2TI", "2 tim": "2TI", "2ti": "2TI",
  titus: "TIT", tit: "TIT",
  philemon: "PHM", philem: "PHM", phm: "PHM",
  hebrews: "HEB", heb: "HEB",
  james: "JAS", jas: "JAS",
  "1 peter": "1PE", "1 pet": "1PE", "1pe": "1PE",
  "2 peter": "2PE", "2 pet": "2PE", "2pe": "2PE",
  "1 john": "1JN", "1jn": "1JN",
  "2 john": "2JN", "2jn": "2JN",
  "3 john": "3JN", "3jn": "3JN",
  jude: "JUD", jud: "JUD",
  revelation: "REV", rev: "REV", revelations: "REV",
};

interface ParsedRef {
  usfm: string;
  chapter: number;
  startVerse: number;
  endVerse: number;
}

function parseRef(reference: string): ParsedRef | null {
  // Accepts: "John 3:16", "1 Cor 13:4-7", "Psalm 23", "Romans 8:28-30"
  const ref = reference.trim();
  const match = ref.match(/^(\d\s+)?(.+?)\s+(\d+)(?::(\d+)(?:\s*[-–]\s*(\d+))?)?$/i);
  if (!match) return null;

  const [, prefix, name, chStr, svStr, evStr] = match;
  const key = ((prefix ?? "") + name).trim().toLowerCase();
  const usfm = BOOK_USFM[key];
  if (!usfm) return null;

  const chapter = parseInt(chStr, 10);
  const startVerse = svStr ? parseInt(svStr, 10) : 1;
  const endVerse = evStr ? parseInt(evStr, 10) : startVerse;

  if (isNaN(chapter) || isNaN(startVerse) || isNaN(endVerse)) return null;

  return { usfm, chapter, startVerse, endVerse };
}

// ============================================================
// BibleGateway deep-link — always usable as a read-in-context
// fallback even if the text fetch fails.
// ============================================================

function gatewayUrl(reference: string): string {
  return `https://www.biblegateway.com/passage/?search=${encodeURIComponent(
    reference,
  )}&version=WEB`;
}

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

// Strip any HTML tags YouVersion may include in content fields.
function stripHtml(s: string): string {
  return s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

// ============================================================
// Primary: YouVersion Platform API
// Auth: X-YouVersion-App-Token header (YOUVERSION_API_KEY env var)
// WEB = version_id 206.
// For verse ranges we issue one request per verse then join — the
// per-verse endpoint is the documented stable path.
// ============================================================

async function fetchFromYouVersion(
  reference: string,
  apiKey: string,
): Promise<ResolvedVerse | null> {
  const parsed = parseRef(reference);
  if (!parsed) return null;

  const { usfm, chapter, startVerse, endVerse } = parsed;
  // Cap at 10 verses per reference to keep latency predictable.
  const lastVerse = Math.min(endVerse, startVerse + 9);

  const texts: string[] = [];

  for (let v = startVerse; v <= lastVerse; v++) {
    try {
      const url =
        `${YV_BASE}/bible/books/${usfm}/chapters/${chapter}/verses/${v}` +
        `?version_id=${YV_VERSION_ID}`;

      const res = await fetch(url, {
        headers: {
          "X-YouVersion-App-Token": apiKey,
          Accept: "application/json",
        },
        signal: AbortSignal.timeout(8000),
        // Scripture text doesn't change — cache aggressively.
        next: { revalidate: 86400 * 30 },
      });

      if (!res.ok) {
        // Non-2xx on first verse → assume key/endpoint problem, fall back.
        if (v === startVerse) return null;
        break;
      }

      const data = await res.json();

      // Try multiple field paths in case the API response shape changes.
      const raw =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (data as any)?.data?.content ??
        (data as any)?.content ??
        (data as any)?.text ??
        (data as any)?.verses?.[0]?.text ??
        (data as any)?.data?.text ??
        "";

      const text = stripHtml(String(raw));
      if (text) texts.push(text);
    } catch {
      // Network error on first verse → fall back immediately.
      if (v === startVerse) return null;
      break;
    }
  }

  if (texts.length === 0) return null;

  return {
    reference,
    text: texts.join(" "),
    url: gatewayUrl(reference),
    ok: true,
  };
}

// ============================================================
// Fallback: bible-api.com (no auth, WEB, handles text ranges natively)
// ============================================================

async function fetchFromBibleApi(
  reference: string,
  attempt = 0,
): Promise<ResolvedVerse> {
  const url = `https://bible-api.com/${encodeURIComponent(reference)}?translation=web`;
  const fail: ResolvedVerse = {
    reference,
    text: "",
    url: gatewayUrl(reference),
    ok: false,
  };

  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      next: { revalidate: 86400 * 30 },
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      if ((res.status === 429 || res.status >= 500) && attempt < 3) {
        await sleep(450 * (attempt + 1));
        return fetchFromBibleApi(reference, attempt + 1);
      }
      return fail;
    }

    const data = (await res.json()) as { text?: string; reference?: string };
    const text = (data.text ?? "").replace(/\s+/g, " ").trim();
    return {
      reference: data.reference ?? reference,
      text,
      url: gatewayUrl(reference),
      ok: text.length > 0,
    };
  } catch {
    if (attempt < 3) {
      await sleep(450 * (attempt + 1));
      return fetchFromBibleApi(reference, attempt + 1);
    }
    return fail;
  }
}

// ============================================================
// Combined resolver: YouVersion → bible-api.com fallback
// ============================================================

async function fetchOne(reference: string): Promise<ResolvedVerse> {
  const apiKey = process.env.YOUVERSION_API_KEY;

  if (apiKey) {
    const yv = await fetchFromYouVersion(reference, apiKey);
    if (yv) return yv;
    // Fall through — YouVersion unavailable for this reference.
  }

  return fetchFromBibleApi(reference);
}

/**
 * Resolve a list of references to real verse text.
 * Concurrency pool (4 workers) prevents burst rate-limit trips.
 */
export async function resolveVerses(
  references: string[],
): Promise<Record<string, ResolvedVerse>> {
  const unique = Array.from(
    new Set(references.map((r) => r.trim()).filter(Boolean)),
  ).slice(0, 24); // safety cap — 24 refs × up to 10 verses each

  const map: Record<string, ResolvedVerse> = {};
  const CONCURRENCY = 4;
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
