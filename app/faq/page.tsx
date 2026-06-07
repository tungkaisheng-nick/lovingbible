import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "FAQ — LovingBible",
  description:
    "Common questions about LovingBible — how it works, whose theology is behind it, and why we never hand down verdicts.",
};

const FAQS: { q: string; a: string }[] = [
  {
    q: "Is this just AI making up Bible verses?",
    a: "No. The verse text you see is fetched from a real Bible source — LovingBible never quotes Scripture from the AI's memory. The model's only job is to identify which passages are relevant; the actual words you read come from a real Bible database, linked so you can read them in full context. If a verse can't be retrieved, we show a link to BibleGateway rather than guess at the text.",
  },
  {
    q: "Whose theology is behind this? Which denomination?",
    a: "None. LovingBible doesn't lean toward any single tradition. The only 'clear' anchor is what all major Christian traditions have held in common for over 2,000 years — the Trinity, the deity and resurrection of Christ, salvation by grace. On everything beyond that core (which covers most of what people debate) LovingBible shows where faithful believers land differently, and hands the conclusion to you.",
  },
  {
    q: "Why does my preacher say one thing, and others say something else?",
    a: "Because many of the passages people debate genuinely admit more than one reading — and because the Bible was not originally written in English. A word translated the same way in two different verses can have different meanings in the original Greek or Hebrew. LovingBible is built to surface exactly this: where does the text actually settle a question, and where do Christians legitimately differ? We show both sides so you can weigh them.",
  },
  {
    q: "Why Greek and Hebrew? Why not just English?",
    a: "Because the Bible wasn't written in English. The Old Testament was written primarily in Hebrew; the New Testament in Greek. A single Greek word — like agape versus philia, both translated 'love' — can carry very different weight. When a debate hinges on what a word meant to its original readers, the English alone can mislead you. LovingBible surfaces those moments so you can factor them in.",
  },
  {
    q: "Will this replace my Bible or my pastor?",
    a: "No — and that's by design. LovingBible is a study companion, not an authority. It is built to send you deeper into the Word itself, into prayer, and into your local church — never around them. Think of it as a research assistant that helps you find the relevant passages; your pastor, your study group, and the Spirit at work in you are the ones to help you weigh them.",
  },
  {
    q: "What do the four labels mean?",
    a: "Every response is tagged with one of four calibration labels. Clearly affirmed: the weight of Scripture on this is plain, anchored in the historic creeds. Christians differ: faithful believers have landed in genuinely different places; both sides are shown. Matter of wisdom: Scripture gives principles but not a rule — this one is yours to pray through. Let me clarify: the question as asked may need a distinction first. These are honesty labels, not verdicts.",
  },
  {
    q: "What translation do you use?",
    a: "The World English Bible (WEB) — a modern, accurate, public-domain translation that is free to use and reproduce. We display a link to read every passage in full context on BibleGateway so you can check surrounding verses.",
  },
  {
    q: "Is LovingBible free?",
    a: "Yes, completely free. There is no account to create, no subscription, and nothing to pay. We built this because we wished it existed — not to monetise your faith.",
  },
  {
    q: "Can I trust what it says?",
    a: "Trust the Scripture it points you to — and verify. LovingBible is honest about uncertainty: the 4-way calibration is designed to show you where things are genuinely settled versus where they are not. On contested topics you will see both views, not a confident winner. Always read the full passage in context, bring difficult questions to your pastor, and weigh everything prayerfully.",
  },
];

export default function FaqPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="glow">
          <div className="mx-auto max-w-3xl px-5 pb-20 pt-16 text-center sm:pt-24">
            <p className="label text-accent">Questions</p>
            <h1 className="display mt-5 text-5xl uppercase text-band-ink sm:text-6xl">
              Questions? Good.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-band-muted">
              The Bereans were called noble because they asked questions and checked the
              answers. So should you.
            </p>
          </div>
        </section>

        {/* ── FAQ list ─────────────────────────────────────────── */}
        <section className="mx-auto max-w-3xl px-5 py-16">
          <div className="space-y-3">
            {FAQS.map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </section>

        {/* ── Still curious? CTA ───────────────────────────────── */}
        <section className="border-t border-line bg-paper-2">
          <div className="mx-auto max-w-3xl px-5 py-16 text-center">
            <h2 className="display text-3xl text-ink sm:text-4xl">
              The best answer is in the text itself.
            </h2>
            <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted">
              Type your question and let the Word speak for itself.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/"
                className="rounded-xl bg-accent px-7 py-3.5 font-semibold text-white transition hover:bg-accent-deep"
              >
                Examine the Word →
              </Link>
              <a
                href="mailto:hello@lovingbible.com"
                className="rounded-xl border border-line-strong px-7 py-3.5 font-semibold text-ink transition hover:bg-paper-2"
              >
                Email us
              </a>
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="card group overflow-hidden" style={{ borderRadius: "1rem" }}>
      <summary className="flex cursor-pointer select-none list-none items-start justify-between gap-4 px-6 py-5 text-base font-semibold text-ink transition hover:text-accent [&::-webkit-details-marker]:hidden">
        <span>{q}</span>
        <span
          className="mt-0.5 shrink-0 text-lg leading-none text-accent transition-transform duration-200 group-open:rotate-45"
          aria-hidden="true"
        >
          +
        </span>
      </summary>
      <p className="border-t border-line px-6 pb-6 pt-4 text-sm leading-relaxed text-muted">
        {a}
      </p>
    </details>
  );
}
