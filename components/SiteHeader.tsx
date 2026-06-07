import Link from "next/link";

function LampMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-accent">
      <path
        d="M12 2c-3.3 0-6 2.7-6 6 0 2.4 1.4 4.5 3.5 5.4V16h5v-2.6C16.6 12.5 18 10.4 18 8c0-3.3-2.7-6-6-6Z"
        fill="currentColor"
        opacity="0.95"
      />
      <path d="M9 18h6M10 21h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3.5">
        <Link href="/" className="flex items-center gap-2">
          <LampMark />
          <span className="display text-xl tracking-tight text-ink">LovingBible</span>
        </Link>
        <nav className="flex items-center gap-5 text-sm font-medium text-muted sm:gap-7">
          <Link href="/about" className="transition hover:text-ink">
            About
          </Link>
          <Link href="/testimonies" className="transition hover:text-ink">
            Witnesses
          </Link>
          <Link
            href="/"
            className="rounded-full bg-accent px-4 py-1.5 font-semibold text-white transition hover:bg-accent-deep"
          >
            Examine
          </Link>
        </nav>
      </div>
    </header>
  );
}
