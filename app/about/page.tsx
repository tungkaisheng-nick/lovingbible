import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "About — LovingBible",
  description:
    "Why LovingBible exists: a study companion built to help you search the Scriptures for yourself, in the Berean way. No verdicts — real Scripture, honestly handled.",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Hero — dark band */}
        <section className="glow">
          <div className="mx-auto max-w-3xl px-5 pb-20 pt-16 text-center sm:pt-24">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              About LovingBible
            </p>
            <h1 className="display mx-auto mt-5 max-w-2xl text-5xl text-band-ink sm:text-6xl">
              Welcome. Let&apos;s reason together.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-band-muted">
              No matter where you are on your journey — brand new to faith or walking it for
              years — LovingBible is here to put the Word in front of you, plainly, so you can see
              for yourself what God has said.
            </p>
          </div>
        </section>

        {/* Mission intro */}
        <section className="mx-auto max-w-3xl px-5 pt-16">
          <div className="accent-bar">
            <p className="text-lg leading-relaxed text-ink">
              LovingBible exists for one reason: to help ordinary believers become Bereans — people
              who don&apos;t just take someone&apos;s word for what the Bible says, but{" "}
              <span className="font-semibold text-accent">open it and check for themselves</span>.
              It is a study companion, not an authority. It will never tell you that you are
              right or wrong. It shows you the Scriptures, the original languages, and where
              faithful Christians differ — then it hands you the pen.
            </p>
          </div>
        </section>

        {/* Founder's note */}
        <section className="mx-auto max-w-3xl px-5 py-16">
          <h2 className="display text-2xl text-ink sm:text-3xl">A note from the maker</h2>
          <div className="mt-6 space-y-4 leading-relaxed text-muted">
            <p>
              I built LovingBible as a fairly new believer myself. I love God, but I hadn&apos;t
              really read the Bible — and I kept running into the same problem: I wanted to know
              what was true, but I didn&apos;t yet have the footing to weigh what I was being
              told. I didn&apos;t want a website to <em>decide for me</em>. I wanted help{" "}
              <span className="font-semibold text-accent">seeing the Word for myself</span>.
            </p>
            <p>
              So LovingBible was made to be the tool I needed: type a belief or a question, and
              instead of a verdict, you get the actual passages — shown in context, with the
              Greek or Hebrew where it matters, and an honest map of where Christians have
              landed differently. The conviction stays yours, reached with Scripture open in
              front of you and the Spirit at work.
            </p>
            <p>
              My prayer is simple: that this would send you deeper into the Word itself, into
              prayer, and into your local church — never around them.
            </p>
          </div>
        </section>

        {/* Convictions (light) */}
        <section className="border-y border-line bg-paper-2">
          <div className="mx-auto max-w-5xl px-5 py-20">
            <h2 className="display text-3xl text-ink sm:text-4xl">What LovingBible believes</h2>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <Conviction
                title="No verdicts — ever"
                body="LovingBible never declares you right or wrong. Romans 14:5 says let each be fully convinced in their own mind. We hand you the evidence; the conviction is yours."
              />
              <Conviction
                title="Real Scripture, never invented"
                body="Verse text is pulled from a real Bible, shown with a link to read it in full context. We won't quote from memory or proof-text by stacking only one side."
              />
              <Conviction
                title="Honest about certainty"
                body="On the historic core of the faith, the weight of Scripture is plain. Where believers genuinely differ, we show the views fairly and let you weigh them."
              />
              <Conviction
                title="It points you outward"
                body="LovingBible is not your pastor, your church, or the Holy Spirit. It points you to all three. Always read in context, pray, and confirm with people who shepherd you."
              />
            </div>
          </div>
        </section>

        {/* What to expect — dark cinematic band */}
        <section className="glow">
          <div className="mx-auto max-w-4xl px-5 py-24">
            <h2 className="display text-4xl text-band-ink sm:text-5xl">What to expect</h2>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <div className="accent-bar">
                <h3 className="font-semibold text-accent">What LovingBible will do</h3>
                <ul className="mt-3 space-y-2 text-band-muted">
                  <li>— Show you the passages that bear on your question</li>
                  <li>— Give you the Greek or Hebrew when it changes the meaning</li>
                  <li>— Show both sides where Scripture pulls in different directions</li>
                  <li>— Send you to read it in full and bring it to your church</li>
                </ul>
              </div>
              <div className="accent-bar" style={{ borderLeftColor: "var(--band-line)" }}>
                <h3 className="font-semibold text-band-muted">What LovingBible won&apos;t do</h3>
                <ul className="mt-3 space-y-2 text-band-muted">
                  <li>— Tell you that you are right or wrong</li>
                  <li>— Settle every debate or replace your pastor</li>
                  <li>— Quote verses from memory or twist them out of context</li>
                  <li>— Pretend a disputed matter is simple</li>
                </ul>
              </div>
            </div>

            <div className="mt-12">
              <Link
                href="/"
                className="inline-block rounded-xl bg-accent px-7 py-3.5 font-semibold text-white transition hover:bg-accent-deep"
              >
                Examine the Word →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function Conviction({ title, body }: { title: string; body: string }) {
  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-2 leading-relaxed text-muted">{body}</p>
    </div>
  );
}
