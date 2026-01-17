"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import ListingPDF from "@/lib/pdf/ListingPDF";
import { PDFDownloadLink } from "@react-pdf/renderer";

const supabase = createSupabaseBrowserClient();

const LOADER_STEPS = [
  "Analyzing property details…",
  "Understanding buyer psychology…",
  "Structuring premium narrative…",
  "Optimizing wording for conversions…",
  "Enhancing luxury appeal…",
  "Finalizing high-impact listing…",
];

export default function GeneratePage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [credits, setCredits] = useState<number | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);

  const isLocked = credits !== null && credits <= 0;

  useEffect(() => {
    const fetchCredits = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data } = await supabase
        .from("profiles")
        .select("credits")
        .eq("id", user.id)
        .single();

      setCredits(data?.credits ?? 0);
    };

    fetchCredits();
  }, []);

  const generateListing = async () => {
    if (!input.trim()) return;

    if (isLocked) {
      setShowPaywall(true);
      return;
    }

    setLoading(true);
    setResult("");
    setShowPaywall(false);
    setStepIndex(0);

    const interval = setInterval(() => {
      setStepIndex((i) => Math.min(i + 1, LOADER_STEPS.length - 1));
    }, 900);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();
      if (data?.result) setResult(data.result);
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">AI Listing Generator</h1>
        <p className="text-white/60">
          Credits: {credits ?? "—"} / 2
        </p>
      </div>

      {/* INPUT CARD */}
      <div className="rounded-3xl border border-white/10 bg-zinc-950 p-8 shadow-xl">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste raw property details here…"
          className="w-full min-h-[160px] rounded-xl bg-black border border-white/10 p-4 focus:outline-none"
        />

        <button
          onClick={generateListing}
          disabled={loading}
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-purple-500 px-8 py-3 font-semibold hover:bg-purple-600 transition disabled:opacity-50"
        >
          {loading ? "Generating…" : "Generate Listing"}
        </button>
      </div>

      {/* LOADER */}
      {loading && (
        <div className="rounded-xl border border-white/10 bg-zinc-950 p-6">
          <p className="animate-pulse text-white/70">
            {LOADER_STEPS[stepIndex]}
          </p>
        </div>
      )}

      {/* RESULT CARD */}
      {result && (
        <div className="rounded-3xl border border-white/10 bg-zinc-950 p-8 space-y-6">
          <pre className="whitespace-pre-wrap text-white/80">
            {result}
          </pre>

          <PDFDownloadLink
            document={<ListingPDF listing={result} />}
            fileName="listing.pdf"
            className="inline-flex rounded-xl bg-white px-6 py-3 text-black font-semibold hover:opacity-90"
          >
            Download PDF
          </PDFDownloadLink>
        </div>
      )}

      {/* PAYWALL */}
      {showPaywall && (
        <div className="rounded-3xl border border-purple-500/30 bg-zinc-950 p-10 text-center">
          <h2 className="text-2xl font-bold mb-2">
            🚫 Credits exhausted
          </h2>
          <p className="text-white/60 mb-6">
            Upgrade to continue generating listings.
          </p>

          <button className="rounded-xl bg-purple-500 px-8 py-3 font-semibold hover:bg-purple-600">
            Upgrade — €19 / month
          </button>
        </div>
      )}
    </div>
  );
}