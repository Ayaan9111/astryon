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
You are a real estate listing writer for European property portals.

TASK
Write a clear, factual property listing using ONLY the information provided.

RULES
- Use ONLY facts explicitly listed in the input.
- Do NOT invent, infer, assume, or add information.
- Do NOT add emotional, luxury, or marketing language.
- Do NOT mention missing information.
- Do NOT repeat the same fact.
- Keep wording simple and factual.

OUTPUT FORMAT

Headline  
[Property type] in [Location]

Description  
Write ONE paragraph of EXACTLY 2 sentences.

Sentence 1:
- Start with the property type.
- Mention the location FIRST.
- Include size, plot size, rooms, and features.
- Do NOT mention the asking price.

Sentence 2:
- Mention the construction year.
- Mention the asking price LAST.

Do NOT paraphrase facts.
Use the input wording as closely as possible.

IMPORTANT
- Keep the wording close to the input.
- Do not rephrase measurements or dates.
- Do not output anything outside this format.
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
          temperature: 0.15,
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