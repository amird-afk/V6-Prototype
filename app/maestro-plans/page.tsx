'use client';

import { useRouter } from 'next/navigation';
import Shell from '@/components/Shell';
import { Check, X } from 'lucide-react';

const plans = [
  {
    name: 'Maestro Core',
    price: '$949/mo',
    features: ['Degree', 'AI Personal Tutor', 'Practice Mode ✗', 'Laptop ✗', 'Career Service ✗'],
    highlight: false,
  },
  {
    name: 'Maestro Pro',
    price: '$1,249/mo',
    features: ['Degree', 'AI Personal Tutor', 'Practice Mode', 'Laptop', 'Career Service'],
    highlight: true,
  },
];

export default function MaestroPlans() {
  const router = useRouter();

  return (
    <Shell track="selfpay">
      <h1 className="text-2xl font-bold mb-6" style={{ color: '#F5F5F7' }}>
        Choose your plan
      </h1>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="rounded-2xl p-4"
            style={{
              background: plan.highlight ? '#2E3035' : '#13141A',
              border: `1px solid ${plan.highlight ? '#FFFFFF30' : '#2E3035'}`,
            }}
          >
            <p className="text-xs font-bold mb-0.5" style={{ color: '#F5F5F7' }}>
              {plan.name}
            </p>
            <p className="text-xs mb-3" style={{ color: '#9EA3AE' }}>
              {plan.price}
            </p>
            <div className="space-y-1.5">
              {['Degree', 'AI Tutor', 'Practice', 'Laptop', 'Career'].map((feat, i) => {
                const hasIt = plan.highlight || i < 2;
                return (
                  <div key={feat} className="flex items-center gap-1.5">
                    {hasIt ? (
                      <Check className="w-3 h-3" style={{ color: '#34D399' }} />
                    ) : (
                      <X className="w-3 h-3" style={{ color: '#FF5A4E' }} />
                    )}
                    <span className="text-xs" style={{ color: hasIt ? '#F5F5F7' : '#9EA3AE' }}>
                      {feat}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <button
        className="w-full rounded-full py-4 font-semibold text-sm"
        style={{ background: '#FFFFFF', color: '#13141A' }}
        onClick={() => router.push('/signup')}
      >
        Choose a plan
      </button>
      <button
        className="mt-3 w-full text-xs"
        style={{ color: '#9EA3AE' }}
        onClick={() => router.back()}
      >
        ← Back
      </button>
    </Shell>
  );
}
