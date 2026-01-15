import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Donel & D Plumbing | Elite Plumbing Services in Naples, Marco Island & Bonita Springs, FL",
  description:
    "Donel & D Plumbing provides expert residential and commercial plumbing services in Naples, Marco Island, and Bonita Springs, Florida including repairs, installations, water heaters, and emergency service.",
  openGraph: {
    title: "Donel & D Plumbing | Elite Plumbing Services in Naples, Marco Island & Bonita Springs, FL",
    description:
      "Donel & D Plumbing provides expert residential and commercial plumbing services in Naples, Marco Island, and Bonita Springs, Florida including repairs, installations, water heaters, and emergency service.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Donel & D Plumbing | Elite Plumbing Services in Naples, Marco Island & Bonita Springs, FL",
    description:
      "Donel & D Plumbing provides expert residential and commercial plumbing services in Naples, Marco Island, and Bonita Springs, Florida including repairs, installations, water heaters, and emergency service.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Plumber",
    name: "Donel & D Plumbing",
    description:
      "Residential and commercial plumbing services in Naples, Marco Island, and Bonita Springs, Florida.",
    areaServed: "Naples, Marco Island, Bonita Springs, FL",
    telephone: "+1-239-398-0838",
    email: "doneldestine5@gmail.com",
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
