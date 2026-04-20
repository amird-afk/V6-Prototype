'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Shell from '@/components/Shell';
import { Check } from 'lucide-react';
import type { Track } from '@/lib/flow';

const docs = [
  'Enrollment agreement',
  'Terms of service',
  'Privacy notice',
];

export default function EnrollmentDocuments() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const track = (searchParams.get('track') ?? 'scholarship') as Track;
  const [signed, setSigned] = useState<Set<number>>(new Set());

  function toggle(i: number) {
    setSigned((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }

  function handleContinue() {
    if (track === 'selfpay' || track === 'partial') {
      router.push('/pay-flow');
    } else {
      router.push('/finished?track=scholarship');
    }
  }

  return (
    <Shell track={track}>
      <h1 className="text-2xl font-bold mb-2" style={{ color: '#F5F5F7' }}>
        Sign enrollment documents
      </h1>
      <p className="text-sm mb-5" style={{ color: '#9EA3AE' }}>
        Review and sign each document to complete your enrollment.
      </p>

      <div className="space-y-2 mb-6">
        {docs.map((doc, i) => (
          <button key={doc} onClick={() => toggle(i)}
            className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left"
            style={{
              background: signed.has(i) ? '#1A2E22' : '#13141A',
              border: `1px solid ${signed.has(i) ? '#34D39940' : '#2E3035'}`,
            }}>
            <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
              style={{ background: signed.has(i) ? '#34D399' : '#2E3035' }}>
              {signed.has(i) && <Check className="w-3 h-3" style={{ color: '#13141A' }} />}
            </div>
            <span className="text-sm" style={{ color: '#F5F5F7' }}>{doc}</span>
          </button>
        ))}
      </div>

      <button
        className="w-full rounded-full py-4 font-semibold text-sm disabled:opacity-40"
        style={{ background: '#FFFFFF', color: '#13141A' }}
        disabled={signed.size < docs.length}
        onClick={handleContinue}>
        Submit documents
      </button>
      <button className="mt-3 w-full text-xs" style={{ color: '#9EA3AE' }}
        onClick={() => router.back()}>← Back</button>
    </Shell>
  );
}
