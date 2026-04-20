'use client';

import { useFlow } from './FlowProvider';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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

  const activeKey = `${scenario}-${plan}`;

  return (
    <div
      className="fixed bottom-4 right-4 z-50 rounded-2xl p-4 shadow-2xl w-48"
      style={{ background: '#1E2024', border: '1px solid #2E3035' }}
    >
      <p className="text-[11px] font-bold mb-3" style={{ color: '#D7FF3A' }}>Demo mode</p>
      <RadioGroup value={activeKey} onValueChange={(v) => {
        const opt = options.find(o => `${o.scenario}-${o.plan}` === v);
        if (opt) { setScenario(opt.scenario); setPlan(opt.plan); }
      }} className="gap-2.5">
        {options.map((o) => {
          const key = `${o.scenario}-${o.plan}`;
          const isActive = activeKey === key;
          return (
            <div key={key} className="flex items-center gap-2">
              <RadioGroupItem value={key} id={`sc-${key}`} className="h-3.5 w-3.5"
                style={{ borderColor: isActive ? '#D7FF3A' : '#444' }} />
              <Label htmlFor={`sc-${key}`} className="cursor-pointer">
                <span className="block text-[11px] font-medium"
                  style={{ color: isActive ? '#F5F5F7' : '#9EA3AE' }}>
                  {o.label}
                </span>
              </Label>
            </div>
          );
        })}
      </RadioGroup>
      <button onClick={reset} className="mt-3 w-full text-[10px] rounded-lg py-1.5 font-medium"
        style={{ background: '#2E3035', color: '#9EA3AE' }}>
        Reset flow
      </button>
    </div>
  );
}
