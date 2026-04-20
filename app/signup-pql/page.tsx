'use client';

import { useRouter } from 'next/navigation';
import Shell from '@/components/Shell';
import { Button } from '@/components/ui/button';

export default function SignupPQL() {
  const router = useRouter();

  return (
    <Shell track="scholarship">
      <h1 className="text-2xl font-bold mb-2" style={{ color: '#F5F5F7' }}>
        Create your account
      </h1>
      <p className="mb-8 text-sm" style={{ color: '#A1A1AA' }}>
        Set up your Masterschool account to save your progress and access your portal.
      </p>
      <Button
        className="w-full font-semibold text-base py-6"
        style={{ background: '#D7FF3A', color: '#0B0B0C' }}
        onClick={() => router.push('/program-selection?track=scholarship')}
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
