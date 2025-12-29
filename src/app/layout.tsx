import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bulldog Lacrosse Camps | Yale University",
  description: "Premier lacrosse camps at Yale University's Reese Stadium. Summer camps for ages 7-17, elite clinics for high school players, and prospect showcases with top college coaches.",
  keywords: "lacrosse camp, Yale lacrosse, New Haven CT, summer camp, lacrosse training, prospect camp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}
