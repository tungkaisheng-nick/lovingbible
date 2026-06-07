"use client";

import { useState, useEffect } from "react";
import type {
  ExamineResponse,
  Category,
  Perspective,
  LanguageNote,
  ResolvedVerse,
} from "@/lib/examine";

const EXAMPLES = [
  "Is Jesus the only way to God?",
  "Should Christians drink alcohol?",
  "Once saved, always saved?",
  "Does God promise me health and wealth?",
];

const CATEGORY_STYLE: Record<Category, { dot: string; chip: string }> = {
  clear: { dot: "bg-emerald-600", chip: "border-emerald-600/30 bg-emerald-50 text-emerald-700" },
  contested: { dot: "bg-accent", chip: "border-accent/30 bg-accent-soft text-accent-deep" },
  wisdom: { dot: "bg-amber-500", chip: "border-amber-500/30 bg-amber-50 text-amber-700" },
  unclear: { dot: "bg-stone-400", chip: "border-stone-300 bg-stone-50 text-stone-600" },
};

const STEPS = [
  "Searching the Scriptures",
  "Weighing what they say",
  "Checking the Greek & Hebrew",
  "Gathering the passages",
];

export default function ExamineTool() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ExamineResponse | null>(null);

  async function run(q: string) {
    const text = q.trim();
    if (text.length < 3 || loading) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/examine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: text }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error || "Something went wrong. Please try again.");
      else setResult(data as ExamineResponse);
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setResult(null);
    setError(null);
    setQuery("");
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          run(query);
        }}
      >
        <div className="card flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            maxLength={500}
            placeholder="Type a belief or question… e.g. “Is the Trinity in the Bible?”"
            className="w-full flex-1 bg-transparent px-3 py-3 text-base text-ink placeholder:text-muted/60 focus:outline-none sm:text-lg"
          />
          <button
            type="submit"
            disabled={loading || query.trim().length < 3}
            className="shrink-0 rounded-xl bg-accent px-6 py-3 font-bold text-white transition hover:bg-accent-deep disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? "Examining…" : "Examine"}
          </button>
        </div>
      </form>

      {!result && !loading && (
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              onClick={() => {
                setQuery(ex);
                run(ex);
              }}
              className="rounded-full border border-line bg-card px-3.5 py-1.5 text-sm text-muted transition hover:border-accent/50 hover:text-ink"
            >
              {ex}
            </button>
          ))}
        </div>
      )}

      {loading && <LoadingState />}
      {error && <div className="card mt-6 p-5 text-muted">{error}</div>}
      {result && <ResultView data={result} onReset={reset} />}
    </div>
  );
}

function LoadingState() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStep((s) => Math.min(s + 1, STEPS.length - 1)), 4500);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="card mt-6 p-6">
      <div className="flex items-center gap-3">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-accent/30 border-t-accent" />
        <p className="font-bold text-ink">{STEPS[step]}…</p>
      </div>
      <div className="mt-4 space-y-2">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2 text-sm">
            <span className={`h-1.5 w-1.5 rounded-full transition ${i <= step ? "bg-accent" : "bg-line-strong"}`} />
            <span className={i <= step ? "text-ink" : "text-muted/60"}>{s}</span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-muted">
        This takes a few seconds — LovingBible is reading real passages, not guessing.
      </p>
    </div>
  );
}

function firstHeroVerse(
  perspectives: Perspective[],
  verses: Record<string, ResolvedVerse>,
): ResolvedVerse | null {
  for (const p of perspectives) {
    for (const ref of p.references || []) {
      const v = verses[ref.trim()];
      if (v?.ok) return v;
    }
  }
  return null;
}

