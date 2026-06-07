import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import {
  EXAMINE_TOOL,
  MODEL,
  SYSTEM_PROMPT,
  type Examination,
  type ExamineResponse,
} from "@/lib/examine";
import { resolveVerses, TRANSLATION_NAME } from "@/lib/bible";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const InputSchema = z.object({
  query: z.string().trim().min(3, "Type a little more.").max(500, "Please keep it under 500 characters."),
});

// Best-effort, per-instance rate limit. NOTE: serverless instances are
// ephemeral, so this is a soft guard only — a distributed limiter (Upstash
// Redis) is the pre-production TODO recorded in SECURITY.md.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 8;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json(
      {
        error:
          "Examine isn't connected to its study engine yet. Add ANTHROPIC_API_KEY in the Vercel project settings to switch it on.",
      },
      { status: 503 },
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "anon";
  if (rateLimited(ip)) {
    return Response.json(
      { error: "You're examining quickly! Give it a moment and try again." },
      { status: 429 },
    );
  }

  let query: string;
  try {
    const body = await request.json();
    query = InputSchema.parse(body).query;
  } catch (err) {
    const message =
      err instanceof z.ZodError ? err.issues[0]?.message : "Please send a valid question.";
    return Response.json({ error: message }, { status: 400 });
  }

  try {
    const client = new Anthropic({ apiKey });
    const msg = await client.messages.create({
      model: MODEL,
      max_tokens: 3500,
      temperature: 0.3,
      system: SYSTEM_PROMPT,
      tools: [EXAMINE_TOOL],
      tool_choice: { type: "tool", name: "present_examination" },
      messages: [{ role: "user", content: query }],
    });

    const toolUse = msg.content.find((b) => b.type === "tool_use");
    if (!toolUse || toolUse.type !== "tool_use") {
      return Response.json(
        { error: "Examine couldn't form a response. Please try rephrasing." },
        { status: 502 },
      );
    }

    const examination = toolUse.input as Examination;

    // Gather every reference the model cited and resolve to REAL verse text.
    const refs = [
      ...examination.perspectives.flatMap((p) => p.references || []),
      ...(examination.original_language || []).map((l) => l.reference),
    ];
    const verses = await resolveVerses(refs);

    const payload: ExamineResponse = {
      examination,
      verses,
      translation: TRANSLATION_NAME,
    };
    return Response.json(payload);
  } catch (err) {
    console.error("Examine error:", err);
    return Response.json(
      { error: "Something went wrong reaching the study engine. Please try again." },
      { status: 500 },
    );
  }
}
