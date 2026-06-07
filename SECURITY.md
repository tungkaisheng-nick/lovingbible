# SECURITY.md — Examine

Security posture for **Examine** (Bible study companion). Mapped to OWASP Top 10, OWASP Top 10 for LLM Apps, CSA Cyber Essentials, ISO 27001, and PDPA. This is the living security record for the project — keep the Evidence Log current.

## 1. What this app is
A Next.js web app. A user types a belief/question; the server calls the Anthropic API (Claude) with a strict, no-verdict system prompt to produce a structured examination; the server then fetches **real** verse text from a public Bible API so nothing shown is quoted from the model's memory. No accounts, no database, no personal data stored.

## 2. Secrets
- `ANTHROPIC_API_KEY` is **server-only** (read in `app/api/examine/route.ts`, never exposed to the client). Set it in Vercel → Settings → Environment Variables. Never commit it; `.env*` is gitignored.
- No other secrets at present.

## 3. Trust boundaries & GenAI/LLM controls (OWASP LLM)
- **Prompt injection (LLM01):** user input is passed only as the message; the system prompt is fixed and instructs Rule #1 (no verdicts) and anti-proof-texting. The model's output is constrained to a **tool schema** (structured JSON), not free prose, which limits injection blast radius.
- **Output integrity / hallucination:** verse *text* is never trusted from the model — only references are, and they are resolved against a real Bible dataset (`lib/bible.ts`). References that don't resolve are shown as "read in context" links rather than fabricated text.
- **Least privilege / tools:** the model has exactly one tool (`present_examination`) and no ability to call out, browse, or execute.
- **Human-in-the-loop:** by design the product gives no verdict and repeatedly points the user to read context, pray, and confirm with their church.
- **Input limits:** query capped at 500 chars, min 3 (`zod`).

## 4. Web app controls (OWASP Top 10)
- Security headers set in `next.config.ts` (HSTS, nosniff, frame-deny, referrer, permissions policy).
- Input validation with `zod`.
- Soft rate limit (8 req / 60s per IP, in-memory).
- No SQL / no DB → no injection surface. No auth → no broken-auth surface.

## 5. Known gaps / pre-production TODO
- ⚠️ **Rate limiting is per-instance (in-memory).** Serverless instances are ephemeral, so this is best-effort only. Before any real promotion/spend exposure, move to a **distributed limiter** (e.g. Upstash Redis) to protect the API key from cost-abuse.
- ⚠️ **Content Security Policy** not yet set (would harden against XSS). Add a CSP header before production.
- ⚠️ **Cost guardrails:** consider a daily spend cap / alert on the Anthropic key.
- ⚠️ Original-language notes in the MVP are model-generated study-level notes — to be upgraded to a real lexicon (BSB interlinear + Strong's) for full trustworthiness.

## 6. PDPA
- No personal data is collected or stored. Queries are sent to Anthropic for processing (their data policy applies) and to a Bible API for verse lookup. Add a short privacy note before public launch.

## 7. Pre-Ship Gate (run before production release)
- [ ] gitleaks (secrets)
- [ ] npm audit (deps)
- [ ] semgrep (SAST)
- [ ] /security-review
- [ ] Distributed rate limiting in place
- [ ] CSP header added

## Evidence Log
| Date | Check | Result | Notes |
|------|-------|--------|-------|
| 2026-06-07 | Initial scaffold | n/a | Security headers, input validation, secret hygiene, LLM controls in place from day one. MVP — gaps in §5 tracked. |
