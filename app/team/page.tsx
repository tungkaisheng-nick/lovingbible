import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Our Team — LovingBible",
  description:
    "Meet the people behind LovingBible — young believers who wanted to know what the Bible actually says, and built the tool they wished they had.",
};

function initials(name: string) {
  const parts = name.replace(/^(Dr\.?|Prof\.?|Rev\.?)\s+/i, "").split(" ");
  return (parts[0][0] + (parts[parts.length - 1]?.[0] ?? "")).toUpperCase();
}

function TeamCard({ name, role }: { name: string; role: string }) {
  return (
    <div className="card flex flex-col items-center gap-4 p-8 text-center">
      <div className="display flex h-16 w-16 items-center justify-center rounded-full bg-accent-soft text-xl font-bold text-accent">
        {initials(name)}
      </div>
      <div>
        <p className="font-semibold text-ink">{name}</p>
        <p className="mt-1 text-sm text-muted">{role}</p>
      </div>
    </div>
  );
}

export default function TeamPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="glow">
          <div className="mx-auto max-w-3xl px-5 pb-20 pt-16 text-center sm:pt-24">
            <p className="label text-accent">The Team</p>
            <h1 className="display mt-5 text-5xl uppercase text-band-ink sm:text-6xl">
              We asked the same questions
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-band-muted">
              Young in faith, unsure who to trust — so we built the tool we wished
              someone had built for us.
            </p>
          </div>
        </section>

        {/* ── Our story ────────────────────────────────────────── */}
        <section className="mx-auto max-w-3xl px-5 py-16">
          <div className="accent-bar">
            <h2 className="display text-3xl text-ink sm:text-4xl">Why we built this</h2>
          </div>

          <div className="mt-8 space-y-5 leading-relaxed text-muted">
            <p>
              Everyone around us was saying something different. Different preachers, different
              churches, different denominations — each confident, each convincing. As people
              newer to the faith, we didn't know how to weigh it. We wanted to understand
              what the Bible actually said, not just who said it most clearly.
            </p>
            <p>
              Then we discovered something that changed how we read Scripture: many of the
              passages people debate were first written in{" "}
              <span className="font-semibold text-ink">Greek or Hebrew</span> — and sometimes a
              single word in the original language carries a meaning that gets quietly flattened
              in the English translation. A word translated{" "}
              <em>"love"</em> in English might be{" "}
              <em>agape</em> — unconditional, divine love — or{" "}
              <em>philia</em> — brotherly affection. That distinction matters. And it is
              invisible in English.
            </p>
            <p>
              So we built LovingBible for{" "}
              <span className="font-semibold text-ink">
                people who are young in faith and want to learn more
              </span>
              . Not to give you another voice telling you what to think. But to put the
              original text in front of you — plainly, honestly, in English and in the
              language it was first written — so you can see for yourself what God has said.
            </p>
          </div>
        </section>

        {/* ── The people ───────────────────────────────────────── */}
        <section className="border-y border-line bg-paper-2">
          <div className="mx-auto max-w-5xl px-5 py-20">
            <h2 className="display text-3xl text-ink sm:text-4xl">The people</h2>
            <p className="mt-3 max-w-xl leading-relaxed text-muted">
              Headed by Dr Nick Tung, with Jun Choe and Jerome. A small team with a
              simple aim: make understanding the Bible accessible to anyone who genuinely
              wants to seek.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              <TeamCard name="Dr Nick Tung" role="Head, LovingBible" />
              <TeamCard name="Jun Choe" role="Team" />
              <TeamCard name="Jerome" role="Team" />
            </div>
          </div>
        </section>

        {/* ── Acts 17:11 CTA ───────────────────────────────────── */}
        <section className="glow">
          <div className="mx-auto max-w-3xl px-5 py-24 text-center">
            <p className="label text-accent">Acts 17:11</p>
            <h2 className="display mt-4 text-4xl text-band-ink sm:text-5xl">
              &ldquo;They examined the Scriptures daily.&rdquo;
            </h2>
            <p className="mx-auto mt-6 max-w-xl leading-relaxed text-band-muted">
              That&apos;s all we&apos;re asking you to do. Not to trust us.
              Not to trust any single teacher. Open the Word and see for yourself.
            </p>
            <Link
              href="/"
              className="mt-10 inline-block rounded-xl bg-accent px-7 py-3.5 font-semibold text-white transition hover:bg-accent-deep"
            >
              Examine the Word →
            </Link>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
