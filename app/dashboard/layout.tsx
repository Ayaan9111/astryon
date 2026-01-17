import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-black text-white">

      {/* SIDEBAR */}
      <aside className="w-64 bg-zinc-950 border-r border-purple-500/20 p-6">
        <Link
          href="/dashboard"
          className="block text-2xl font-bold text-purple-400 mb-10"
        >
          Astryón
        </Link>

        <nav className="space-y-2 text-sm">
          <NavLink href="/dashboard">Dashboard</NavLink>
          <NavLink href="/dashboard/generate">Generate Listing</NavLink>
          <NavLink href="/dashboard/listings">Your Listings</NavLink>

          <div className="my-4 border-t border-white/10" />

          <NavLink href="/features" subtle>Features</NavLink>
          <NavLink href="/pricing" subtle>Pricing</NavLink>
        </nav>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 px-8 py-10">
        {children}
      </main>
    </div>
  );
}

function NavLink({
  href,
  children,
  subtle = false,
}: {
  href: string;
  children: React.ReactNode;
  subtle?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`block rounded-xl px-4 py-3 transition
        ${
          subtle
            ? "text-white/50 hover:text-purple-400 hover:bg-purple-500/5"
            : "text-white/70 hover:text-purple-400 hover:bg-purple-500/10"
        }`}
    >
      {children}
    </Link>
  );
}