function ResultView({ data, onReset }: { data: ExamineResponse; onReset: () => void }) {
  const { examination: ex, verses, translation } = data;
  const style = CATEGORY_STYLE[ex.category] || CATEGORY_STYLE.unclear;
  const hero = firstHeroVerse(ex.perspectives, verses);
  const [open, setOpen] = useState<Set<number>>(new Set([0]));
  const [showOL, setShowOL] = useState(false);
  const [shared, setShared] = useState(false);

  function toggle(i: number) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  async function share() {
    const text = `I examined “${ex.topic}” on LovingBible — see the Scriptures for yourself.`;
    const url = "https://lovingbible.com";
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "LovingBible", text, url });
      } catch {
        /* user cancelled */
      }
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(`${text} ${url}`);
      setShared(true);
      setTimeout(() => setShared(false), 2500);
    }
  }

  return (
    <div className="fade-up mt-8 space-y-6">
      {/* ANCHOR — badge + question + the heart of it */}
      <div>
        <span
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider ${style.chip}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
          {ex.category_label}
        </span>
        <h2 className="display mt-4 text-3xl uppercase leading-[1.05] text-ink sm:text-4xl">
          {ex.topic}
        </h2>
        <p className="mt-4 text-xl font-bold leading-snug text-ink">{ex.takeaway}</p>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted">{ex.summary}</p>
      </div>

      {/* HERO VERSE — one focal passage */}
      {hero && (
        <div className="rounded-2xl border border-accent/20 bg-accent-soft/50 p-6">
          <p className="scripture-quote font-medium text-ink">“{hero.text}”</p>
          <a
            href={hero.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm font-bold text-accent hover:text-accent-deep hover:underline"
          >
            {hero.reference} ↗
          </a>
        </div>
      )}

      {/* WHAT SCRIPTURE SAYS — scannable accordion */}
      <div>
        <p className="label mb-3 text-accent">What Scripture says</p>
        <div className="space-y-3">
          {ex.perspectives.map((p, i) => (
            <PerspectiveItem
              key={i}
              p={p}
              verses={verses}
              isOpen={open.has(i)}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>
      </div>

      {/* GO DEEPER — original languages, collapsed */}
      {ex.original_language && ex.original_language.length > 0 && (
        <div className="card overflow-hidden">
          <button
            onClick={() => setShowOL((v) => !v)}
            className="flex w-full items-center justify-between gap-4 p-5 text-left"
          >
            <span className="label text-accent">
              Go deeper · the Greek &amp; Hebrew ({ex.original_language.length})
            </span>
            <Chevron open={showOL} />
          </button>
          {showOL && (
            <div className="grid gap-4 px-5 pb-5 sm:grid-cols-2">
              {ex.original_language.map((l, i) => (
                <LanguageCard key={i} l={l} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* EXAMINE FOR YOURSELF */}
      {ex.reflection_questions?.length > 0 && (
        <div className="card bg-paper-2 p-6">
          <p className="label mb-3 text-accent">Examine it for yourself</p>
          <ul className="space-y-2.5">
            {ex.reflection_questions.map((q, i) => (
              <li key={i} className="flex gap-3 text-ink/90">
                <span className="mt-1 font-bold text-accent">—</span>
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {ex.caution && (
        <p className="border-t border-line pt-5 text-sm leading-relaxed text-muted">{ex.caution}</p>
      )}

      {/* NEXT ACTIONS */}
      <div className="flex flex-wrap items-center gap-3 pt-1">
        <button
          onClick={onReset}
          className="rounded-xl bg-accent px-5 py-3 font-bold text-white transition hover:bg-accent-deep"
        >
          Examine another
        </button>
        <button
          onClick={share}
          className="rounded-xl border border-line-strong px-5 py-3 font-bold text-ink transition hover:border-accent/50"
        >
          {shared ? "Link copied ✓" : "Share this"}
        </button>
      </div>

      <p className="text-xs text-muted/70">
        Scripture shown from the {translation}. LovingBible never gives a verdict — read each passage in
        its full context, pray, and confirm with your local church.
      </p>
    </div>
  );
}

function PerspectiveItem({
  p,
  verses,
  isOpen,
  onToggle,
}: {
  p: Perspective;
  verses: Record<string, ResolvedVerse>;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="card overflow-hidden">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 p-5 text-left"
      >
        <h3 className="text-base font-bold text-ink sm:text-lg">{p.stance}</h3>
        <Chevron open={isOpen} />
      </button>
      {isOpen && (
        <div className="px-5 pb-5">
          <p className="text-muted">{p.explanation}</p>
          {p.references?.length > 0 && (
            <div className="mt-4 space-y-3">
              {p.references.map((ref) => {
                const v = verses[ref.trim()];
                return (
                  <blockquote key={ref} className="accent-bar py-1">
                    {v?.ok ? (
                      <p className="scripture-quote text-ink/90">“{v.text}”</p>
                    ) : (
                      <p className="text-sm italic text-muted">(read this passage in full)</p>
                    )}
                    <a
                      href={
                        v?.url ||
                        `https://www.biblegateway.com/passage/?search=${encodeURIComponent(ref)}&version=WEB`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block text-sm font-bold text-accent hover:text-accent-deep hover:underline"
                    >
                      {v?.reference || ref} ↗
                    </a>
                  </blockquote>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function LanguageCard({ l }: { l: LanguageNote }) {
  return (
    <div className="rounded-xl border border-line bg-paper p-5">
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-2xl font-bold text-accent">{l.original}</span>
        <span className="rounded-full border border-line px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted">
          {l.language}
          {l.strongs ? ` · ${l.strongs}` : ""}
        </span>
      </div>
      <p className="mt-1 text-sm text-muted">
        <span className="italic">{l.transliteration}</span> — {l.gloss}
      </p>
      <p className="mt-3 text-sm text-ink/90">
        English “<span className="font-bold text-accent">{l.word_english}</span>” in {l.reference}:{" "}
        {l.insight}
      </p>
    </div>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      className={`shrink-0 text-muted transition-transform ${open ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
