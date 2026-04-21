'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Shell from '@/components/Shell';
import { BadgeCheck } from 'lucide-react';
import type { Plan } from '@/lib/flow';

// Tuition data per scenario × plan
const packages = {
  // Full scholarship (tier=pro → Pro plan, tier=core → Core plan, both $0)
  pro: {
    label: 'Pro Scholarship',
    plan: 'Pro plan',
    programCost: '$29,900',
    scholarship: '− $29,900',
    yourCost: '$0',
    note: 'Full tuition covered. ISA repayment terms apply after graduation.',
  },
  core: {
    label: 'Core Scholarship',
    plan: 'Core plan',
    programCost: '$29,900',
    scholarship: '− $29,900',
    yourCost: '$0',
    note: 'Full tuition covered. ISA repayment terms apply after graduation.',
  },
  // Partial scholarship — student chooses plan
  'partial-core': {
    label: 'Partial Scholarship · Core',
    plan: 'Core plan',
    programCost: '$29,900',
    scholarship: '− $27,900',
    yourCost: '$2,000',
    note: 'One-time payment before your first term.',
  },
  'partial-pro': {
    label: 'Partial Scholarship · Pro',
    plan: 'Pro plan',
    programCost: '$29,900',
    scholarship: '− $24,300',
    yourCost: '$5,600 / year',
    note: 'Billed annually before each academic year.',
  },
  // Self-pay — student chooses plan
  'selfpay-core': {
    label: 'Core plan · Self-pay',
    plan: 'Core plan',
    programCost: '$29,900',
    scholarship: '— ',
    yourCost: '$949 / month',
    note: 'Billed monthly. Cancel or pause anytime.',
  },
  'selfpay-pro': {
    label: 'Pro plan · Self-pay',
    plan: 'Pro plan',
    programCost: '$29,900',
    scholarship: '—',
    yourCost: '$1,249 / month',
    note: 'Billed monthly. Includes laptop from term 2.',
  },
};

export default function TuitionPackage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tier = searchParams.get('tier') ?? 'pro';  // 'pro', 'core', 'partial', 'selfpay'

  const isChoice = tier === 'partial' || tier === 'selfpay';
  const [chosenPlan, setChosenPlan] = useState<Plan>('pro');

  const pkgKey = isChoice ? `${tier}-${chosenPlan}` : tier;
  const pkg = packages[pkgKey as keyof typeof packages] ?? packages.pro;
  const nextTier = isChoice ? `${tier}-${chosenPlan}` : tier;
  const track = tier.startsWith('selfpay') ? 'selfpay' : tier.startsWith('partial') ? 'partial' : 'scholarship';

  return (
    <Shell track={track}>
      <div className="flex justify-center mb-4">
        <div className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{ background: '#1A2E22' }}>
          <BadgeCheck className="w-7 h-7" style={{ color: '#34D399' }} />
        </div>
      </div>

      <h1 className="text-xl font-bold text-center mb-1" style={{ color: '#F5F5F7' }}>
        Your tuition package
      </h1>
      <p className="text-xs text-center mb-5" style={{ color: '#9EA3AE' }}>
        Estimated coverage based on your information:
      </p>

      {/* Plan selector for partial / self-pay */}
      {isChoice && (
        <div className="grid grid-cols-2 gap-2 mb-4">
          {(['core', 'pro'] as Plan[]).map((p) => (
            <button key={p} onClick={() => setChosenPlan(p)}
              className="rounded-xl py-3 text-sm font-semibold capitalize"
              style={{
                background: chosenPlan === p ? '#FFFFFF' : '#2E3035',
                color: chosenPlan === p ? '#13141A' : '#9EA3AE',
              }}>
              Maestro {p === 'core' ? 'Core' : 'Pro'}
            </button>
          ))}
        </div>
      )}

      {/* Breakdown table */}
      <div className="rounded-2xl overflow-hidden mb-4"
        style={{ background: '#13141A', border: '1px solid #2E3035' }}>
        <div className="flex justify-between px-4 py-3 border-b" style={{ borderColor: '#2E3035' }}>
          <span className="text-sm" style={{ color: '#9EA3AE' }}>Full program cost</span>
          <span className="text-sm" style={{ color: '#F5F5F7' }}>{pkg.programCost}</span>
        </div>
        <div className="flex justify-between px-4 py-3 border-b" style={{ borderColor: '#2E3035' }}>
          <span className="text-sm" style={{ color: '#9EA3AE' }}>Scholarship &amp; grants</span>
          <span className="text-sm" style={{ color: '#34D399' }}>{pkg.scholarship}</span>
        </div>
        <div className="flex justify-between px-4 py-3">
          <span className="text-sm font-bold" style={{ color: '#F5F5F7' }}>Your cost</span>
          <span className="text-sm font-bold" style={{ color: '#F5F5F7' }}>{pkg.yourCost}</span>
        </div>
      </div>

      <p className="text-xs text-center mb-5" style={{ color: '#9EA3AE' }}>{pkg.note}</p>

      <button className="w-full rounded-full py-4 font-semibold text-sm"
        style={{ background: '#FFFFFF', color: '#13141A' }}
        onClick={() => {
          if (track === 'partial') {
            router.push(`/enrollment-documents?track=partial`);
          } else {
            router.push(`/scholarship-agreement?tier=${nextTier}`);
          }
        }}>
        Secure your enrollment
      </button>

      <div className="flex justify-center gap-4 mt-3">
        <button className="text-xs underline underline-offset-2" style={{ color: '#9EA3AE' }}>
          View tuition package
        </button>
        <button className="text-xs underline underline-offset-2" style={{ color: '#9EA3AE' }}>
          View school catalog
        </button>
      </div>
    </Shell>
  );
}
