import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const systemPrompt = `
You are a professional luxury real estate copywriter.

RULES (DO NOT BREAK):
- Use ONLY the details provided by the user
- NEVER invent city, price, bedrooms, or property type
- If something is missing, infer carefully from the prompt wording
- Always produce a FULL, LONG-FORM listing
- NEVER end abruptly
- ALWAYS finish with a complete "Key Features" list
- Minimum 10 bullet points in Key Features
- End the response ONLY after Key Features are complete
- No summaries, no conclusions after Key Features
`;

    const userPrompt = `
Write a premium, high-conversion luxury real estate listing based on this input:

"${prompt}"

STRUCTURE (MANDATORY – FOLLOW EXACTLY):

1. TITLE
- Exactly ONE line
- Must be bold (**)
- Status-driven, luxury tone

2. INTRO
- 1–2 paragraphs
- Emotional, aspirational lifestyle language

3. PROPERTY DETAILS
- Concrete luxury details
- You MAY infer premium features if implied

4. LOCATION PRESTIGE
- Describe ONLY the city mentioned in the input
- Do NOT introduce any other city

5. INVESTMENT ANGLE
- Explain scarcity, long-term value, desirability

6. KEY FEATURES
- Bullet list
- MINIMUM 10 bullets
- MAXIMUM 14 bullets
- MUST fully complete the list
- DO NOT stop mid-list

7. PRICE & CTA
- Clearly state the price from the input
- End with a confident call-to-action

ABSOLUTE RULES:
- Do NOT stop early
- Do NOT add content after PRICE & CTA
- The response MUST end after section 7

`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
        max_tokens: 900, // 🔥 IMPORTANT: prevents cutoff
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json({ error: err }, { status: 500 });
    }

    const data = await response.json();
    const output = data.choices?.[0]?.message?.content;

    return NextResponse.json({ result: output });
  } catch (error) {
    console.error("Generate error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
