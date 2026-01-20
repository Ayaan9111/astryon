import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Astryón",
  description: "AI-powered real estate listing generator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white flex flex-col">
        <main className="flex-1">{children}</main>

        {/* FOOTER — GLOBAL */}
        <footer className="border-t border-purple-500/20 bg-black py-6 text-sm text-white/50">
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/features" className="hover:text-purple-400">Features</Link>
            <Link href="/pricing" className="hover:text-purple-400">Pricing</Link>
            <Link href="/privacy" className="hover:text-purple-400">Privacy</Link>
            <Link href="/terms" className="hover:text-purple-400">Terms</Link>
            <Link href="/refund" className="hover:text-purple-400">Refund</Link>
          </div>

          <p className="mt-4 text-center text-xs text-white/40">
            © {new Date().getFullYear()} Astryón. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}