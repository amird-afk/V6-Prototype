'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Shell from '@/components/Shell';
import type { Track } from '@/lib/flow';

const plans = [
  {
    id: 'core',
    name: 'Maestro Core',
    tagline: 'The essentials to launch your career',
    features: ['Accredited AAS degree', 'AI tutor access', 'Online & flexible', 'Career support'],
  },
  {
    id: 'pro',
    name: 'Maestro Pro',
    tagline: 'Everything in Core, plus more',
    features: ['Accredited BS degree', 'AI tutor access', 'Complimentary laptop', 'Priority career support', 'Alumni network'],
  },
];

function planPrice(planId: string, track: Track): string {
  if (track === 'scholarship') return '$0';
  if (track === 'partial') return planId === 'core' ? '$2,000/yr' : '$5,600/yr';
  return planId === 'core' ? '$949/mo' : '$1,249/mo';
}

export default function PlanSelection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const track = (searchParams.get('track') ?? 'scholarship') as Track;
  const [selected, setSelected] = useState<'core' | 'pro'>('pro');

  function handleContinue() {
    const tier = track === 'partial' ? `partial-${selected}` : selected;
    router.push(`/tuition-package?tier=${tier}&track=${track}`);
  }

  return (
    <Shell track={track}>
      <h1 className="text-2xl font-bold mb-2" style={{ color: '#F5F5F7' }}>
        Choose your plan
      </h1>
      <p className="text-sm mb-6" style={{ color: '#9EA3AE' }}>
        {track === 'scholarship'
          ? 'Both plans are fully covered by your scholarship.'
          : 'Select the plan that fits your goals.'}
      </p>

      <div className="space-y-3 mb-6">
        {plans.map((plan) => {
          const isSelected = selected === plan.id;
          return (
            <button
              key={plan.id}
              onClick={() => setSelected(plan.id as 'core' | 'pro')}
              className="w-full rounded-2xl p-4 text-left"
              style={{
                background: isSelected ? '#2E3035' : '#13141A',
                border: `1px solid ${isSelected ? '#FFFFFF30' : '#2E3035'}`,
              }}
            >
              <div className="flex items-start justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center mt-0.5"
                    style={{ borderColor: isSelected ? '#F5F5F7' : '#555' }}
                  >
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full" style={{ background: '#F5F5F7' }} />
                    )}
                  </div>
                  <span className="text-sm font-bold" style={{ color: '#F5F5F7' }}>{plan.name}</span>
                </div>
                <span className="text-sm font-bold" style={{ color: isSelected ? '#D7FF3A' : '#9EA3AE' }}>
                  {planPrice(plan.id, track)}
                </span>
              </div>
              <p className="text-xs mb-2 ml-6" style={{ color: '#9EA3AE' }}>{plan.tagline}</p>
              <ul className="ml-6 space-y-1">
                {plan.features.map((f) => (
                  <li key={f} className="text-xs flex items-center gap-1.5" style={{ color: '#9EA3AE' }}>
                    <span style={{ color: '#D7FF3A' }}>✓</span> {f}
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>

      <button
        className="w-full rounded-full py-4 font-semibold text-sm"
        style={{ background: '#FFFFFF', color: '#13141A' }}
        onClick={handleContinue}
      >
        Continue with {selected === 'core' ? 'Core' : 'Pro'} →
      </button>
      <button className="mt-3 w-full text-xs" style={{ color: '#9EA3AE' }}
        onClick={() => router.back()}>← Back</button>
    </Shell>
  );
}
