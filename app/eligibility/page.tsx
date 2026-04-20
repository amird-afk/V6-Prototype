'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Shell from '@/components/Shell';
import { useFlow } from '@/components/FlowProvider';
import { Shield } from 'lucide-react';

export default function Eligibility() {
  const router = useRouter();
  const { scenario } = useFlow();
  const [phase, setPhase] = useState<'calculating' | 'result'>('calculating');

  useEffect(() => {
    const t = setTimeout(() => setPhase('result'), 2200);
    return () => clearTimeout(t);
  }, []);

  const track = scenario === 'selfpay' ? 'selfpay' : scenario === 'partial' ? 'partial' : 'scholarship';

  if (phase === 'calculating') {
    return (
      <Shell track={track}>
        <div className="flex flex-col items-center py-8">
          <div className="relative w-20 h-20 mb-6">
            <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="34" fill="none" stroke="#2E3035" strokeWidth="6" />
              <circle
                cx="40" cy="40" r="34" fill="none"
                stroke="#D7FF3A" strokeWidth="6"
                strokeDasharray="213"
                strokeDashoffset="53"
                strokeLinecap="round"
                className="animate-spin"
                style={{ transformOrigin: '40px 40px', animationDuration: '1.4s' }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Shield className="w-7 h-7" style={{ color: '#D7FF3A' }} />
            </div>
          </div>
          <p className="text-base font-medium" style={{ color: '#F5F5F7' }}>
            Calculating your eligibility...
          </p>
        </div>
      </Shell>
    );
  }

  if (scenario === 'selfpay') {
    return (
      <Shell track="selfpay">
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{ background: '#1E2A3A' }}>
            <Shield className="w-7 h-7" style={{ color: '#60A5FA' }} />
          </div>
        </div>
        <h1 className="text-xl font-bold text-center mb-2" style={{ color: '#F5F5F7' }}>
          Let&apos;s find the right plan for you
        </h1>
        <p className="text-sm text-center mb-6" style={{ color: '#9EA3AE' }}>
          Based on your profile, we&apos;ll help you choose a Maestro plan that fits your goals and budget.
        </p>
        <button
          className="w-full rounded-full py-4 font-semibold text-sm"
          style={{ background: '#FFFFFF', color: '#13141A' }}
          onClick={() => router.push('/maestro-plans')}
        >
          See plans →
        </button>
      </Shell>
    );
  }

  const isPartial = scenario === 'partial';

  return (
    <Shell track={track}>
      <div className="flex justify-center mb-4">
        <div className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{ background: '#1A2E22' }}>
          <Shield className="w-7 h-7" style={{ color: '#34D399' }} />
        </div>
      </div>

      <h1 className="text-xl font-bold text-center mb-2" style={{ color: '#F5F5F7' }}>
        You&apos;re eligible for a Maestro scholarship
      </h1>
      <p className="text-sm text-center mb-6" style={{ color: '#9EA3AE' }}>
        {isPartial
          ? 'You qualify for a partial scholarship, which covers a significant portion of tuition.'
          : 'You have a strong chance of earning a full Maestro scholarship, which could cover your entire degree.'}
      </p>

      <div className="rounded-xl px-4 py-3 mb-6 text-xs leading-relaxed"
        style={{ background: '#13141A', border: '1px solid #2E3035', color: '#9EA3AE' }}>
        {isPartial
          ? 'This opportunity is reserved for candidates with demonstrated financial need, as part of our commitment to accessible education.'
          : <>
              This opportunity is reserved for candidates with demonstrated financial need, as part of our commitment to accessible education.
              <br /><br />
              <strong style={{ color: '#F5F5F7' }}>Spots are limited and held for 72 hours</strong> to ensure fair access. Complete your application within that time to secure yours.
            </>
        }
      </div>

      <button
        className="w-full rounded-full py-4 font-semibold text-sm"
        style={{ background: '#FFFFFF', color: '#13141A' }}
        onClick={() => router.push('/signup-pql')}
      >
        Secure my scholarship →
      </button>
    </Shell>
  );
}
