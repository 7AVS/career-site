import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Andre Santos — Marketing Analytics & Data Strategy",
  description:
    "AI-powered career site. Explore my experience, assess fit for your role, or ask AI about my background.",
  metadataBase: new URL("https://about-andre-santos.vercel.app"),
  openGraph: {
    title: "Andre Santos — Interactive Resume",
    description:
      "14 years in global banking. Data governance, marketing measurement, and analytics engineering.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Andre Santos — Interactive Resume",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Andre Santos — Interactive Resume",
    description:
      "14 years in global banking. Data governance, marketing measurement, and analytics engineering.",
    images: ["/og-image.png"],
  },
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
