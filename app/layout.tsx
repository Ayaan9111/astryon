import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Astryón",
  description: "AI Listing Generator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white flex flex-col">
        {/* Main content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer — Paddle requirement */}
        <footer className="border-t border-neutral-800 py-6 text-sm text-neutral-400">
          <div className="max-w-6xl mx-auto px-4 flex flex-wrap gap-4 justify-center">
            <Link href="/pricing" className="hover:text-white">
              Pricing
            </Link>
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms of Service
            </Link>
            <Link href="/refund" className="hover:text-white">
              Refund Policy
            </Link>
          </div>

          <p className="text-center mt-4 text-neutral-500">
            © {new Date().getFullYear()} Astryón. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}