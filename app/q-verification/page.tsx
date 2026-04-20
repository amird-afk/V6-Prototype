'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Shell from '@/components/Shell';
import { Button } from '@/components/ui/button';
import { useFlow } from '@/components/FlowProvider';
import { nextFromQVerification } from '@/lib/flow';
import type { Track } from '@/lib/flow';
import { Loader2 } from 'lucide-react';

export default function QVerification() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { scenario } = useFlow();
  const track = (searchParams.get('track') ?? 'scholarship') as Track;

  function handleContinue() {
    const next = nextFromQVerification(scenario, track);
    if (next.modal) {
      router.push(`/q-verification?track=${track}&modal=${next.modal}`);
    } else {
      router.push(next.href);
    }
  }

  return (
    <Shell track={track}>
      <h1 className="text-2xl font-bold mb-2" style={{ color: '#F5F5F7' }}>
        Verification Queue
      </h1>
      <p className="mb-6 text-sm" style={{ color: '#A1A1AA' }}>
        Your Proof of Enrollment and Stripe ID documents are being reviewed by our enrollment team.
      </p>

      {/* Fake ticket row */}
      <div
        className="flex items-center gap-3 rounded-lg px-4 py-3 mb-8"
        style={{ background: '#0B0B0C', border: '1px solid #2A2B30' }}
      >
        <Loader2 className="animate-spin h-4 w-4 flex-shrink-0" style={{ color: '#D7FF3A' }} />
        <span className="text-sm font-mono" style={{ color: '#A1A1AA' }}>
          Ticket #MS-48217 · Under review
        </span>
      </div>

      <Button
        className="w-full font-semibold text-base py-6"
        style={{ background: '#D7FF3A', color: '#0B0B0C' }}
        onClick={handleContinue}
      >
        Queue cleared — Continue
      </Button>
      <button
        className="mt-4 w-full text-sm"
        style={{ color: '#A1A1AA' }}
        onClick={() => router.back()}
      >
        ← Back
      </button>
    </Shell>
  );
}
