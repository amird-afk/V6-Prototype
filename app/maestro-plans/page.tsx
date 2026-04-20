'use client';

import { useRouter } from 'next/navigation';
import Shell from '@/components/Shell';
import { Button } from '@/components/ui/button';

export default function MaestroPlans() {
  const router = useRouter();

  return (
    <Shell track="selfpay">
      <h1 className="text-2xl font-bold mb-2" style={{ color: '#F5F5F7' }}>
        Masterschool plans
      </h1>
      <p className="mb-6 text-sm" style={{ color: '#A1A1AA' }}>
        Choose the self-pay plan that fits your budget and learning goals.
      </p>

      {/* Plan cards */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        {['Monthly', 'Upfront'].map((plan) => (
          <div
            key={plan}
            className="rounded-lg px-4 py-4 cursor-pointer"
            style={{ background: '#0B0B0C', border: '1px solid #2A2B30' }}
          >
            <p className="text-sm font-semibold mb-1" style={{ color: '#F5F5F7' }}>
              {plan}
            </p>
            <p className="text-xs" style={{ color: '#A1A1AA' }}>
              {plan === 'Monthly' ? '$499/mo · 24 months' : '$9,500 one-time'}
            </p>
          </div>
        ))}
      </div>

      <Button
        className="w-full font-semibold text-base py-6"
        style={{ background: '#D7FF3A', color: '#0B0B0C' }}
        onClick={() => router.push('/signup')}
      >
        Choose a plan
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
