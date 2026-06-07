import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Examine — search the Scriptures for yourself",
  description:
    "Type a belief or question and examine what the Bible says — in English, Greek, and Hebrew. Examine doesn't hand you a verdict; it shows you the Word so you can be convinced in your own mind.",
  openGraph: {
    title: "Examine — search the Scriptures for yourself",
    description:
      "Examine what the Bible says about any belief or question — English, Greek, and Hebrew. No verdicts. Real Scripture. You decide.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-cream">
        {children}
      </body>
    </html>
  );
}
