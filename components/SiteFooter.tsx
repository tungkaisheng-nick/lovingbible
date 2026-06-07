import Link from "next/link";

function LampMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-gold">
      <path
        d="M12 2c-3.3 0-6 2.7-6 6 0 2.4 1.4 4.5 3.5 5.4V16h5v-2.6C16.6 12.5 18 10.4 18 8c0-3.3-2.7-6-6-6Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path d="M9 18h6M10 21h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export default function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-5 py-10 text-center text-sm text-muted">
        <div className="flex items-center gap-2">
          <LampMark />
          <span className="display text-cream">Examine</span>
        </div>
        <nav className="flex items-center gap-6 text-muted">
          <Link href="/" className="transition hover:text-cream">Examine</Link>
          <Link href="/about" className="transition hover:text-cream">About</Link>
          <Link href="/testimonies" className="transition hover:text-cream">Witnesses</Link>
        </nav>
        <p className="max-w-md text-xs leading-relaxed text-muted/70">
          Built to equip, not to rule. Examine offers no verdicts and is not a substitute for
          Scripture in context, prayer, or the counsel of your church.
        </p>
        <p className="text-xs text-muted/60">© 2026 Examine</p>
      </div>
    </footer>
  );
}
