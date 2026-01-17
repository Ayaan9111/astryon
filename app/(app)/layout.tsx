import Link from "next/link";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-64px)]">

      {/* LEFT SIDEBAR */}
      <aside className="w-64 border-r border-white/10 bg-zinc-950 p-6">
        <nav className="space-y-6">

          <Link
            href="/dashboard"
            className="block text-white font-semibold hover:text-purple-400"
          >
            Dashboard
          </Link>

          <div className="space-y-2 text-sm text-white/70">
            <Link
              href="/dashboard/generate"
              className="block hover:text-purple-400"
            >
              → Generate Listing
            </Link>

            <Link
              href="/listings"
              className="block hover:text-purple-400"
            >
              → Your Listings
            </Link>
          </div>

        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <section className="flex-1 p-10">
        {children}
      </section>

    </div>
  );
}