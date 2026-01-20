"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex bg-black text-white">
      {/* SIDEBAR */}
      <aside className="w-64 bg-zinc-950 border-r border-purple-500/20 px-6 py-8">
        <Link
          href="/dashboard"
          className="block text-2xl font-bold text-purple-400 mb-12"
        >
          Astryón
        </Link>

        <nav className="space-y-1 text-sm">
          <NavLink href="/dashboard" active={pathname === "/dashboard"}>
            Dashboard
          </NavLink>

          <NavLink
            href="/dashboard/generate"
            active={pathname.startsWith("/dashboard/generate")}
          >
            Generate Listing
          </NavLink>

          <NavLink
            href="/dashboard/listings"
            active={pathname.startsWith("/dashboard/listings")}
          >
            Your Listings
          </NavLink>

          <div className="my-5 border-t border-white/10" />

          <NavLink href="/features" subtle>
            Features
          </NavLink>

          <NavLink href="/pricing" subtle>
            Pricing
          </NavLink>
        </nav>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 px-8 py-10">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

function NavLink({
  href,
  children,
  active = false,
  subtle = false,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  subtle?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`block rounded-xl px-4 py-3 transition font-medium
        ${
          active
            ? "bg-purple-500/15 text-purple-400 shadow-[0_0_20px_-10px_rgba(168,85,247,0.8)]"
            : subtle
            ? "text-white/50 hover:text-purple-400 hover:bg-purple-500/5"
            : "text-white/70 hover:text-purple-400 hover:bg-purple-500/10"
        }`}
    >
      {children}
    </Link>
  );
}
