'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Shell from '@/components/Shell';
import { useFlow } from '@/components/FlowProvider';
import type { Track } from '@/lib/flow';

const planDetails = {
  pro: {
    name: 'Maestro Pro',
    tagline: 'The complete path to a bachelor\'s degree',
    features: ['Accredited degree', 'AI tutor access', 'Complimentary laptop', 'Priority career support', 'Alumni network'],
  },
  core: {
    name: 'Maestro Core',
    tagline: 'The essentials to launch your career',
    features: ['Accredited degree', 'AI tutor access', 'Online & flexible', 'Career support'],
  },
};

function planPrice(planId: 'core' | 'pro', track: Track): string {
  if (track === 'scholarship') return '$0';
  if (track === 'partial') return planId === 'core' ? '$2,000/yr' : '$5,600/yr';
  return planId === 'core' ? '$949/mo' : '$1,249/mo';
}

export default function PlanSelection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { plan } = useFlow();
  const track = (searchParams.get('track') ?? 'scholarship') as Track;

  const details = planDetails[plan];
  const price = planPrice(plan, track);

  function handleContinue() {
    const tier = track === 'partial' ? `partial-${plan}` : plan;
    router.push(`/tuition-package?tier=${tier}&track=${track}`);
  }

  return (
    <Shell track={track}>
      <h1 className="text-2xl font-bold mb-2" style={{ color: '#F5F5F7' }}>
        Your plan
      </h1>
      <p className="text-sm mb-6" style={{ color: '#9EA3AE' }}>
        {track === 'scholarship'
          ? 'Fully covered by your scholarship.'
          : 'Your selected plan and pricing.'}
      </p>

      <div className="rounded-2xl p-4 mb-6"
        style={{ background: '#2E3035', border: '1px solid #FFFFFF20' }}>
        <div className="flex items-start justify-between mb-1">
          <span className="text-base font-bold" style={{ color: '#F5F5F7' }}>{details.name}</span>
          <span className="text-base font-bold" style={{ color: '#D7FF3A' }}>{price}</span>
        </div>
        <p className="text-xs mb-3" style={{ color: '#9EA3AE' }}>{details.tagline}</p>
        <ul className="space-y-1.5">
          {details.features.map((f) => (
            <li key={f} className="text-xs flex items-center gap-1.5" style={{ color: '#9EA3AE' }}>
              <span style={{ color: '#D7FF3A' }}>✓</span> {f}
            </li>
          ))}
        </ul>
      </div>

      <button
        className="w-full rounded-full py-4 font-semibold text-sm"
        style={{ background: '#FFFFFF', color: '#13141A' }}
        onClick={handleContinue}
      >
        Continue →
      </button>
      <button className="mt-3 w-full text-xs" style={{ color: '#9EA3AE' }}
        onClick={() => router.back()}>← Back</button>
    </Shell>
  );
}
