import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center">
      <div className="max-w-5xl mx-auto px-6 py-20 text-center">
        {/* TITLE */}
        <h1 className="text-5xl font-bold mb-6">Astryón</h1>

        {/* DESCRIPTION */}
        <p className="text-xl text-white/70 mb-10">
          Astryón is an AI-powered real estate listing generator designed for agents
          and brokers. It transforms structured property details into clear,
          factual, and professional listings without adding or inventing information.
        </p>

        {/* CTA BUTTONS */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-20">
          <Link
            href="/pricing"
            className="rounded-md bg-purple-600 px-8 py-3 font-semibold hover:bg-purple-700 transition"
          >
            View Pricing
          </Link>

          <Link
            href="/dashboard"
            className="rounded-md border border-white/20 px-8 py-3 font-semibold hover:border-purple-400 transition"
          >
            Go to Dashboard
          </Link>
        </div>

        {/* HOW IT WORKS */}
        <h2 className="text-2xl font-semibold mb-6">
          How Astryón Works
        </h2>

        <div className="space-y-4 text-white/70 max-w-3xl mx-auto text-left mb-20">
          <p>
            <strong>1. Enter property details — </strong>
            Add structured information such as bedrooms, bathrooms, size,
            location, year built, price, and available features.
          </p>

          <p>
            <strong>2. Generate the listing — </strong>
            Astryón converts the provided data into a clean, structured real estate
            listing while strictly following the given inputs.
          </p>

          <p>
            <strong>3. Export and use — </strong>
            Download the listing as text or PDF and reuse it across property portals,
            client communications, or internal workflows.
          </p>
        </div>

        {/* CORE FEATURES */}
        <h2 className="text-2xl font-semibold mb-6">
          Core Features & Benefits
        </h2>

        <ul className="space-y-4 text-white/70 max-w-3xl mx-auto text-left">
          <li>• Generates clean, factual real estate listings from structured inputs</li>
          <li>• Prevents hallucinated or invented property details</li>
          <li>• Produces consistent, professional formatting across all listings</li>
          <li>• Saves time by eliminating manual listing writing</li>
          <li>• Exports listings as text or PDF for easy reuse</li>
        </ul>
      </div>
    </div>
  );
}