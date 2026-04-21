'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Shell from '@/components/Shell';
import type { Track, Plan } from '@/lib/flow';

const payConfig: Record<string, { label: string; amount: string; period: string; note: string }> = {
  'selfpay-core': {
    label: 'Maestro Core · Billed monthly',
    amount: '$949.00',
    period: 'Per month',
    note: 'Cancel or pause anytime.',
  },
  'selfpay-pro': {
    label: 'Maestro Pro · Billed monthly',
    amount: '$1,249.00',
    period: 'Per month',
    note: 'Includes laptop from term 2.',
  },
  'partial-core': {
    label: 'Maestro Core · One-time payment',
    amount: '$2,000.00',
    period: 'Due before first term',
    note: 'Covers your remaining tuition after scholarship.',
  },
  'partial-pro': {
    label: 'Maestro Pro · Annual payment',
    amount: '$5,600.00',
    period: 'Per year',
    note: 'Billed annually before each academic year.',
  },
};

export default function PayFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const track = (searchParams.get('track') ?? 'selfpay') as Track;
  const plan = (searchParams.get('plan') ?? 'core') as Plan;

  const configKey = `${track}-${plan}`;
  const cfg = payConfig[configKey] ?? payConfig['selfpay-core'];

  return (
    <Shell track={track}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
          style={{ background: '#2E3035' }}>
          <span className="text-xs font-black" style={{ color: '#D7FF3A' }}>M</span>
        </div>
        <span className="text-sm font-semibold" style={{ color: '#F5F5F7' }}>maestro</span>
      </div>

      {/* Amount */}
      <div className="mb-5">
        <p className="text-xs mb-0.5" style={{ color: '#9EA3AE' }}>
          {track === 'partial' ? 'Tuition payment' : 'Subscription fee'}
        </p>
        <p className="text-3xl font-bold" style={{ color: '#F5F5F7' }}>
          {cfg.amount}
          <span className="text-sm font-normal ml-1" style={{ color: '#9EA3AE' }}>{cfg.period}</span>
        </p>
      </div>

      {/* Breakdown */}
      <div className="space-y-2 mb-5">
        {[[cfg.label, cfg.amount], ['Subtotal', cfg.amount], ['Tax', '$0.00']].map(([label, val]) => (
          <div key={label} className="flex justify-between">
            <span className="text-xs" style={{ color: '#9EA3AE' }}>{label}</span>
            <span className="text-xs" style={{ color: '#9EA3AE' }}>{val}</span>
          </div>
        ))}
        <div className="flex justify-between pt-2 border-t" style={{ borderColor: '#2E3035' }}>
          <span className="text-sm font-bold" style={{ color: '#F5F5F7' }}>Total due today</span>
          <span className="text-sm font-bold" style={{ color: '#F5F5F7' }}>{cfg.amount}</span>
        </div>
      </div>

      <p className="text-xs mb-4" style={{ color: '#9EA3AE' }}>{cfg.note}</p>

      {/* Mock card fields */}
      <div className="space-y-2 mb-5">
        <div className="rounded-xl px-3 py-2.5" style={{ background: '#13141A', border: '1px solid #2E3035' }}>
          <p className="text-xs mb-1" style={{ color: '#9EA3AE' }}>Card information</p>
          <div className="h-3 rounded w-3/4" style={{ background: '#2E3035' }} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {['MM / YY', 'CVC'].map((ph) => (
            <div key={ph} className="rounded-xl px-3 py-2.5"
              style={{ background: '#13141A', border: '1px solid #2E3035' }}>
              <p className="text-xs" style={{ color: '#555' }}>{ph}</p>
            </div>
          ))}
        </div>
      </div>

      <button className="w-full rounded-full py-4 font-semibold text-sm"
        style={{ background: '#FFFFFF', color: '#13141A' }}
        onClick={() => router.push(`/finished?track=${track}`)}>
        {track === 'partial' ? 'Pay now' : 'Subscribe'}
      </button>
    </Shell>
  );
}
