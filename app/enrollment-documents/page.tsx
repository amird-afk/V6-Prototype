'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Shell from '@/components/Shell';
import { Button } from '@/components/ui/button';
import type { Track } from '@/lib/flow';

export default function EnrollmentDocuments() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const track = (searchParams.get('track') ?? 'scholarship') as Track;

  function handleSubmit() {
    if (track === 'selfpay') {
      router.push('/pay-flow');
    } else {
      router.push('/finished?track=scholarship');
    }
  }

  return (
    <Shell track={track}>
      <h1 className="text-2xl font-bold mb-2" style={{ color: '#F5F5F7' }}>
        Enrollment documents
      </h1>
      <p className="mb-8 text-sm" style={{ color: '#A1A1AA' }}>
        Submit the final documents to complete your enrollment with Masterschool.
      </p>
      <Button
        className="w-full font-semibold text-base py-6"
        style={{ background: '#D7FF3A', color: '#0B0B0C' }}
        onClick={handleSubmit}
      >
        Submit documents
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
