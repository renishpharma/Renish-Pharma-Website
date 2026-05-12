import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Renish Pharmaceutical | Top PCD Pharma Franchise in India",
    template: "%s | Renish Pharmaceutical"
  },
  description: "Renish Pharmaceutical is a premier healthcare company and the best PCD pharma franchise company in India. We offer monopoly rights, third party manufacturing, and high-quality generic pharma products in Chandigarh, Panchkula, and Himachal.",
  keywords: [
    "Top PCD pharma franchise in india",
    "Best PCD pharma franchise",
    "Top generic pharma company",
    "Monopoly rights",
    "Third party manufacturing",
    "In chandigarh",
    "In panchkula",
    "In himachal",
    "Renish Pharmaceutical",
    "Pharmaceutical company in India",
    "Pharma franchise company",
    "Pharma manufacturing"
  ],
  authors: [{ name: "Renish Pharmaceutical" }],
  creator: "Renish Pharmaceutical",
  publisher: "Renish Pharmaceutical",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.renishpharmaceutical.com",
    title: "Renish Pharmaceutical | Top PCD Pharma Franchise in India",
    description: "Leading PCD Pharma Franchise company offering monopoly rights and third-party manufacturing services across India.",
    siteName: "Renish Pharmaceutical",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Renish Pharmaceutical",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Renish Pharmaceutical | Top PCD Pharma Franchise in India",
    description: "Leading PCD Pharma Franchise company offering monopoly rights and third-party manufacturing services across India.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.renishpharmaceutical.com",
  },
  icons: {
    icon: "/favicon_io/favicon.ico",
    shortcut: "/favicon_io/favicon-32x32.png",
    apple: "/favicon_io/apple-touch-icon.png",
  }
};

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${onest.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground font-sans">
        <Navbar />
        <main className="grow">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
