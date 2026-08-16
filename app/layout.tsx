import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-outfit",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Andre Santos — Marketing Analytics & Data Strategy",
  description:
    "Andre Santos — 14 years in data governance, analytics engineering, and marketing measurement. Explore experience, check fit for your role, or ask AI. Based in Vancouver, Canada.",
  metadataBase: new URL("https://about-andre-santos.vercel.app"),
  alternates: {
    canonical: "/",
  },
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: "Andre Santos",
    jobTitle: "Marketing Analytics Manager",
    url: "https://about-andre-santos.vercel.app",
    sameAs: ["https://linkedin.com/in/andre-v-santos"],
    worksFor: {
      "@type": "Organization",
      name: "RBC Royal Bank",
    },
    knowsAbout: [
      "Data Governance",
      "Marketing Analytics",
      "Analytics Engineering",
      "Financial Services",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Vancouver",
      addressCountry: "CA",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${cormorant.variable} ${outfit.variable} ${jetbrains.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}