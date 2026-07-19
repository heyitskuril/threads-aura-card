import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import ErrorBoundary from './components/ErrorBoundary';
import './globals.css';

const url = 'https://threads-aura-card.vercel.app';

export const metadata: Metadata = {
  title: 'Threads Aura Card — What\'s your internet aura?',
  description:
    'Enter your Threads username and get a beautiful AI-generated aura card with metrics, rarity tier, badges, and insights based on your public profile.',
  metadataBase: new URL(url),
  openGraph: {
    title: 'Threads Aura Card — What\'s your internet aura?',
    description:
      'Enter your Threads username and get a beautiful AI-generated aura card with metrics, rarity tier, badges, and insights based on your public profile.',
    url,
    siteName: 'Threads Aura Card',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Threads Aura Card — What\'s your internet aura?',
    description:
      'Enter your Threads username and get a beautiful AI-generated aura card.',
    site: '@heyitskuril',
    creator: '@heyitskuril',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans bg-[#050505] text-slate-100 antialiased">
        <ErrorBoundary>{children}</ErrorBoundary>
      </body>
    </html>
  );
}
