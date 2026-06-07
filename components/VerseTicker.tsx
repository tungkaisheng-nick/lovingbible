"use client";

import { useEffect, useState } from "react";
import { getDailyVerse } from "@/lib/votd";

const SESSION_KEY = "lovingbible_ticker_dismissed";

export default function VerseTicker() {
  const [visible, setVisible] = useState(false);
  const verse = getDailyVerse();

  useEffect(() => {
    // Don't show if the user already dismissed it this session.
    if (sessionStorage.getItem(SESSION_KEY)) return;
    // Small delay so the page settles before the ticker appears.
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  function dismiss() {
    sessionStorage.setItem(SESSION_KEY, "1");
    setVisible(false);
  }

  if (!visible) return null;

  // Duplicate the text so the marquee loops seamlessly (–50% = one full copy).
  const tickerText = `${verse.reference} — ${verse.text}`;
  const doubled = `${tickerText}   ·   ✦   ·   ${tickerText}   ·   ✦   ·   `;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex h-10 items-stretch overflow-hidden border-t border-band-line"
      style={{ backgroundColor: "var(--band)" }}
    >
      {/* Season label — left pill */}
      <div className="label flex shrink-0 items-center gap-1.5 border-r border-band-line px-4 text-[0.65rem] text-accent">
        <svg width="10" height="10" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
          <path d="M6 1a5 5 0 1 1 0 10A5 5 0 0 1 6 1Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7ZM6 4a.75.75 0 0 1 .75.75v1.5h1a.75.75 0 0 1 0 1.5H5.25A.75.75 0 0 1 4.5 7V4.75A.75.75 0 0 1 6 4Z"/>
        </svg>
        VERSE OF THE DAY
      </div>

      {/* Scrolling verse — pauses on hover for reading */}
      <div className="relative flex-1 overflow-hidden">
        <div className="ticker-track group pointer-events-auto absolute inset-0 flex items-center">
          <span className="ticker-text whitespace-nowrap text-sm text-band-ink group-hover:[animation-play-state:paused]">
            {doubled}
          </span>
        </div>
      </div>

      {/* Dismiss button */}
      <button
        onClick={dismiss}
        aria-label="Dismiss verse of the day"
        className="shrink-0 border-l border-band-line px-3.5 text-lg leading-none text-band-muted transition hover:text-band-ink"
      >
        ×
      </button>
    </div>
  );
}
