'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Shell from '@/components/Shell';
import { BadgeCheck } from 'lucide-react';
import type { Plan } from '@/lib/flow';

interface PkgRow { label: string; value: string; color: string }
interface Pkg {
  label: string;
  programCost: string;
  rows: PkgRow[];
  yourCost: string;
  yourCostSub?: string;
  note: string;
}

const packages: Record<string, Pkg> = {
  pro: {
    label: 'Pro Scholarship',
    programCost: '$29,900',
    rows: [
      { label: 'Scholarship & grants', value: '− $29,900', color: '#34D399' },
    ],
    yourCost: '$0',
    note: 'Full tuition covered. ISA repayment terms apply after graduation.',
  },
  core: {
    label: 'Core Scholarship',
    programCost: '$29,900',
    rows: [
      { label: 'Institution contribution', value: '− $7,124', color: '#60A5FA' },
      { label: 'Scholarship & grants', value: '− $22,776', color: '#34D399' },
    ],
    yourCost: '$0',
    note: 'Full tuition covered. ISA repayment terms apply after graduation.',
  },
  'partial-pro': {
    label: 'Partial Scholarship · Pro',
    programCost: '$29,900',
    rows: [
      { label: 'Scholarship & grants', value: '− $24,300', color: '#34D399' },
    ],
    yourCost: '$5,600',
    note: 'Billed annually before each academic year.',
  },
  'partial-core': {
    label: 'Partial Scholarship · Core',
    programCost: '$29,900',
    rows: [
      { label: 'Institution contribution', value: '− $7,124', color: '#60A5FA' },
      { label: 'Scholarship & grants', value: '− $20,776', color: '#34D399' },
    ],
    yourCost: '$2,000',
    note: 'One-time payment before your first term.',
  },
  'selfpay-pro': {
    label: 'Pro plan · Self-pay',
    programCost: '$29,900',
    rows: [],
    yourCost: '$29,900',
    yourCostSub: '$1,249 / month × 24 months',
    note: 'Billed monthly. Includes laptop from term 2.',
  },
  'selfpay-core': {
    label: 'Core plan · Self-pay',
    programCost: '$29,900',
    rows: [
      { label: 'Institution contribution', value: '− $7,124', color: '#60A5FA' },
    ],
    yourCost: '$22,776',
    yourCostSub: '$949 / month × 24 months',
    note: 'Billed monthly. Cancel or pause anytime.',
  },
};

export default function TuitionPackage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tier = searchParams.get('tier') ?? 'pro';

  const isChoice = tier === 'partial' || tier === 'selfpay';
  const [chosenPlan, setChosenPlan] = useState<Plan>('pro');

  const pkgKey = isChoice ? `${tier}-${chosenPlan}` : tier;
  const pkg = packages[pkgKey] ?? packages.pro;
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

      <div className="rounded-2xl overflow-hidden mb-4"
        style={{ background: '#13141A', border: '1px solid #2E3035' }}>
        <div className="flex justify-between px-4 py-3 border-b" style={{ borderColor: '#2E3035' }}>
          <span className="text-sm" style={{ color: '#9EA3AE' }}>Full program cost</span>
          <span className="text-sm" style={{ color: '#F5F5F7' }}>{pkg.programCost}</span>
        </div>
        {pkg.rows.map((row) => (
          <div key={row.label} className="flex justify-between px-4 py-3 border-b" style={{ borderColor: '#2E3035' }}>
            <span className="text-sm" style={{ color: '#9EA3AE' }}>{row.label}</span>
            <span className="text-sm font-medium" style={{ color: row.color }}>{row.value}</span>
          </div>
        ))}
        <div className="flex justify-between items-center px-4 py-3">
          <span className="text-sm font-bold" style={{ color: '#F5F5F7' }}>Your cost</span>
          <div className="text-right">
            <span className="text-sm font-bold" style={{ color: '#F5F5F7' }}>{pkg.yourCost}</span>
            {pkg.yourCostSub && (
              <p className="text-[11px] mt-0.5" style={{ color: '#9EA3AE' }}>{pkg.yourCostSub}</p>
            )}
          </div>
        </div>
      </div>

      <p className="text-xs text-center mb-5" style={{ color: '#9EA3AE' }}>{pkg.note}</p>

      <button className="w-full rounded-full py-4 font-semibold text-sm"
        style={{ background: '#FFFFFF', color: '#13141A' }}
        onClick={() => {
          if (track === 'partial') {
            router.push(`/enrollment-documents?track=partial`);
          } else if (track === 'selfpay') {
            router.push(`/enrollment-documents?track=selfpay`);
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
