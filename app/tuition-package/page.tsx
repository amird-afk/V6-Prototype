'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Shell from '@/components/Shell';
import { BadgeCheck } from 'lucide-react';

interface PkgRow {
  label: string;
  value: string;
  color: string;
  bold?: boolean;
}

interface Pkg {
  planBadge: string;
  rows: PkgRow[];
  yourCost: string;
  paymentPlan?: string;
  note?: string;
}

const packages: Record<string, Pkg> = {
  // Full scholarship
  core: {
    planBadge: 'Maestro Core',
    rows: [
      { label: 'Program cost', value: '$22,776', color: '#F5F5F7' },
      { label: 'Institutional subsidy', value: '− $22,776', color: '#34D399' },
    ],
    yourCost: '$0',
  },
  pro: {
    planBadge: 'Maestro Pro',
    rows: [
      { label: 'Program cost', value: '$29,900', color: '#F5F5F7' },
      { label: 'Institutional subsidy', value: '− $29,900', color: '#34D399' },
    ],
    yourCost: '$0',
  },
  // Partial scholarship
  'partial-core': {
    planBadge: 'Maestro Core',
    rows: [
      { label: 'Program cost', value: '$22,776', color: '#F5F5F7' },
      { label: 'Institutional subsidy', value: '− $20,776', color: '#34D399' },
    ],
    yourCost: '$2,000',
    note: 'One-time payment before your first term.',
  },
  'partial-pro': {
    planBadge: 'Maestro Pro',
    rows: [
      { label: 'Program cost', value: '$29,900', color: '#F5F5F7' },
      { label: 'Institutional subsidy', value: '− $24,300', color: '#34D399' },
    ],
    yourCost: '$5,600',
    note: 'Billed annually before each academic year.',
  },
  // Self-pay
  'selfpay-core': {
    planBadge: 'Maestro Core',
    rows: [
      { label: 'Program cost', value: '$22,776', color: '#F5F5F7' },
    ],
    yourCost: '$22,776',
    paymentPlan: '$949 / month × 24 months',
  },
  'selfpay-pro': {
    planBadge: 'Maestro Pro',
    rows: [
      { label: 'Program cost', value: '$29,900', color: '#F5F5F7' },
    ],
    yourCost: '$29,900',
    paymentPlan: '$1,249 / month × 24 months',
  },
};

export default function TuitionPackage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tier = searchParams.get('tier') ?? 'pro';

  const pkg = packages[tier] ?? packages.pro;
  const track = tier.startsWith('selfpay') ? 'selfpay' : tier.startsWith('partial') ? 'partial' : 'scholarship';

  function handleContinue() {
    if (track === 'selfpay' || track === 'partial') {
      router.push(`/enrollment-documents?track=${track}`);
    } else {
      router.push(`/scholarship-agreement?tier=${tier}`);
    }
  }

  return (
    <Shell track={track}>
      <div className="flex justify-center mb-3">
        <div className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{ background: '#1A2E22' }}>
          <BadgeCheck className="w-7 h-7" style={{ color: '#34D399' }} />
        </div>
      </div>

      {/* Plan badge */}
      <div className="flex justify-center mb-3">
        <span className="text-xs font-semibold px-3 py-1 rounded-full"
          style={{ background: '#2E3035', color: '#D7FF3A' }}>
          {pkg.planBadge}
        </span>
      </div>

      <h1 className="text-xl font-bold text-center mb-1" style={{ color: '#F5F5F7' }}>
        Your tuition package
      </h1>
      <p className="text-xs text-center mb-5" style={{ color: '#9EA3AE' }}>
        Estimated coverage based on your information
      </p>

      {/* Breakdown table */}
      <div className="rounded-2xl overflow-hidden mb-4"
        style={{ background: '#13141A', border: '1px solid #2E3035' }}>
        {pkg.rows.map((row, i) => (
          <div key={i} className="flex justify-between px-4 py-3 border-b"
            style={{ borderColor: '#2E3035' }}>
            <span className={`text-sm ${row.bold ? 'font-bold' : ''}`} style={{ color: '#9EA3AE' }}>
              {row.label}
            </span>
            <span className={`text-sm ${row.bold ? 'font-bold' : ''}`} style={{ color: row.color }}>
              {row.value}
            </span>
          </div>
        ))}

        {/* Your cost row */}
        <div className="px-4 py-4">
          <div className="flex justify-between items-baseline">
            <span className="text-sm font-bold" style={{ color: '#F5F5F7' }}>Your cost</span>
            <span className="text-2xl font-bold" style={{ color: '#F5F5F7' }}>{pkg.yourCost}</span>
          </div>
          {pkg.paymentPlan && (
            <p className="text-xs mt-1 text-right" style={{ color: '#9EA3AE' }}>
              {pkg.paymentPlan}
            </p>
          )}
          {pkg.note && (
            <p className="text-xs mt-1 text-right" style={{ color: '#9EA3AE' }}>
              {pkg.note}
            </p>
          )}
        </div>
      </div>

      <button className="w-full rounded-full py-4 font-semibold text-sm mb-3"
        style={{ background: '#FFFFFF', color: '#13141A' }}
        onClick={handleContinue}>
        Secure your enrollment
      </button>

      <div className="flex justify-center gap-4">
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
