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

  // 🔹 FETCH CREDITS
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

  const startProgressLoader = () => {
    setStepIndex(0);
    let i = 0;

    const interval = setInterval(() => {
      i++;
      setStepIndex(i);
      if (i >= LOADER_STEPS.length - 1) clearInterval(interval);
    }, 900);

    return interval;
  };

  // 🔥 THIS IS THE FIXED GENERATE HANDLER
  const generateListing = async () => {
    if (!input.trim()) return;

    // 🚫 PAYWALL TRIGGER
    if (isLocked) {
      setShowPaywall(true);
      return;
    }

    setLoading(true);
    setResult("");
    setShowPaywall(false);

    const interval = startProgressLoader();

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();

      if (data?.result) {
        setResult(data.result);

        // 🔥 DEDUCT CREDIT
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          await supabase
            .from("profiles")
            .update({ credits: credits! - 1 })
            .eq("id", user.id);

          setCredits((c) => (c !== null ? c - 1 : c));
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-2">
        AI Real Estate Listing Generator
      </h1>

      <p className="text-sm text-zinc-400 mb-6">
        Credits: {credits ?? "—"} / 2
      </p>

      {/* INPUT */}
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste raw property details here…"
        className="w-full min-h-[140px] p-4 rounded-lg bg-zinc-900 border border-zinc-700 focus:outline-none"
      />

      {/* BUTTON */}
      <button
        onClick={generateListing}
        disabled={loading}
        className={`mt-4 px-6 py-3 rounded-lg font-semibold transition ${
          loading
            ? "bg-zinc-700 cursor-not-allowed"
            : "bg-white text-black hover:opacity-90"
        }`}
      >
        {loading ? "Generating…" : "Generate Listing"}
      </button>

      {/* PROGRESS */}
      {loading && (
        <div className="mt-6 p-4 rounded-lg bg-zinc-900 border border-zinc-700">
          <p className="animate-pulse text-sm text-zinc-300">
            {LOADER_STEPS[stepIndex]}
          </p>
        </div>
      )}

      {/* OUTPUT */}
      {result && !loading && (
        <>
          <div className="mt-8 p-6 rounded-lg bg-zinc-900 border border-zinc-700 whitespace-pre-wrap leading-relaxed">
            {result}
          </div>

          {/* PDF EXPORT */}
          <div className="mt-6">
            <PDFDownloadLink
              document={<ListingPDF listing={result} />}
              fileName="listing.pdf"
              className="inline-block px-6 py-3 rounded-lg bg-white text-black font-semibold hover:opacity-90"
            >
              Download PDF
            </PDFDownloadLink>
          </div>
        </>
      )}

      {/* 💳 PAYWALL */}
      {showPaywall && (
        <div className="mt-10 p-6 rounded-xl border border-zinc-800 bg-zinc-950 text-center space-y-3">
          <p className="text-2xl font-bold">🚫 Free credits exhausted</p>
          <p className="text-zinc-400">
            Upgrade to continue generating listings & exporting PDFs
          </p>

          <button className="mt-3 px-8 py-3 rounded-xl bg-white text-black font-semibold hover:opacity-90">
            Upgrade — €19 / month
          </button>
        </div>
      )}
    </div>
  );
}