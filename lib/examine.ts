// ============================================================
// Examine — shared types + the Rule #1 system prompt + tool schema
// ============================================================

export type Category = "clear" | "contested" | "wisdom" | "unclear";

export interface Perspective {
  /** e.g. "What Scripture plainly affirms", "Some Christians hold", "Others hold" */
  stance: string;
  explanation: string;
  /** Bible references ONLY — e.g. ["John 3:16", "Romans 5:8"]. Text is fetched server-side, never quoted by the model. */
  references: string[];
}

export interface LanguageNote {
  word_english: string;
  original: string;
  transliteration: string;
  language: "Greek" | "Hebrew";
  strongs?: string;
  gloss: string;
  /** Why the original word adds meaning the English can flatten. A translation note — never new doctrine. */
  insight: string;
  reference: string;
}

export interface Examination {
  topic: string;
  category: Category;
  category_label: string;
  summary: string;
  perspectives: Perspective[];
  original_language: LanguageNote[];
  reflection_questions: string[];
  caution?: string;
}

/** Verse text resolved from a real Bible dataset (so nothing is quoted from the model's memory). */
export interface ResolvedVerse {
  reference: string;
  text: string;
  url: string;
  ok: boolean;
}

export interface ExamineResponse {
  examination: Examination;
  verses: Record<string, ResolvedVerse>;
  translation: string;
}

export const MODEL = process.env.EXAMINE_MODEL || "claude-sonnet-4-6";

// ------------------------------------------------------------
// The system prompt — this is the conscience of the product.
// ------------------------------------------------------------
export const SYSTEM_PROMPT = `You are the reasoning engine behind "Examine", a tool that helps Christians search the Scriptures for themselves — in the posture of the Bereans, who "examined the Scriptures daily to see if these things were so" (Acts 17:11).

# RULE #1 — YOU NEVER HAND DOWN A VERDICT.
You do NOT tell the user they are "right" or "wrong". You are a faithful librarian, not a judge. You surface what Scripture says, show where faithful Christians differ, illuminate the original languages, and then hand the user the pen so THEY can be "fully convinced in their own mind" (Romans 14:5). Never say "you are correct/incorrect", "the answer is", "this is true/false", or any equivalent ruling.

# CALIBRATION — be honest about certainty (avoid false balance).
Classify the user's statement/question into one category:
- "clear": The historic, universal core of the faith — the things confessed in the Apostles' and Nicene Creeds (the Trinity; Jesus is truly God and truly man; his death for sin and bodily resurrection; salvation by grace). Here, let the WEIGHT of Scripture's consistent, plain witness be evident — show how plainly and repeatedly Scripture testifies — but still let the user see it for themselves rather than decreeing it.
- "contested": Faithful, Bible-loving Christians genuinely differ (e.g. baptism mode, end-times views, predestination/free will, spiritual gifts, drinking, sabbath). Lay out the 2-3 main views fairly, each with the verses it leans on. Do NOT pick a winner.
- "wisdom": Scripture gives principles but no direct command (life decisions, disputable matters). Offer the principles, not a ruling.
- "unclear": The input is vague, not a claim, or outside what Scripture addresses. Gently reframe and offer what Scripture does speak to.

# ANTI-PROOF-TEXTING.
When Scripture pulls in more than one direction, you MUST show verses from BOTH directions. Never stack only the verses that favour one reading. Always consider context.

# VERSES: references only, never quoted text.
In every "references" array, give SPECIFIC, SHORT references (a verse or a few verses, e.g. "Ephesians 5:18" or "John 1:1-3"), NOT whole chapters. Do NOT write out the verse text yourself — the app fetches the real text from a Bible database and displays it. Only give references you are confident exist and actually say what you claim. If unsure a verse says what you think, leave it out.

# ORIGINAL LANGUAGES — a translation note, never new doctrine.
Where a Greek or Hebrew word genuinely adds meaning the English flattens, add a language note (the word, transliteration, Strong's number if known, a plain gloss, and why it matters). Be accurate and humble; frame it as "the original word here is…", not as a secret meaning. If nothing meaningful turns on the original language, return an empty list rather than inventing something.

# TONE.
Warm, reverent, plain-English, pastoral. Assume the reader may be a new believer. Never condescending. Always end by pointing them outward — to read the passages in context, pray, and confirm with their local church and pastor. The "caution" field is for that reminder and any "handle with care" note.

You MUST respond by calling the "present_examination" tool. Do not write prose outside the tool call.`;

// ------------------------------------------------------------
// Tool schema — forces structured, validated output.
// ------------------------------------------------------------
export const EXAMINE_TOOL = {
  name: "present_examination",
  description:
    "Present the structured examination of the user's statement or question. Never contains a verdict.",
  input_schema: {
    type: "object" as const,
    properties: {
      topic: {
        type: "string",
        description: "A short, neutral restatement of what the user is asking about.",
      },
      category: {
        type: "string",
        enum: ["clear", "contested", "wisdom", "unclear"],
      },
      category_label: {
        type: "string",
        description:
          "A short human label for the category, e.g. 'Clear in Scripture', 'Christians differ here', 'A matter of wisdom', 'Let's clarify'.",
      },
      summary: {
        type: "string",
        description:
          "2-4 sentences of neutral framing. NO verdict, no 'you are right/wrong'.",
      },
      perspectives: {
        type: "array",
        items: {
          type: "object",
          properties: {
            stance: { type: "string" },
            explanation: { type: "string" },
            references: {
              type: "array",
              items: { type: "string" },
              description: "Specific short Bible references, e.g. ['John 3:16'].",
            },
          },
          required: ["stance", "explanation", "references"],
        },
      },
      original_language: {
        type: "array",
        items: {
          type: "object",
          properties: {
            word_english: { type: "string" },
            original: { type: "string" },
            transliteration: { type: "string" },
            language: { type: "string", enum: ["Greek", "Hebrew"] },
            strongs: { type: "string" },
            gloss: { type: "string" },
            insight: { type: "string" },
            reference: { type: "string" },
          },
          required: [
            "word_english",
            "original",
            "transliteration",
            "language",
            "gloss",
            "insight",
            "reference",
          ],
        },
      },
      reflection_questions: {
        type: "array",
        items: { type: "string" },
        description: "2-4 questions that help the user reason and pray it through themselves.",
      },
      caution: {
        type: "string",
        description:
          "The 'examine for yourself / confirm with your church' reminder, plus any handle-with-care note.",
      },
    },
    required: [
      "topic",
      "category",
      "category_label",
      "summary",
      "perspectives",
      "reflection_questions",
    ],
  },
};
