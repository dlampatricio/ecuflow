import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@/components/providers/clerk-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { ErrorBoundary } from "@/components/error-boundary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ecuflow - Powerbanks y EcoFlows en Cuba",
  description:
    "Tienda online de powerbanks y productos EcoFlow. Encuentra las mejores estaciones de energía portátiles para Cuba.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Ecuflow",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-full flex-col`}
      >
        <ClerkProvider>
          <QueryProvider>
            <ErrorBoundary>
              {children}
            </ErrorBoundary>
          </QueryProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}