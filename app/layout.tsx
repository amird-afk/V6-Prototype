import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { FlowProvider } from '@/components/FlowProvider';
import { Suspense } from 'react';

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Masterschool Enrollment Funnel',
  description: 'Clickable prototype of the Masterschool enrollment funnel',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col" style={{ background: '#0B0B0C' }}>
        <Suspense>
          <FlowProvider>{children}</FlowProvider>
        </Suspense>
      </body>
    </html>
  );
}
