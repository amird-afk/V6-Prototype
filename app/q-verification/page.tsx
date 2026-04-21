'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Shell from '@/components/Shell';
import { useFlow } from '@/components/FlowProvider';
import { nextFromQ } from '@/lib/flow';
import type { Track } from '@/lib/flow';
import { Loader2 } from 'lucide-react';

export default function QVerification() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { plan } = useFlow();
  const track = (searchParams.get('track') ?? 'scholarship') as Track;

  function handleContinue() {
    if (track === 'partial') {
      // Skip plan-selection for partial — plan was chosen at eligibility
      router.push(`/tuition-package?tier=partial-${plan}&track=partial`);
    } else {
      router.push(nextFromQ(track));
    }
  }

  return (
    <Shell track={track}>
      <h1 className="text-2xl font-bold mb-2" style={{ color: '#F5F5F7' }}>
        Verification Queue
      </h1>
      <p className="text-sm mb-6" style={{ color: '#9EA3AE' }}>
        Your documents are being reviewed by our enrollment team.
      </p>

      <div className="flex items-center gap-3 rounded-xl px-4 py-3 mb-6"
        style={{ background: '#13141A', border: '1px solid #2E3035' }}>
        <Loader2 className="animate-spin h-4 w-4 flex-shrink-0" style={{ color: '#D7FF3A' }} />
        <span className="text-sm font-mono" style={{ color: '#9EA3AE' }}>
          Ticket #MS-48217 · Under review
        </span>
      </div>

      <button className="w-full rounded-full py-4 font-semibold text-sm"
        style={{ background: '#FFFFFF', color: '#13141A' }}
        onClick={handleContinue}>
        Queue cleared — Continue
      </button>
      <button className="mt-3 w-full text-xs" style={{ color: '#9EA3AE' }}
        onClick={() => router.back()}>← Back</button>
    </Shell>
  );
}
