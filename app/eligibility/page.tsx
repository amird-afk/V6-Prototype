'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Shell from '@/components/Shell';
import { useFlow } from '@/components/FlowProvider';
import { Shield } from 'lucide-react';
import type { Plan } from '@/lib/flow';

export default function Eligibility() {
  const router = useRouter();
  const { scenario, setPlan } = useFlow();
  const [phase, setPhase] = useState<'calculating' | 'result'>('calculating');
  const [partialPlan, setPartialPlan] = useState<Plan>('pro');

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

  // ── Self-pay: not eligible ──
  if (scenario === 'selfpay') {
    return (
      <Shell track="selfpay">
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{ background: '#2E1A1A' }}>
            <Shield className="w-7 h-7" style={{ color: '#F87171' }} />
          </div>
        </div>
        <h1 className="text-xl font-bold text-center mb-2" style={{ color: '#F5F5F7' }}>
          You&apos;re not eligible for a scholarship
        </h1>
        <p className="text-sm text-center mb-6" style={{ color: '#9EA3AE' }}>
          Based on your profile, you don&apos;t qualify for financial aid. You can still enroll — you&apos;ll need to pay for the program.
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

  // ── Partial: show plan options with pricing ──
  if (scenario === 'partial') {
    const plans: { id: Plan; name: string; price: string; sub: string }[] = [
      { id: 'pro',  name: 'Maestro Pro',  price: '$5,600/yr', sub: 'Accredited BS degree' },
      { id: 'core', name: 'Maestro Core', price: '$2,000/yr', sub: 'Accredited AAS degree' },
    ];

    return (
      <Shell track="partial">
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{ background: '#1A2E22' }}>
            <Shield className="w-7 h-7" style={{ color: '#34D399' }} />
          </div>
        </div>
        <h1 className="text-xl font-bold text-center mb-2" style={{ color: '#F5F5F7' }}>
          You qualify for a partial scholarship
        </h1>
        <p className="text-sm text-center mb-5" style={{ color: '#9EA3AE' }}>
          Choose your plan — the scholarship covers the rest of your tuition.
        </p>

        <div className="space-y-2 mb-6">
          {plans.map((p) => {
            const sel = partialPlan === p.id;
            return (
              <button key={p.id} onClick={() => setPartialPlan(p.id)}
                className="w-full rounded-xl px-4 py-3 flex items-center justify-between"
                style={{
                  background: sel ? '#2E3035' : '#13141A',
                  border: `1px solid ${sel ? '#FFFFFF30' : '#2E3035'}`,
                }}>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center"
                    style={{ borderColor: sel ? '#F5F5F7' : '#555' }}>
                    {sel && <div className="w-2 h-2 rounded-full" style={{ background: '#F5F5F7' }} />}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold" style={{ color: '#F5F5F7' }}>{p.name}</p>
                    <p className="text-xs" style={{ color: '#9EA3AE' }}>{p.sub}</p>
                  </div>
                </div>
                <span className="text-sm font-bold" style={{ color: sel ? '#D7FF3A' : '#9EA3AE' }}>
                  {p.price}
                </span>
              </button>
            );
          })}
        </div>

        <button
          className="w-full rounded-full py-4 font-semibold text-sm"
          style={{ background: '#FFFFFF', color: '#13141A' }}
          onClick={() => { setPlan(partialPlan); router.push('/signup-pql'); }}
        >
          Continue →
        </button>
      </Shell>
    );
  }

  // ── Full scholarship ──
  return (
    <Shell track="scholarship">
      <div className="flex justify-center mb-4">
        <div className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{ background: '#1A2E22' }}>
          <Shield className="w-7 h-7" style={{ color: '#34D399' }} />
        </div>
      </div>
      <h1 className="text-xl font-bold text-center mb-2" style={{ color: '#F5F5F7' }}>
        You&apos;re eligible for a full scholarship
      </h1>
      <p className="text-sm text-center mb-6" style={{ color: '#9EA3AE' }}>
        You have a strong chance of earning a full Maestro scholarship, which could cover your entire degree.
      </p>
      <div className="rounded-xl px-4 py-3 mb-6 text-xs leading-relaxed"
        style={{ background: '#13141A', border: '1px solid #2E3035', color: '#9EA3AE' }}>
        This opportunity is reserved for candidates with demonstrated financial need.
        <br /><br />
        <strong style={{ color: '#F5F5F7' }}>Spots are limited and held for 72 hours</strong> to ensure fair access. Complete your application within that time to secure yours.
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
