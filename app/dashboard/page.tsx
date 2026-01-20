import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-white/60 mt-1">
          Generate listings that actually convert.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <DashboardCard
          title="Generate Listing"
          description="Create high-converting real estate listings using AI."
          href="/dashboard/generate"
          emoji="🚀"
          glow
        />

        <DashboardCard
          title="Your Listings"
          description="View, edit, and export your generated listings."
          href="/dashboard/listings"
          emoji="📄"
        />

        <DashboardCard
          title="Upgrade"
          description="Unlock more credits and unlimited PDF exports."
          href="/pricing"
          emoji="💎"
        />

      </div>
    </div>
  );
}

function DashboardCard({
  title,
  description,
  href,
  emoji,
  glow = false,
}: {
  title: string;
  description: string;
  href: string;
  emoji: string;
  glow?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group rounded-2xl border border-purple-500/20 bg-zinc-950 p-6 transition
        hover:border-purple-400 hover:-translate-y-1
        ${glow ? "shadow-[0_0_40px_-15px_rgba(168,85,247,0.6)]" : ""}
      `}
    >
      <div className="text-3xl">{emoji}</div>
      <h2 className="mt-4 text-xl font-semibold group-hover:text-purple-400">
        {title}
      </h2>
      <p className="mt-2 text-white/60 text-sm">
        {description}
      </p>
    </Link>
  );
}
