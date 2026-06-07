import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Privacy Policy — LovingBible",
  description:
    "LovingBible privacy policy — what we collect (very little), how your queries are handled, and your rights under Singapore's PDPA.",
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">

        {/* ── Header band ─────────────────────────────────────── */}
        <section className="glow">
          <div className="mx-auto max-w-3xl px-5 pb-16 pt-16 text-center sm:pt-24">
            <p className="label text-accent">Legal</p>
            <h1 className="display mt-5 text-5xl uppercase text-band-ink">
              Privacy Policy
            </h1>
            <p className="mt-4 text-sm text-band-muted">Last updated: 7 June 2026</p>
          </div>
        </section>

        {/* ── Content ─────────────────────────────────────────── */}
        <section className="mx-auto max-w-3xl px-5 py-16">
          <div className="space-y-10 text-muted [&_h2]:display [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-normal [&_h2]:text-ink [&_p]:leading-relaxed [&_ul]:mt-3 [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:text-sm [&_ul>li]:list-disc">

            <div>
              <h2>Who we are</h2>
              <p>
                LovingBible (<strong>lovingbible.com</strong>) is a Bible study companion built
                to help people examine the Scriptures for themselves. It is operated by the
                LovingBible team (Singapore). For privacy questions, contact us at{" "}
                <a href="mailto:hello@lovingbible.com" className="text-accent underline underline-offset-2">
                  hello@lovingbible.com
                </a>.
              </p>
            </div>

            <div>
              <h2>What we collect — the short version</h2>
              <p>
                Very little. LovingBible does <strong>not</strong> require you to create an account,
                provide your name, or give us your email. We do not store the questions you type.
                There is no user database.
              </p>
            </div>

            <div>
              <h2>How your query is processed</h2>
              <p>
                When you type a question, it is sent over an encrypted HTTPS connection to our
                server, which calls the following third-party services to generate your response:
              </p>
              <ul>
                <li>
                  <strong>Anthropic</strong> — your query text is sent to Anthropic&apos;s API
                  (Claude) to identify relevant Bible passages. Anthropic processes this under
                  their own privacy policy at{" "}
                  <a
                    href="https://www.anthropic.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent underline underline-offset-2"
                  >
                    anthropic.com/privacy
                  </a>. We do not send any identifying information about you — only the text of
                  your question.
                </li>
                <li>
                  <strong>YouVersion / Bible API</strong> — the Bible references identified by the
                  AI are looked up against a real Bible source to retrieve actual verse text.
                  This lookup contains only the book/chapter/verse reference — not your original
                  question.
                </li>
              </ul>
              <p className="mt-3">
                Your query is not logged or stored on our servers beyond the duration of a single
                request. We do not build a history of your questions.
              </p>
            </div>

            <div>
              <h2>Hosting and server logs</h2>
              <p>
                LovingBible is hosted on <strong>Vercel</strong>. Like all web servers, Vercel
                may record standard server logs (IP address, timestamp, pages visited) for
                operational and security purposes. These are governed by Vercel&apos;s privacy
                policy at{" "}
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline underline-offset-2"
                >
                  vercel.com/legal/privacy-policy
                </a>. LovingBible does not add its own analytics tracking on top of this.
              </p>
            </div>

            <div>
              <h2>Cookies</h2>
              <p>
                LovingBible does not set any cookies. Vercel may set technical session or security
                cookies as part of serving the site; these are not used for advertising or tracking.
              </p>
            </div>

            <div>
              <h2>Children</h2>
              <p>
                LovingBible is open to anyone who wishes to study Scripture and does not knowingly
                collect any information from children. Because we collect no personal data from
                any user, no special measures beyond our general approach are needed. If you
                believe a child has shared personal information with us, please contact us and we
                will investigate.
              </p>
            </div>

            <div>
              <h2>Your rights (Singapore PDPA)</h2>
              <p>
                Under Singapore&apos;s Personal Data Protection Act (PDPA), you have the right to
                access and correct personal data we hold about you. Because LovingBible does not
                store personal data about users, there is in practice nothing to access or
                correct. If you have a concern, email us at{" "}
                <a href="mailto:hello@lovingbible.com" className="text-accent underline underline-offset-2">
                  hello@lovingbible.com
                </a>{" "}
                and we will respond within 30 days.
              </p>
            </div>

            <div>
              <h2>Links to other websites</h2>
              <p>
                LovingBible links to BibleGateway and other external sites so you can read
                Scripture in full context. We are not responsible for the privacy practices of
                those sites and encourage you to read their policies.
              </p>
            </div>

            <div>
              <h2>Changes to this policy</h2>
              <p>
                If this policy changes materially, we will update the &ldquo;Last updated&rdquo; date
                at the top. Continued use of LovingBible after a change constitutes acceptance of
                the revised policy.
              </p>
            </div>

            <div>
              <h2>Contact</h2>
              <p>
                Questions about this policy? Email{" "}
                <a href="mailto:hello@lovingbible.com" className="text-accent underline underline-offset-2">
                  hello@lovingbible.com
                </a>.
              </p>
            </div>

          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
