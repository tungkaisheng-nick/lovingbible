import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "About — Examine",
  description:
    "Why Examine exists: a study companion built to help you search the Scriptures for yourself, in the Berean way. No verdicts — real Scripture, honestly handled.",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="glow">
          <div className="mx-auto max-w-3xl px-5 pb-12 pt-16 text-center sm:pt-24">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">
              About Examine
            </p>
            <h1 className="display mx-auto mt-5 max-w-2xl text-5xl text-cream sm:text-6xl">
              Welcome. Let&apos;s reason
              <span className="text-gold"> together.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted">
              No matter where you are on your journey — brand new to faith or walking it for
              years — Examine is here to put the Word in front of you, plainly, so you can see
              for yourself what God has said.
            </p>
          </div>
        </section>

        {/* Mission intro (accent-bar, like the church "Welcome Home" block) */}
        <section className="mx-auto max-w-3xl px-5 pb-4">
          <div className="accent-bar rounded-r-2xl bg-ink-2/40 py-5 pr-5">
            <p className="leading-relaxed text-cream/90">
              Examine exists for one reason: to help ordinary believers become Bereans — people
              who don&apos;t just take someone&apos;s word for what the Bible says, but{" "}
              <span className="text-gold-soft">open it and check for themselves</span>. It is a
              study companion, not an authority. It will never tell you that you are right or
              wrong. It shows you the Scriptures, the original languages, and where faithful
              Christians differ — then it hands you the pen.
            </p>
          </div>
        </section>

        {/* Founder's note */}
        <section className="mx-auto max-w-3xl px-5 py-16">
          <h2 className="display text-2xl text-cream sm:text-3xl">A note from the maker</h2>
          <div className="mt-6 space-y-4 leading-relaxed text-muted">
            <p>
              I built Examine as a fairly new believer myself. I love God, but I hadn&apos;t
              really read the Bible — and I kept running into the same problem: I wanted to know
              what was true, but I didn&apos;t yet have the footing to weigh what I was being
              told. I didn&apos;t want a website to <em>decide for me</em>. I wanted help{" "}
              <span className="text-gold-soft">seeing the Word for myself</span>.
            </p>
            <p>
              So Examine was made to be the tool I needed: type a belief or a question, and
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

        {/* Convictions */}
        <section className="border-t border-line bg-ink-2/40">
          <div className="mx-auto max-w-5xl px-5 py-20">
            <h2 className="display text-3xl text-cream sm:text-4xl">What Examine believes</h2>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <Conviction
                title="No verdicts — ever"
                body="Examine never declares you right or wrong. Romans 14:5 says let each be fully convinced in their own mind. We hand you the evidence; the conviction is yours."
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
                body="Examine is not your pastor, your church, or the Holy Spirit. It points you to all three. Always read in context, pray, and confirm with people who shepherd you."
              />
            </div>
          </div>
        </section>

        {/* What to expect — cinematic band */}
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(80% 120% at 20% 0%, rgba(201,168,76,0.14) 0%, rgba(12,10,9,0) 55%), linear-gradient(180deg, #14110f 0%, #0c0a09 100%)",
            }}
          />
          <div className="relative mx-auto max-w-4xl px-5 py-24">
            <h2 className="display text-4xl text-cream sm:text-5xl">What to expect</h2>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <div className="accent-bar">
                <h3 className="font-semibold text-gold-soft">What Examine will do</h3>
                <ul className="mt-3 space-y-2 text-muted">
                  <li>— Show you the passages that bear on your question</li>
                  <li>— Give you the Greek or Hebrew when it changes the meaning</li>
                  <li>— Show both sides where Scripture pulls in different directions</li>
                  <li>— Send you to read it in full and bring it to your church</li>
                </ul>
              </div>
              <div className="accent-bar border-muted/40">
                <h3 className="font-semibold text-muted">What Examine won&apos;t do</h3>
                <ul className="mt-3 space-y-2 text-muted">
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
                className="inline-block rounded-xl bg-gold px-7 py-3.5 font-semibold text-ink transition hover:bg-gold-soft"
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
    <div className="rounded-2xl border border-line bg-surface/50 p-6">
      <h3 className="text-lg font-semibold text-cream">{title}</h3>
      <p className="mt-2 leading-relaxed text-muted">{body}</p>
    </div>
  );
}
