'use client';

import { useRouter } from 'next/navigation';
import Shell from '@/components/Shell';
import { Button } from '@/components/ui/button';

export default function StripePOE() {
  const router = useRouter();

  return (
    <Shell track="scholarship">
      <h1 className="text-2xl font-bold mb-2" style={{ color: '#F5F5F7' }}>
        Verify identity &amp; proof of enrollment
      </h1>
      <p className="mb-8 text-sm" style={{ color: '#A1A1AA' }}>
        Upload your Stripe identity documents and proof of enrollment for review.
      </p>
      <Button
        className="w-full font-semibold text-base py-6"
        style={{ background: '#D7FF3A', color: '#0B0B0C' }}
        onClick={() => router.push('/q-verification?track=scholarship')}
      >
        Upload &amp; Continue
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
