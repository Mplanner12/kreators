import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import MasterSidebar from "@/components/MasterSidebar";
import TopBar from "@/components/TopBar";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kreatoors - Content Studio",
  description: "Kreatoors platform for content creation and brand management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/kreatoors-logo.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased bg-gray-100`}
      >
        <Toaster position="top-center" reverseOrder={false} />
        <div className="flex h-screen overflow-hidden">
          <MasterSidebar className="hidden md:block" />{" "}
          <div className="flex-1 flex flex-col overflow-hidden">
            <TopBar />
            <main className="flex-1 overflow-y-auto bg-[#F7F7F7] p-4 md:p-7">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
