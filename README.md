# LovingBible

> Search the Scriptures for yourself.

**LovingBible** is a Bible study companion. Type a belief or question and it shows you what the Bible
actually says — in English, Greek, and Hebrew — **without handing you a verdict**. It lays out the
relevant passages (real verse text, in context), the original-language nuance, and where faithful
Christians differ, then leaves the conviction to you (Acts 17:11; Romans 14:5).

🌐 Live: **https://lovingbible.com**

## The conscience of the product (non-negotiable)

1. **No verdicts.** LovingBible never tells a user they are "right" or "wrong." It is a faithful
   librarian, not a judge.
2. **Real Scripture, never invented.** Verse *text* is fetched from a real Bible source — the model
   only ever proposes references; it never quotes from memory.
3. **No proof-texting.** Where Scripture pulls in different directions, both are shown.
4. **Honest about certainty.** A 4-way calibration: clear / contested / wisdom / unclear.
5. **Points outward.** Always to read in context, pray, and confirm with your local church.

## Stack

- Next.js 16 (App Router, Turbopack) · React 19 · TypeScript
- Tailwind CSS v4
- Anthropic Claude (structured tool-use) for the reasoning layer
- `bible-api.com` (World English Bible) for real verse text
- Deployed on Vercel

## Local development

```bash
npm install
cp .env.example .env.local   # then add your ANTHROPIC_API_KEY
npm run dev
```

Open http://localhost:3000.

### Environment variables

| Variable | Required | Notes |
|---|---|---|
| `ANTHROPIC_API_KEY` | yes | Server-only. The tool returns a graceful 503 until it's set. |
| `EXAMINE_MODEL` | no | Defaults to `claude-sonnet-4-6`. |

## Structure

```
app/
  page.tsx              # home + the Examine tool
  about/page.tsx        # mission + founder's note
  testimonies/page.tsx  # Scripture "Witnesses" + share-your-story invite
  api/examine/route.ts  # Claude call (forced tool-use) + verse resolution
components/             # ExamineTool, SiteHeader, SiteFooter
lib/
  examine.ts            # types, the Rule #1 system prompt, tool schema
  bible.ts              # real-verse fetcher (throttled + retried)
```

## Known gaps / roadmap

See [`SECURITY.md`](./SECURITY.md) §5 for the full list. Highlights:

- **Bundle the Bible text locally** — biggest reliability win (removes dependence on a rate-limited
  public API).
- **Translation:** upgrade WEB → Berean Standard Bible + real Strong's interlinear for the
  original-language layer.
- **Distributed rate limiting** (Upstash) before wide promotion, to protect API spend.
- **CSP header** + a short privacy note before public launch.

---

Built to equip, not to rule.
