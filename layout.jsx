import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Header from "./ui/header/Header";
import Footer from "./ui/footer/Footer";

const inter = Inter({ subsets: ["latin"], display: "swap" });
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://addiseats.et"),
  title: {
    default: "Addis Eats | Ethiopian food in Addis Ababa",
    template: "%s | Addis Eats",
  },
  description: "Discover Ethiopian favourites and order freshly prepared food from Addis Eats in Addis Ababa.",
  openGraph: {
    type: "website",
    locale: "en_ET",
    siteName: "Addis Eats",
    title: "Addis Eats | Ethiopian food in Addis Ababa",
    description: "Discover Ethiopian favourites and order freshly prepared food from Addis Eats in Addis Ababa.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.className} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Suspense fallback={<div>Loading header…</div>}>
          <Header />
        </Suspense>
        {children}
        <Footer />
      </body>
    </html>
  );
}
