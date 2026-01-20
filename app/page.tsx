import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center">
      <div className="max-w-5xl mx-auto px-6 py-20 text-center">
        {/* TITLE */}
        <h1 className="text-5xl font-bold mb-6">
          Astryón
        </h1>

        {/* DESCRIPTION */}
        <p className="text-xl text-white/70 mb-10">
          Astryón is an AI-powered real estate listing generator for agents and brokers.
          Create high-conversion luxury property descriptions and export them as PDFs in seconds.
        </p>

        {/* CTA BUTTONS */}
        <div className="flex flex-col sm:flex-row justify-center gap-6">
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
      </div>
    </div>
  );
}
