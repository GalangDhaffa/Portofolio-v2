import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "./providers";
import CustomCursor from "@/components/CustomCursor";
import StardustBackground from "@/components/StardustBackground";
import Preloader from "@/components/Preloader";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio | Dhaffa Galang Fahriza",
  description: "Selamat datang di portofolio saya",
};

import { ScrollLockProvider } from "@/context/ScrollLockContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${outfit.className} antialiased text-foreground bg-background`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <ScrollLockProvider>
            <SessionProvider>
            <Preloader />
            <CustomCursor />
            <StardustBackground />
            <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
            <Navbar />
            
            <main className="min-h-screen">
              {children}
            </main>

            <Footer />
            <Toaster position="bottom-right" />
          </SessionProvider>
          </ScrollLockProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
