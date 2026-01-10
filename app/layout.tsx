import "./globals.css";

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
      <body className="bg-[#0b0b10] text-gray-200">
        {children}
      </body>
    </html>
  );
}