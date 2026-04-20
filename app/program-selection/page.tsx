'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Shell from '@/components/Shell';
import { nextFromProgram } from '@/lib/flow';
import type { Track } from '@/lib/flow';

export default function ProgramSelection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const track = (searchParams.get('track') ?? 'scholarship') as Track;

  function handleContinue() {
    router.push(nextFromProgram(track));
  }

  return (
    <Shell track={track}>
      <h1 className="text-2xl font-bold mb-6" style={{ color: '#F5F5F7' }}>
        Choose your program
      </h1>

      <div className="space-y-2 mb-6">
        {['Computer Science (BS)', 'Business Administration (BS)', 'Data Analytics (AAS)'].map(
          (prog, i) => (
            <div key={prog} className="rounded-xl px-4 py-3 flex items-center justify-between"
              style={{
                background: i === 0 ? '#2E3035' : '#13141A',
                border: `1px solid ${i === 0 ? '#FFFFFF20' : '#2E3035'}`,
              }}>
              <span className="text-sm font-medium" style={{ color: '#F5F5F7' }}>{prog}</span>
              {i === 0 && (
                <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                  style={{ background: '#D7FF3A', color: '#13141A' }}>Selected</span>
              )}
            </div>
          )
        )}
      </div>

      <button className="w-full rounded-full py-4 font-semibold text-sm"
        style={{ background: '#FFFFFF', color: '#13141A' }}
        onClick={handleContinue}>
        Continue
      </button>
      <button className="mt-3 w-full text-xs" style={{ color: '#9EA3AE' }}
        onClick={() => router.back()}>← Back</button>
    </Shell>
  );
}
