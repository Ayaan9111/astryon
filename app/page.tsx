import Link from "next/link";

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto py-20 px-6 text-center">
      <h1 className="text-5xl font-bold mb-6">
        Astryón
      </h1>

      <p className="text-xl text-white/70 mb-10">
        Astryón is an AI-powered real estate listing generator for agents and brokers.
        It creates high-conversion property descriptions and exportable PDF brochures in seconds.
      </p>

      <div className="flex justify-center gap-6">
        <Link
          href="/pricing"
          className="rounded-md bg-purple-600 px-6 py-3 font-semibold hover:bg-purple-700"
        >
          View Pricing
        </Link>

        <Link
          href="/dashboard"
          className="rounded-md border border-white/20 px-6 py-3 font-semibold hover:border-purple-400"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}