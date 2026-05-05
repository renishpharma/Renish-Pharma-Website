import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Renish Pharmaceutical | Leading Healthcare Solutions",
  description: "Renish Pharmaceutical is a premier healthcare company dedicated to delivering high-quality pharmaceutical products and clinical solutions globally. Top PCD pharma franchise company with monopoly rights and third party manufacturing in Chandigarh and Panchkula.",
  keywords: ["Pcd pharma franchise", "Monopoly rights", "Third party manufacturing", "In chandigarh", "In panchkula", "Renish Pharmaceutical", "Pharmaceutical company"],
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
      className={`${onest.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <Navbar />
        <main className="grow">
          {children}
        </main>
        <WhatsAppButton />
        <Footer />
      </body>
    </html>
  );
}
