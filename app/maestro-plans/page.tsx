'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Shell from '@/components/Shell';
import { useFlow } from '@/components/FlowProvider';
import { Check, X } from 'lucide-react';
import type { Plan } from '@/lib/flow';

const features = ['Degree', 'AI Tutor', 'Practice', 'Laptop', 'Career support'];
const coreHas = new Set([0, 1]);

export default function MaestroPlans() {
  const router = useRouter();
  const { setPlan } = useFlow();
  const [selected, setSelected] = useState<Plan | null>(null);

  function handleContinue() {
    if (!selected) return;
    setPlan(selected);
    router.push('/signup');
  }

  return (
    <Shell track="selfpay">
      <h1 className="text-2xl font-bold mb-6" style={{ color: '#F5F5F7' }}>
        Choose your plan
      </h1>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {(['core', 'pro'] as Plan[]).map((plan) => {
          const isSelected = selected === plan;
          const isPro = plan === 'pro';
          return (
            <button
              key={plan}
              onClick={() => setSelected(plan)}
              className="rounded-2xl p-4 text-left"
              style={{
                background: isSelected ? '#2E3035' : '#13141A',
                border: `1px solid ${isSelected ? '#D7FF3A' : '#2E3035'}`,
              }}
            >
              <p className="text-xs font-bold mb-0.5" style={{ color: '#F5F5F7' }}>
                Maestro {isPro ? 'Pro' : 'Core'}
              </p>
              <p className="text-xs mb-3" style={{ color: isSelected ? '#D7FF3A' : '#9EA3AE' }}>
                {isPro ? '$1,249/mo' : '$949/mo'}
              </p>
              <div className="space-y-1.5">
                {features.map((feat, i) => {
                  const hasIt = isPro || coreHas.has(i);
                  return (
                    <div key={feat} className="flex items-center gap-1.5">
                      {hasIt ? (
                        <Check className="w-3 h-3 flex-shrink-0" style={{ color: '#34D399' }} />
                      ) : (
                        <X className="w-3 h-3 flex-shrink-0" style={{ color: '#555' }} />
                      )}
                      <span className="text-xs" style={{ color: hasIt ? '#F5F5F7' : '#555' }}>
                        {feat}
                      </span>
                    </div>
                  );
                })}
              </div>
            </button>
          );
        })}
      </div>

      <button
        className="w-full rounded-full py-4 font-semibold text-sm disabled:opacity-40"
        style={{ background: '#FFFFFF', color: '#13141A' }}
        disabled={!selected}
        onClick={handleContinue}
      >
        {selected ? `Continue with ${selected === 'pro' ? 'Pro' : 'Core'} →` : 'Select a plan'}
      </button>
      <button className="mt-3 w-full text-xs" style={{ color: '#9EA3AE' }}
        onClick={() => router.back()}>← Back</button>
    </Shell>
  );
}
