"use client";

import { useState } from "react";
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

const CATEGORY_STYLE: Record<Category, { dot: string; ring: string }> = {
  clear: { dot: "bg-emerald-400", ring: "border-emerald-400/30 text-emerald-200/90" },
  contested: { dot: "bg-gold", ring: "border-gold/40 text-gold-soft" },
  wisdom: { dot: "bg-sky-400", ring: "border-sky-400/30 text-sky-200/90" },
  unclear: { dot: "bg-muted", ring: "border-line-strong text-muted" },
};

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
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
      } else {
        setResult(data as ExamineResponse);
      }
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          run(query);
        }}
        className="relative"
      >
        <div className="flex flex-col gap-3 rounded-2xl border border-line-strong bg-ink-2/70 p-3 shadow-2xl backdrop-blur-sm sm:flex-row sm:items-center sm:gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            maxLength={500}
            placeholder="Type a belief or question… e.g. “Is the Trinity in the Bible?”"
            className="w-full flex-1 bg-transparent px-3 py-3 text-base text-cream placeholder:text-muted/70 focus:outline-none sm:text-lg"
          />
          <button
            type="submit"
            disabled={loading || query.trim().length < 3}
            className="shrink-0 rounded-xl bg-gold px-6 py-3 font-semibold text-ink transition hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? "Examining…" : "Examine"}
          </button>
        </div>
      </form>

      {!result && !loading && (
        <div className="mt-4 flex flex-wrap gap-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              onClick={() => {
                setQuery(ex);
                run(ex);
              }}
              className="rounded-full border border-line px-3.5 py-1.5 text-sm text-muted transition hover:border-gold/50 hover:text-cream"
            >
              {ex}
            </button>
          ))}
        </div>
      )}

      {loading && <LoadingState />}
      {error && (
        <div className="mt-6 rounded-xl border border-line-strong bg-surface p-5 text-muted">
          {error}
        </div>
      )}
      {result && <ResultView data={result} />}
    </div>
  );
}

function LoadingState() {
  return (
    <div className="mt-8 space-y-3">
      <p className="text-sm text-muted">
        Searching the Scriptures, weighing what they say, and checking the original languages…
      </p>
      <div className="h-2 w-2/3 animate-pulse rounded-full bg-line-strong" />
      <div className="h-2 w-1/2 animate-pulse rounded-full bg-line" />
      <div className="h-2 w-3/4 animate-pulse rounded-full bg-line" />
    </div>
  );
}

function ResultView({ data }: { data: ExamineResponse }) {
  const { examination: ex, verses, translation } = data;
  const style = CATEGORY_STYLE[ex.category] || CATEGORY_STYLE.unclear;

  return (
    <div className="fade-up mt-8 space-y-8">
      {/* Header */}
      <div>
        <span
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wider ${style.ring}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
          {ex.category_label}
        </span>
        <h2 className="display mt-4 text-3xl text-cream sm:text-4xl">{ex.topic}</h2>
        <p className="accent-bar mt-4 max-w-2xl text-muted">{ex.summary}</p>
      </div>

      {/* Perspectives */}
      <div className="space-y-5">
        {ex.perspectives.map((p, i) => (
          <PerspectiveCard key={i} p={p} verses={verses} />
        ))}
      </div>

      {/* Original languages */}
      {ex.original_language && ex.original_language.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gold-soft">
            In the original language
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {ex.original_language.map((l, i) => (
              <LanguageCard key={i} l={l} />
            ))}
          </div>
        </div>
      )}

      {/* Reflection */}
      {ex.reflection_questions?.length > 0 && (
        <div className="rounded-2xl border border-line bg-ink-2/50 p-6">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gold-soft">
            Examine it for yourself
          </h3>
          <ul className="space-y-2.5">
            {ex.reflection_questions.map((q, i) => (
              <li key={i} className="flex gap-3 text-cream/90">
                <span className="mt-1 text-gold">—</span>
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Caution / outward pointer */}
      {ex.caution && (
        <p className="border-t border-line pt-5 text-sm leading-relaxed text-muted">
          {ex.caution}
        </p>
      )}

      <p className="text-xs text-muted/70">
        Scripture shown from the {translation}. Examine never gives a verdict — read each
        passage in its full context, pray, and confirm with your local church.
      </p>
    </div>
  );
}

function PerspectiveCard({
  p,
  verses,
}: {
  p: Perspective;
  verses: Record<string, ResolvedVerse>;
}) {
  return (
    <div className="rounded-2xl border border-line bg-surface/60 p-6">
      <h3 className="text-lg font-semibold text-cream">{p.stance}</h3>
      <p className="mt-2 text-muted">{p.explanation}</p>
      {p.references?.length > 0 && (
        <div className="mt-4 space-y-3">
          {p.references.map((ref) => {
            const v = verses[ref.trim()];
            return (
              <blockquote
                key={ref}
                className="accent-bar border-gold/40 py-1"
              >
                {v?.ok ? (
                  <p className="scripture-quote text-cream/95">“{v.text}”</p>
                ) : (
                  <p className="text-sm italic text-muted">
                    (read this passage in full)
                  </p>
                )}
                <a
                  href={v?.url || `https://www.biblegateway.com/passage/?search=${encodeURIComponent(ref)}&version=WEB`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-sm font-medium text-gold hover:text-gold-soft hover:underline"
                >
                  {v?.reference || ref} ↗
                </a>
              </blockquote>
            );
          })}
        </div>
      )}
    </div>
  );
}

function LanguageCard({ l }: { l: LanguageNote }) {
  return (
    <div className="rounded-2xl border border-line bg-surface/60 p-5">
      <div className="flex items-baseline justify-between gap-2">
        <span className="display text-2xl text-gold-soft">{l.original}</span>
        <span className="rounded-full border border-line px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted">
          {l.language}
          {l.strongs ? ` · ${l.strongs}` : ""}
        </span>
      </div>
      <p className="mt-1 text-sm text-muted">
        <span className="italic">{l.transliteration}</span> — {l.gloss}
      </p>
      <p className="mt-3 text-sm text-cream/90">
        English “<span className="text-gold-soft">{l.word_english}</span>” in {l.reference}: {l.insight}
      </p>
    </div>
  );
}
