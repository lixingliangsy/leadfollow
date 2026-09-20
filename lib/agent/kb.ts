import type { KbEntry } from "../support-kit/types";
export type { KbEntry };

export const KB: KbEntry[] = [
  {
    id: "what",
    title: "What LeadFollow does",
    keywords: ["LeadFollow", "leadfollow", "what", "product", "about", "Post-showing and nurture emails that keep you top of mind."],
    body: "Post-showing and nurture emails that keep you top of mind.. LeadFollow writes warm, stage-aware follow-up emails after a showing, an open-house thank-you, or a long-term nurture note — matched to your tone and with a clear next step.",
    source: "LeadFollow product definition",
    tags: [],
  },
  {
    id: "features",
    title: "LeadFollow features",
    keywords: ["features", "feature", "can", "does", "Stage-aware copy", "Warm or pro tone", "Clear next step", "No-pressure close"],
    body: "LeadFollow includes: Stage-aware copy; Warm or pro tone; Clear next step; No-pressure close. It does not add capabilities that are not listed here.",
    source: "LeadFollow feature list",
    tags: [],
  },
  {
    id: "pricing",
    title: "LeadFollow pricing",
    keywords: ["price", "pricing", "plan", "cost", "billing", "subscription", "monthly", "yearly"],
    body: "Listed prices for LeadFollow: $19/month and $190/year. Checkout uses the in-app checkout route. This assistant cannot change a subscription or issue a refund.",
    source: "LeadFollow pricing fields",
    tags: [],
  },
  {
    id: "howto",
    title: "How to use LeadFollow",
    keywords: ["how", "start", "use", "tool", "run", "Write a follow-up email"],
    body: "Open LeadFollow and use Write a follow-up email. The form asks for: Stage; Contact first name; Property (optional); Tone.",
    source: "LeadFollow tool fields",
    tags: [],
  },
  {
    id: "faq-1",
    title: "What is LeadFollow?",
    keywords: ["What", "is", "LeadFollow?"],
    body: "LeadFollow generates stage-aware follow-up emails after showings, open houses, or for long-term nurture.",
    source: "LeadFollow FAQ",
    tags: [],
  },
  {
    id: "faq-2",
    title: "Which stages does it cover?",
    keywords: ["Which", "stages", "does", "it", "cover?"],
    body: "Post-showing, open-house thank-you, and long-term nurture notes.",
    source: "LeadFollow FAQ",
    tags: [],
  },
  {
    id: "faq-3",
    title: "Can I pick the tone?",
    keywords: ["Can", "I", "pick", "the", "tone?"],
    body: "It offers warm or professional tone with a no-pressure close.",
    source: "LeadFollow FAQ",
    tags: [],
  },
  {
    id: "honesty",
    title: "What this assistant will not claim",
    keywords: ["legal", "advice", "guarantee", "demo", "human", "refund", "support"],
    body: "Answers about LeadFollow are decision support only, not legal, tax, accessibility-certification, or compliance sign-off. This assistant does not invent integrations, SSO, CSV export, or Slack connections unless they are already in the product description. If live AI is unavailable, the product must not pretend a demo result is live. Say you want a human and leave an email if you need a person.",
    source: "LeadFollow support policy",
    tags: ["compliance"],
  },
];

function normalize(s: string): string {
  return (s || "").toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ");
}
function toWords(s: string): string[] {
  return normalize(s).split(/\s+/).map((w) => w.trim()).filter(Boolean);
}
function cjkBigrams(s: string): string[] {
  const grams: string[] = [];
  const han = /[\u4e00-\u9fff]/;
  for (const w of toWords(s)) {
    if (han.test(w) && w.length >= 2) {
      for (let i = 0; i < w.length - 1; i++) grams.push(w.slice(i, i + 2));
    }
  }
  return grams;
}
function scoreEntry(entry: KbEntry, query: string): number {
  const q = normalize(query);
  const qWords = new Set(toWords(q));
  const qGrams = new Set(cjkBigrams(q));
  let s = 0;
  for (const kw of entry.keywords) {
    const k = kw.toLowerCase();
    if (q.includes(k)) s += 3;
  }
  for (const tw of toWords(entry.title)) {
    if (qWords.has(tw)) s += 2;
  }
  const idx = normalize(entry.keywords.join(" ") + " " + entry.title + " " + entry.body.slice(0, 400));
  for (const g of qGrams) if (idx.includes(g)) s += 0.5;
  return s;
}

export interface RetrieveResult {
  entries: KbEntry[];
  topScore: number;
}

export function retrieve(query: string, topK = 4, entries: KbEntry[] = KB): RetrieveResult {
  const scored = entries
    .map((e) => ({ e, s: scoreEntry(e, query) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, topK);
  return { entries: scored.map((x) => x.e), topScore: scored.length ? scored[0].s : 0 };
}

export function isComplianceRelated(entries: KbEntry[]): boolean {
  return entries.some((e) => e.tags.includes("compliance"));
}
