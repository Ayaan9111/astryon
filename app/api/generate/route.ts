import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// ✅ FORCE NODE RUNTIME (important for fetch + env vars)
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    // ✅ Create Supabase client AT RUNTIME (NOT BUILD TIME)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 1️⃣ AUTH CHECK
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");

    const { data: authData, error: authError } =
      await supabase.auth.getUser(token);

    if (authError || !authData.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = authData.user.id;

    // 2️⃣ FETCH USER PROFILE
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role, credits")
      .eq("id", userId)
      .single();

    if (profileError || !profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const { role, credits } = profile;

    // 3️⃣ CREDIT ENFORCEMENT
    if (role !== "founding") {
      if (!credits || credits <= 0) {
        return NextResponse.json(
          { error: "Credits exhausted" },
          { status: 403 }
        );
      }

      const { error: creditError } = await supabase
        .from("profiles")
        .update({ credits: credits - 1 })
        .eq("id", userId)
        .gt("credits", 0);

      if (creditError) {
        return NextResponse.json(
          { error: "Failed to deduct credits" },
          { status: 409 }
        );
      }
    }

    // 4️⃣ PROMPT VALIDATION
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // 5️⃣ AI PROMPTS (UNCHANGED 🔥)
    const systemPrompt = `
ROLE
You are a real estate listing generator for European property portals.

ABSOLUTE RULES (FAIL IF BROKEN)

1. Use ONLY facts explicitly listed in the input.
2. EVERY input fact MUST appear:
   - exactly once in the Description
   - exactly once in the Specifications
3. NO fact may appear more than once per section.
4. NEVER mention missing, unspecified, or absent information.
5. NEVER explain, justify, validate, or comment.
6. NEVER invent, infer, normalize, or reinterpret details.
7. NO adjectives, opinions, or marketing language.

PROPERTY TYPE — EXACT MATCH RULE (CRITICAL)
- The property type MUST be written EXACTLY as provided in the input.
- DO NOT singularize, pluralize, normalize, or rephrase the property type.
- DO NOT add or remove words.
- Use the property type text verbatim in:
  - the Headline
  - the Description (once)

STUDIO RULE
- If the property type contains the word "studio", DO NOT mention bedrooms.
- If bedrooms are listed, DO NOT use the word "studio" anywhere.

VERBS ALLOWED (ONLY THESE)
is, is located in, comprises, includes, has, was built in

OUTPUT STRUCTURE (FIXED — DO NOT CHANGE)

Headline  
[Exact Property Type] in [Exact Location]

Description  
Exactly ONE sentence.  
Exactly ONE paragraph.  
The sentence MUST contain ALL provided facts.  
Facts MUST be separated by commas.  
NO extra words. NO reordering that changes meaning.

Pricing  
One sentence stating the asking price exactly as provided.

Specifications  
Bullet list of ALL provided facts.  
ONE fact per bullet.  
Text must match input wording exactly.  
No labels. No grouping. No commentary.

FORMATTING RULES
- Years must appear exactly as provided (e.g. "Built in 2019").
- Locations must appear exactly as provided (e.g. "Located in Paris").
- Sizes must appear exactly as provided (e.g. "145 sqm", "1,200 sqm built area").
- Features listed separately MUST remain separate (no merging).

IMPORTANT
- If a fact does not fit naturally in the Description sentence, REWRITE the sentence.
- NEVER drop facts.
- NEVER split the Description into multiple sentences.
- NEVER output anything other than the listing.
`;

    // 6️⃣ GROQ CALL
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          temperature: 0.7,
          max_tokens: 900,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: prompt },
          ],
        }),
      }
    );

    if (!response.ok) {
      const text = await response.text();
      console.error("GROQ ERROR:", text);
      return NextResponse.json(
        { error: "AI generation failed" },
        { status: 500 }
      );
    }

    const data = await response.json();
    const output = data?.choices?.[0]?.message?.content;

    if (!output) {
      return NextResponse.json(
        { error: "Empty AI response" },
        { status: 500 }
      );
    }

    return NextResponse.json({ result: output });
  } catch (err) {
    console.error("API ERROR:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}