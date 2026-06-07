import type { Metadata } from "next";
import { Manrope, Archivo_Black } from "next/font/google";
import "./globals.css";

// Body: calm, readable sans (Kallang/Wyse pairing).
const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

// Display: heavy ALL-CAPS punch headline (Kallang venue typography).
const archivo = Archivo_Black({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LovingBible — search the Scriptures for yourself",
  description:
    "Type a belief or question and examine what the Bible says — in English, Greek, and Hebrew. LovingBible doesn't hand you a verdict; it shows you the Word so you can be convinced in your own mind.",
  openGraph: {
    title: "LovingBible — search the Scriptures for yourself",
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
      className={`${manrope.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        {children}
      </body>
    </html>
  );
}
