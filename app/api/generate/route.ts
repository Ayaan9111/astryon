import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

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

    // 5️⃣ AI PROMPTS
    const systemPrompt = `
You are a professional luxury real estate copywriter.

RULES (DO NOT BREAK):
- Use ONLY the details provided by the user
- NEVER invent city, price, bedrooms, or property type
- Always produce a FULL, LONG-FORM listing
- ALWAYS finish with a complete "Key Features" list
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
      return NextResponse.json(
        { error: "AI generation failed" },
        { status: 500 }
      );
    }

    const data = await response.json();
    const output = data?.choices?.[0]?.message?.content;

    return NextResponse.json({ result: output });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}