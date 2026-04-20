'use client';

import { useRouter } from 'next/navigation';
import Shell from '@/components/Shell';
import { Button } from '@/components/ui/button';

export default function PayFlow() {
  const router = useRouter();

  return (
    <Shell track="selfpay">
      <h1 className="text-2xl font-bold mb-2" style={{ color: '#F5F5F7' }}>
        Complete payment
      </h1>
      <p className="mb-8 text-sm" style={{ color: '#A1A1AA' }}>
        Pay your tuition directly to secure your spot in the program.
      </p>
      <Button
        className="w-full font-semibold text-base py-6"
        style={{ background: '#D7FF3A', color: '#0B0B0C' }}
        onClick={() => router.push('/finished?track=selfpay')}
      >
        Pay tuition
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
