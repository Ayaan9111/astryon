import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r border-neutral-800 bg-black">
        <div className="px-6 py-4 text-xl font-bold text-purple-500">
          Astryón
        </div>

        <nav className="flex flex-col gap-2 px-4">
          <Link
            href="/dashboard"
            className="rounded-md px-3 py-2 hover:bg-neutral-900"
          >
            Dashboard
          </Link>

          <Link
            href="/dashboard/generate"
            className="rounded-md px-3 py-2 hover:bg-neutral-900"
          >
            Generate Listing
          </Link>

          <Link
            href="/dashboard/listings"
            className="rounded-md px-3 py-2 hover:bg-neutral-900"
          >
            Your Listings
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="relative z-10 flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
