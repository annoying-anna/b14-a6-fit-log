import type { Metadata, Viewport } from "next";
import { Inter, Oswald } from "next/font/google";
import { Toaster } from "react-hot-toast";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { PlanProvider } from "@/context/PlanContext";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

const description =
  "FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "FitLog — Workout Library & Plan Builder",
    template: "%s | FitLog",
  },
  description,
  keywords: ["FitLog", "workout library", "gym log", "training plan", "Next.js"],
  openGraph: {
    title: "FitLog — Workout Library & Plan Builder",
    description,
    type: "website",
    images: ["/fitlog-banner.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0f1115",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
      <body className="flex min-h-screen flex-col">
        <PlanProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#15171d",
                color: "#ffffff",
                border: "1px solid #232732",
                borderRadius: "12px",
                fontSize: "13px",
                fontWeight: 500,
              },
              success: { iconTheme: { primary: "#ccff00", secondary: "#0f1115" } },
              error: { iconTheme: { primary: "#f87171", secondary: "#0f1115" } },
            }}
          />
        </PlanProvider>
      </body>
    </html>
  );
}
