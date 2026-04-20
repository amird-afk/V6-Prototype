'use client';

import { ReactNode } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import StepBadge from './StepBadge';
import FlowModal from './FlowModal';
import DemoBar from './DemoBar';
import type { Track } from '@/lib/flow';

interface ShellProps {
  children: ReactNode;
  track?: Track;
}

export default function Shell({ children, track }: ShellProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const modalId = searchParams.get('modal');

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0B0B0C' }}>
      {/* Top bar */}
      <header className="flex items-center px-6 py-4">
        <span className="text-lg font-bold tracking-tight" style={{ color: '#F5F5F7' }}>
          Master<span style={{ color: '#D7FF3A' }}>school</span>
        </span>
      </header>

      {/* Centered content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl">
          <StepBadge pathname={pathname} track={track ?? null} />
          <Card
            className="mt-4 p-8 rounded-2xl border"
            style={{
              background: '#17181B',
              borderColor: '#2A2B30',
            }}
          >
            {children}
          </Card>
        </div>
      </main>

      {/* Modals */}
      {modalId && <FlowModal modalId={modalId} />}

      {/* Demo bar */}
      <DemoBar />
    </div>
  );
}
