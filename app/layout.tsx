import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Andre Santos — Marketing Analytics & Data Strategy",
  description:
    "AI-powered career site. Explore my experience, assess fit for your role, or ask AI about my background.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">{children}</body>
    </html>
  );
}
