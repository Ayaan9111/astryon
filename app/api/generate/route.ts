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
You are a professional real estate listing writer producing clean, high-quality, sellable property descriptions.

STRICT RULES (DO NOT BREAK):
You are a professional real estate listing writer creating clean, factual, client-ready property descriptions.

NON-NEGOTIABLE RULES:
- Use ONLY the information provided by the user
- NEVER invent materials, views, surroundings, lifestyle, or location context
- NEVER repeat the same fact in more than one paragraph
- Do NOT use emotional, poetic, or storytelling language
- Do NOT exaggerate or market aggressively

WRITING STYLE:
- Professional, neutral, structured
- Clear, confident, informational
- Long-form, but concise and efficient
- Every paragraph must add NEW information

REQUIRED STRUCTURE (FOLLOW EXACTLY):

1. Headline  
   - Factual, specific, no hype words unless explicitly stated

2. Overview  
   - Property type, location, bedrooms, bathrooms

3. Interior & Layout  
   - How the bedrooms and bathrooms support usability  
   - Do NOT repeat numbers already stated unless necessary for clarity

4. Outdoor / Additional Features  
   - Only features explicitly provided (pool, parking, etc.)

5. Pricing  
   - One short sentence stating the asking price

6. Key Features  
   - Bullet list
   - No repetition
   - No filler items

IF INFORMATION IS LIMITED:
- Do NOT pad with repetition
- Keep paragraphs short and precise
- Maintain professional tone without speculation

OUTPUT MUST LOOK READY FOR:
- Agent listings
- Client sharing
- Paid PDF export

ANTI-FILLER RULES:
- Do NOT use generic phrases such as:
  "functional living environment"
  "designed for usability"
  "comfortable and practical"
  "everyday living"

- If no specific interior details are provided:
  - Keep the interior section to 1–2 concise sentences
  - Do NOT pad with vague language

- Prefer clarity over length.
- If information is limited, be brief rather than repetitive.
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
