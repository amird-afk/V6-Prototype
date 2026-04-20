'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Shell from '@/components/Shell';
import { Button } from '@/components/ui/button';

export default function TuitionPackage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tier = searchParams.get('tier') ?? 'pro';

  const isPro = tier === 'pro';

  return (
    <Shell track="scholarship">
      <h1 className="text-2xl font-bold mb-2" style={{ color: '#F5F5F7' }}>
        Your tuition package — {isPro ? 'Pro' : 'Core'}
      </h1>
      <p className="mb-4 text-sm" style={{ color: '#A1A1AA' }}>
        {isPro
          ? 'Full tuition scholarship with ISA repayment terms. No upfront payment required.'
          : 'Partial scholarship with reduced upfront tuition contribution.'}
      </p>

      {/* Package highlight */}
      <div
        className="rounded-lg px-4 py-4 mb-8"
        style={{ background: '#0B0B0C', border: '1px solid #2A2B30' }}
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm" style={{ color: '#A1A1AA' }}>
            Tier
          </span>
          <span
            className="text-sm font-semibold px-2 py-0.5 rounded"
            style={{ background: '#D7FF3A', color: '#0B0B0C' }}
          >
            {isPro ? 'Pro' : 'Core'}
          </span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm" style={{ color: '#A1A1AA' }}>
            Scholarship coverage
          </span>
          <span className="text-sm font-medium" style={{ color: '#F5F5F7' }}>
            {isPro ? '100%' : '60%'}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm" style={{ color: '#A1A1AA' }}>
            Upfront payment
          </span>
          <span className="text-sm font-medium" style={{ color: '#F5F5F7' }}>
            {isPro ? '$0' : '$2,400'}
          </span>
        </div>
      </div>

      <Button
        className="w-full font-semibold text-base py-6"
        style={{ background: '#D7FF3A', color: '#0B0B0C' }}
        onClick={() => router.push(`/scholarship-agreement?tier=${tier}`)}
      >
        Accept package
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
