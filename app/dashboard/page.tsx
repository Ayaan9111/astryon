export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-black p-8 text-white">
      <h1 className="text-3xl font-bold mb-4">
        Dashboard
      </h1>

      <p className="text-white/70 mb-6">
        Welcome back. Generate listings that actually sell.
      </p>

      <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
        <h2 className="text-xl font-semibold mb-2">
          🚀 Astryón AI Listing Generator
        </h2>

        <p className="text-white/60 mb-4">
          Create high-converting real estate listings in seconds.
        </p>

        <a
          href="/dashboard/generate"
          className="inline-block rounded-md bg-purple-600 px-5 py-3 font-semibold hover:bg-purple-700 transition"
        >
          Generate Listing
        </a>
      </div>
    </div>
  );
}