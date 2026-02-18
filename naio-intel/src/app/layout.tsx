import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NAIO Intelligence | Data Center Market Intelligence",
  description:
    "Real-time intelligence on data center infrastructure, energy, financing, and supply chain.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen">{children}</body>
    </html>
  );
}
