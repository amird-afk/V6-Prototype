'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Shell from '@/components/Shell';
import { Button } from '@/components/ui/button';
import { useFlow } from '@/components/FlowProvider';
import { nextFromProgramSelection } from '@/lib/flow';
import type { Track } from '@/lib/flow';

export default function ProgramSelection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { scenario } = useFlow();
  const track = (searchParams.get('track') ?? 'scholarship') as Track;

  function handleContinue() {
    const next = nextFromProgramSelection(track);
    if (next.modal) {
      router.push(`/program-selection?track=${track}&modal=${next.modal}`);
    } else {
      router.push(next.href);
    }
  }

  return (
    <Shell track={track}>
      <h1 className="text-2xl font-bold mb-2" style={{ color: '#F5F5F7' }}>
        Choose program &amp; term
      </h1>
      <p className="mb-8 text-sm" style={{ color: '#A1A1AA' }}>
        Select the program and start date that works best for you.
      </p>
      <Button
        className="w-full font-semibold text-base py-6"
        style={{ background: '#D7FF3A', color: '#0B0B0C' }}
        onClick={handleContinue}
      >
        Continue
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
