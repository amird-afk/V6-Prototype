'use client';

import { useFlow } from './FlowProvider';
import type { Scenario, Plan } from '@/lib/flow';

type DemoOption = { scenario: Scenario; plan: Plan; label: string };

const options: DemoOption[] = [
  { scenario: 'full',    plan: 'pro',  label: 'Full · Pro' },
  { scenario: 'full',    plan: 'core', label: 'Full · Core' },
  { scenario: 'partial', plan: 'pro',  label: 'Partial · Pro' },
  { scenario: 'partial', plan: 'core', label: 'Partial · Core' },
  { scenario: 'selfpay', plan: 'pro',  label: 'Self-pay' },
];

export default function DemoBar() {
  const { scenario, plan, setScenario, setPlan, reset } = useFlow();

  return (
    <div
      className="fixed bottom-4 right-4 z-50 rounded-2xl p-4 shadow-2xl w-48"
      style={{ background: '#1E2024', border: '1px solid #2E3035' }}
    >
      <p className="text-[11px] font-bold mb-3" style={{ color: '#D7FF3A' }}>Demo mode</p>
      <div className="flex flex-col gap-2">
        {options.map((o) => {
          const isActive = scenario === o.scenario && plan === o.plan;
          return (
            <button
              key={`${o.scenario}-${o.plan}`}
              onClick={() => { setScenario(o.scenario); setPlan(o.plan); }}
              className="flex items-center gap-2 text-left"
            >
              <div
                className="w-3.5 h-3.5 rounded-full border-2 flex-shrink-0 flex items-center justify-center"
                style={{ borderColor: isActive ? '#D7FF3A' : '#444' }}
              >
                {isActive && <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#D7FF3A' }} />}
              </div>
              <span className="text-[11px] font-medium"
                style={{ color: isActive ? '#F5F5F7' : '#9EA3AE' }}>
                {o.label}
              </span>
            </button>
          );
        })}
      </div>
      <button onClick={reset} className="mt-3 w-full text-[10px] rounded-lg py-1.5 font-medium"
        style={{ background: '#2E3035', color: '#9EA3AE' }}>
        Reset flow
      </button>
    </div>
  );
}
