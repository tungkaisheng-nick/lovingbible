import ExamineTool from "@/components/ExamineTool";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Hero + tool */}
        <section className="glow relative">
          <div className="mx-auto max-w-3xl px-5 pb-10 pt-12 text-center sm:pt-20">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">
              Acts 17:11 · The Berean way
            </p>
            <h1 className="display mx-auto mt-5 max-w-2xl text-5xl text-cream sm:text-6xl">
              Search the Scriptures
              <span className="text-gold"> for yourself.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted">
              Type any belief or question and see what the Bible actually says — in English,
              Greek, and Hebrew. Examine won&apos;t hand you a verdict. It shows you the Word,
              so you can be fully convinced in your own mind.
            </p>
          </div>

          <div className="mx-auto max-w-2xl px-5 pb-20">
            <ExamineTool />
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="border-t border-line bg-ink-2/40">
          <div className="mx-auto max-w-5xl px-5 py-20">
            <h2 className="display text-3xl text-cream sm:text-4xl">
              A faithful librarian, not a judge.
            </h2>
            <p className="mt-4 max-w-2xl text-muted">
              The Bereans were called noble because they didn&apos;t just take someone&apos;s
              word for it — they examined the Scriptures themselves. Examine is built to help
              you do exactly that, honestly.
            </p>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <FeatureCard
                title="It shows, it doesn't rule"
                body="No “right” or “wrong” stamp. Examine lays out the relevant passages and hands you the pen — the conviction is yours to reach."
              />
              <FeatureCard
                title="Real Scripture, real languages"
                body="Every verse is pulled from an actual Bible text, shown with a link to read it in context — plus the Greek or Hebrew word where it adds meaning."
              />
              <FeatureCard
                title="Honest about certainty"
                body="On the historic core of the faith, Scripture's plain witness speaks. Where Christians genuinely differ, Examine shows the views — and lets you weigh them."
              />
            </div>

            {/* Calibration legend */}
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm">
              <Legend dot="bg-emerald-400" label="Clear in Scripture" />
              <Legend dot="bg-gold" label="Christians differ here" />
              <Legend dot="bg-sky-400" label="A matter of wisdom" />
              <Legend dot="bg-muted" label="Let's clarify" />
            </div>
          </div>
        </section>

        {/* Ethos */}
        <section className="mx-auto max-w-3xl px-5 py-20">
          <blockquote className="accent-bar">
            <p className="display text-2xl leading-snug text-cream sm:text-3xl">
              “Now these were more noble… for they received the word with all eagerness,
              examining the Scriptures daily to see if these things were so.”
            </p>
            <footer className="mt-4 text-gold-soft">Acts 17:11</footer>
          </blockquote>
          <p className="mt-8 text-muted">
            Examine is a study companion, not an authority. It will never replace the Holy
            Spirit, your Bible, or your local church — it points you to them. Read every
            passage in its full context, pray, and confirm with people who shepherd you.
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function FeatureCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-line bg-surface/50 p-6">
      <h3 className="text-lg font-semibold text-cream">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
    </div>
  );
}

function Legend({ dot, label }: { dot: string; label: string }) {
  return (
    <span className="flex items-center gap-2 text-muted">
      <span className={`h-2 w-2 rounded-full ${dot}`} />
      {label}
    </span>
  );
}
