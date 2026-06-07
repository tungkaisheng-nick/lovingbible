import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Witnesses — LovingBible",
  description:
    "Real witnesses from Scripture who searched the Word for themselves — the Bereans, the Ethiopian official, the road to Emmaus, and more. Be encouraged, then share your own story.",
};

interface Witness {
  name: string;
  role: string;
  story: string;
  reference: string;
}

const WITNESSES: Witness[] = [
  {
    name: "The Bereans",
    role: "Acts 17",
    story:
      "They didn't just accept what Paul preached — they received the word eagerly and examined the Scriptures daily to see whether these things were so. For this, Scripture calls them noble.",
    reference: "Acts 17:11",
  },
  {
    name: "The Ethiopian official",
    role: "Acts 8",
    story:
      "Riding home, he was reading Isaiah but couldn't understand it. When Philip asked, he said, 'How can I, unless someone guides me?' — and from that very passage he came to faith.",
    reference: "Acts 8:30-35",
  },
  {
    name: "The road to Emmaus",
    role: "Luke 24",
    story:
      "Two disciples walked with the risen Jesus as he opened the Scriptures to them. Afterward they said, 'Weren't our hearts burning within us while he opened the Scriptures to us?'",
    reference: "Luke 24:27-32",
  },
  {
    name: "The Psalmist",
    role: "Psalm 119",
    story:
      "He treasured God's word above gold and called it a lamp to his feet and a light to his path — the whole psalm is one long love song to Scripture.",
    reference: "Psalm 119:105",
  },
  {
    name: "Timothy",
    role: "2 Timothy 3",
    story:
      "From childhood he had known the sacred writings, which are able to make us wise for salvation — all Scripture is God-breathed and profitable for teaching and training.",
    reference: "2 Timothy 3:15-16",
  },
  {
    name: "Mary of Bethany",
    role: "Luke 10",
    story:
      "While others were busy, she sat at the Lord's feet and listened to his word. Jesus said she had chosen the good portion, which would not be taken from her.",
    reference: "Luke 10:39-42",
  },
];

function gw(ref: string) {
  return `https://www.biblegateway.com/passage/?search=${encodeURIComponent(ref)}&version=WEB`;
}

export default function TestimoniesPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Hero — dark band */}
        <section className="glow">
          <div className="mx-auto max-w-3xl px-5 pb-20 pt-16 text-center sm:pt-24">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Witnesses
            </p>
            <h1 className="display mx-auto mt-5 max-w-2xl text-5xl text-band-ink sm:text-6xl">
              Lives changed by the Word.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-band-muted">
              LovingBible is brand new, so rather than invent testimonials, we begin with the
              truest ones there are — real people in Scripture who searched the Word for
              themselves, and were never the same.
            </p>
          </div>
        </section>

        {/* Witness cards */}
        <section className="mx-auto max-w-5xl px-5 py-16">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {WITNESSES.map((w) => (
              <article key={w.name} className="card flex flex-col p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="M12 2c-3.3 0-6 2.7-6 6 0 2.4 1.4 4.5 3.5 5.4V16h5v-2.6C16.6 12.5 18 10.4 18 8c0-3.3-2.7-6-6-6Z"
                        fill="currentColor"
                        opacity="0.95"
                      />
                      <path d="M9 18h6M10 21h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-semibold text-ink">{w.name}</p>
                    <p className="text-xs uppercase tracking-wider text-muted">{w.role}</p>
                  </div>
                </div>
                <p className="mt-4 flex-1 leading-relaxed text-muted">{w.story}</p>
                <a
                  href={gw(w.reference)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-sm font-semibold text-accent transition hover:text-accent-deep hover:underline"
                >
                  {w.reference} ↗
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* Your turn (light) */}
        <section className="border-t border-line bg-paper-2">
          <div className="mx-auto max-w-3xl px-5 py-20 text-center">
            <h2 className="display text-3xl text-ink sm:text-4xl">Your story belongs here</h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-muted">
              Has examining the Word for yourself changed something in you? As real stories come
              in, this is where they&apos;ll live — honestly, with your permission, never
              invented. We&apos;d be honoured to read yours.
            </p>
            <a
              href="mailto:hello@lovingbible.com?subject=My%20testimony"
              className="mt-8 inline-block rounded-xl bg-accent px-7 py-3.5 font-semibold text-white transition hover:bg-accent-deep"
            >
              Share your story
            </a>
            <p className="mt-10 text-sm text-muted">
              Or go and see for yourself —{" "}
              <Link href="/" className="font-semibold text-accent hover:text-accent-deep hover:underline">
                examine the Word
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
