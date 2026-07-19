import type { ReactNode } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import './globals.css';

export const metadata = {
  title: "Threads Aura Card — What's your internet aura?",
  description:
    'Enter your Threads username to distill your online profile cadence, humor, and creative energy into a beautiful, collectible glassmorphic card.',
  openGraph: {
    siteName: 'Threads Aura Card',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@heyitskuril',
  },
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
