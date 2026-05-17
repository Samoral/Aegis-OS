import type { Metadata, Viewport } from 'next';
import './globals.css';
import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ErrorBoundary from '@/components/ErrorBoundary';

export const metadata: Metadata = {
  title: {
    default: 'AEGIS OS - Emergency Response System',
    template: '%s | AEGIS OS',
  },
  description: 'Advanced Emergency Global Intelligence System combining AI, satellite monitoring, and real-time coordination to save lives worldwide.',
  keywords: [
    'emergency response',
    'crisis management',
    'AI coordination',
    'disaster relief',
    'real-time monitoring',
    'satellite tracking',
    'emergency intelligence',
  ],
  authors: [{ name: 'AEGIS Team' }],
  creator: 'AEGIS Team',
  publisher: 'AEGIS OS',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aegis-os.vercel.app',
    title: 'AEGIS OS - Emergency Response System',
    description: 'Advanced Emergency Global Intelligence System for coordinating rapid response and resource management',
    siteName: 'AEGIS OS',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AEGIS OS - Emergency Response System',
    description: 'Advanced Emergency Global Intelligence System for coordinating rapid response and resource management',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0ea5e9' },
    { media: '(prefers-color-scheme: dark)', color: '#0ea5e9' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}

// Made with Bob
