'use client';

import { useRouter } from 'next/navigation';
import Shell from '@/components/Shell';
import { Button } from '@/components/ui/button';

export default function CareerAdvisor() {
  const router = useRouter();

  return (
    <Shell>
      <h1 className="text-2xl font-bold mb-2" style={{ color: '#F5F5F7' }}>
        Meet your Career Advisor
      </h1>
      <p className="mb-8 text-sm" style={{ color: '#A1A1AA' }}>
        Your dedicated advisor will guide you through the entire enrollment process.
      </p>
      <Button
        className="w-full font-semibold text-base py-6"
        style={{ background: '#D7FF3A', color: '#0B0B0C' }}
        onClick={() => router.push('/apply-scholarship')}
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
