import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Track-Dev-Time",
  description:
    "Monitor your coding sessions with the track-dev-time CLI and explore detailed insights on this dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={cn(
          `${geistSans.variable} ${geistMono.variable} antialiased`,
          "h-full"
        )}
      >
        {children}
      </body>
    </html>
  );
}
