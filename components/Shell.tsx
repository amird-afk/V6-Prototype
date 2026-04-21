'use client';

import { ReactNode } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import StepBadge from './StepBadge';
import FlowModal from './FlowModal';
import { useFlow } from './FlowProvider';
import type { Track } from '@/lib/flow';

interface ShellProps {
  children: ReactNode;
  track?: Track;
}

export default function Shell({ children, track }: ShellProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { reset } = useFlow();
  const modalId = searchParams.get('modal');

  function handleRestart() {
    reset();
    router.push('/');
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#13141A' }}>
      <header className="flex items-center justify-between px-5 pt-5 pb-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded flex items-center justify-center"
            style={{ background: '#2E3035' }}>
            <span className="text-[10px] font-black" style={{ color: '#D7FF3A' }}>M</span>
          </div>
          <span className="text-base font-bold tracking-tight" style={{ color: '#F5F5F7' }}>
            maestro
          </span>
        </div>
        <button
          onClick={handleRestart}
          className="text-[11px] px-3 py-1.5 rounded-full"
          style={{ background: '#2E3035', color: '#9EA3AE' }}
        >
          ↩ Restart
        </button>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-sm">
          <StepBadge pathname={pathname} track={track ?? null} />
          <div className="mt-3 rounded-3xl p-6" style={{ background: '#1E2024' }}>
            {children}
          </div>
        </div>
      </main>

      {modalId && <FlowModal modalId={modalId} />}
    </div>
  );
}
