'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Shell from '@/components/Shell';
import { useFlow } from '@/components/FlowProvider';
import type { Track, Plan } from '@/lib/flow';

const planDetails: Record<Plan, { name: string; tagline: string; features: string[] }> = {
  pro: {
    name: 'Maestro Pro',
    tagline: 'The complete path to your career',
    features: ['Accredited degree', 'AI tutor access', 'Complimentary laptop', 'Priority career support', 'Alumni network'],
  },
  core: {
    name: 'Maestro Core',
    tagline: 'The essentials to launch your career',
    features: ['Accredited degree', 'AI tutor access', 'Online & flexible', 'Career support'],
  },
};

function planPrice(p: Plan, track: Track): string {
  if (track === 'scholarship') return '$0';
  if (track === 'partial') return p === 'core' ? '$2,000/yr' : '$5,600/yr';
  return p === 'core' ? '$949/mo' : '$1,249/mo';
}

const coreReasons = [
  "User's Pell grant is below $740",
  'User holds a prior bachelor\'s degree',
  'Existing student loan debt detected',
];

export default function PlanSelection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { plan, setPlan } = useFlow();
  const track = (searchParams.get('track') ?? 'scholarship') as Track;

  const [showAdminNote, setShowAdminNote] = useState(false);
  const [adminNoteVisible, setAdminNoteVisible] = useState(true);
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    if (track === 'scholarship' && !resolved) {
      // 1 Core : 3 Pro — system-assigned based on FAFSA data
      const assigned: Plan = Math.random() < 0.25 ? 'core' : 'pro';
      setPlan(assigned);
      if (assigned === 'core') setShowAdminNote(true);
      setResolved(true);
    } else if (track !== 'scholarship') {
      setResolved(true); // partial: plan already set at eligibility
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!resolved) return null;

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
          : 'Based on your selection.'}
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

      {/* Admin note — shown only when Core is system-assigned for full scholarship */}
      {showAdminNote && adminNoteVisible && (
        <div
          className="fixed bottom-4 left-4 z-50 rounded-2xl p-4 shadow-2xl w-64"
          style={{ background: '#1E2024', border: '1px solid #D97706' }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-[11px] font-bold" style={{ color: '#F59E0B' }}>⚠ Admin note</p>
            <button onClick={() => setAdminNoteVisible(false)}
              className="text-[11px]" style={{ color: '#9EA3AE' }}>✕</button>
          </div>
          <p className="text-[11px] mb-2" style={{ color: '#9EA3AE' }}>
            Core assigned — FAFSA profile indicates:
          </p>
          <ul className="space-y-1">
            {coreReasons.map((r) => (
              <li key={r} className="text-[11px] flex items-start gap-1.5" style={{ color: '#F5F5F7' }}>
                <span style={{ color: '#F59E0B' }}>·</span> {r}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Shell>
  );
}
