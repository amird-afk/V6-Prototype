'use client';

import { useFlow } from './FlowProvider';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { Scenario } from '@/lib/flow';

const scenarios: { value: Scenario; label: string; sub: string }[] = [
  { value: 'full',    label: 'Full scholarship',    sub: 'Income < $100K' },
  { value: 'partial', label: 'Partial scholarship', sub: 'Income $100K–$200K' },
  { value: 'selfpay', label: 'Self-pay',             sub: 'Income > $200K' },
];

export default function DemoBar() {
  const { scenario, setScenario, reset } = useFlow();

  return (
    <div
      className="fixed bottom-4 right-4 z-50 rounded-2xl p-4 shadow-2xl w-52"
      style={{ background: '#1E2024', border: '1px solid #2E3035' }}
    >
      <p className="text-[11px] font-bold mb-3" style={{ color: '#D7FF3A' }}>Demo mode</p>
      <RadioGroup value={scenario} onValueChange={(v) => setScenario(v as Scenario)} className="gap-2.5">
        {scenarios.map((s) => (
          <div key={s.value} className="flex items-start gap-2">
            <RadioGroupItem value={s.value} id={`sc-${s.value}`} className="mt-0.5 h-3.5 w-3.5"
              style={{ borderColor: scenario === s.value ? '#D7FF3A' : '#444' }} />
            <Label htmlFor={`sc-${s.value}`} className="cursor-pointer leading-tight">
              <span className="block text-[11px] font-medium"
                style={{ color: scenario === s.value ? '#F5F5F7' : '#9EA3AE' }}>
                {s.label}
              </span>
              <span className="block text-[10px]" style={{ color: '#444' }}>{s.sub}</span>
            </Label>
          </div>
        ))}
      </RadioGroup>
      <button onClick={reset} className="mt-3 w-full text-[10px] rounded-lg py-1.5 font-medium"
        style={{ background: '#2E3035', color: '#9EA3AE' }}>
        Reset flow
      </button>
    </div>
  );
}
