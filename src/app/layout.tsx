import { ErrorBoundary } from '@/components/error-boundary';
import { ClerkProvider } from '@/components/providers/clerk-provider';
import { QueryProvider } from '@/components/providers/query-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ecuflow - Powerbanks y EcoFlows en Cuba',
  description:
    'Tienda online de powerbanks y productos EcoFlow. Encuentra las mejores estaciones de energía portátiles para Cuba.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Ecuflow',
  },
};

export const viewport: Viewport = {
  themeColor: '#0D1B2A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.className} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased overflow-x-hidden">
        <div className="bg-gradient-mesh">
          <div className="orb-3" />
          <div className="orb-4" />
          <div className="orb-5" />
        </div>
        <ClerkProvider>
          <ThemeProvider>
            <QueryProvider>
              <ErrorBoundary>{children}</ErrorBoundary>
            </QueryProvider>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
