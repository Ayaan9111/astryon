import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <p className="text-white/60 mt-2">
          Welcome back. Generate listings that actually sell.
        </p>
      </div>

      {/* CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* GENERATE LISTING CARD */}
        <Link
          href="/dashboard/generate"
          className="group rounded-3xl border border-purple-500/30 bg-zinc-950 p-8 hover:border-purple-500 hover:shadow-[0_0_40px_-10px_rgba(168,85,247,0.6)] transition"
        >
          <h2 className="text-2xl font-semibold text-purple-400 mb-2">
            🚀 Generate Listing
          </h2>
          <p className="text-white/60 mb-6">
            Create high-converting real estate listings using AI in seconds.
          </p>

          <span className="inline-flex items-center gap-2 text-purple-400 font-semibold group-hover:translate-x-1 transition">
            Open tool →
          </span>
        </Link>
      </div>
    </div>
  );
}