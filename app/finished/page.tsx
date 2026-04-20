'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Shell from '@/components/Shell';
import { CheckCircle2 } from 'lucide-react';
import type { Track } from '@/lib/flow';

export default function Finished() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const track = (searchParams.get('track') ?? 'scholarship') as Track;

  function handleHub() {
    alert('Prototype end — redirecting to home.');
    router.push('/');
  }

  return (
    <Shell track={track}>
      <div className="flex flex-col items-center text-center py-4">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
          style={{ background: '#1A2E22' }}
        >
          <CheckCircle2 className="w-8 h-8" style={{ color: '#34D399' }} />
        </div>
        <h1 className="text-2xl font-bold mb-2" style={{ color: '#F5F5F7' }}>
          You&apos;re enrolled!
        </h1>
        <p className="text-sm mb-8" style={{ color: '#9EA3AE' }}>
          {track === 'selfpay'
            ? 'Payment confirmed. Welcome to Masterschool.'
            : 'Scholarship confirmed. Welcome to Masterschool.'}
        </p>
        <button
          className="w-full rounded-full py-4 font-semibold text-sm"
          style={{ background: '#FFFFFF', color: '#13141A' }}
          onClick={handleHub}
        >
          Go to Student Hub
        </button>
      </div>
    </Shell>
  );
}
