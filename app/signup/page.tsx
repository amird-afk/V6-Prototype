'use client';

import { useRouter } from 'next/navigation';
import Shell from '@/components/Shell';
import { Button } from '@/components/ui/button';

export default function Signup() {
  const router = useRouter();

  return (
    <Shell track="selfpay">
      <h1 className="text-2xl font-bold mb-2" style={{ color: '#F5F5F7' }}>
        Create your account
      </h1>
      <p className="mb-8 text-sm" style={{ color: '#A1A1AA' }}>
        Set up your Masterschool account on the self-pay track to continue enrollment.
      </p>
      <Button
        className="w-full font-semibold text-base py-6"
        style={{ background: '#D7FF3A', color: '#0B0B0C' }}
        onClick={() => router.push('/program-selection?track=selfpay')}
      >
        Create account
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
