'use client';

import { useFlow } from './FlowProvider';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import type { Scenario } from '@/lib/flow';

const scenarios: { value: Scenario; label: string }[] = [
  { value: 'pro', label: 'Pro (ISIR < $60K)' },
  { value: 'core', label: 'Core (ISIR $60K–$100K)' },
  { value: 'selfpay', label: 'Self-pay (> $100K)' },
];

export default function DemoBar() {
  const { scenario, setScenario, reset } = useFlow();

  return (
    <div
      className="fixed bottom-4 right-4 z-50 rounded-xl border p-4 shadow-2xl w-56"
      style={{ background: '#17181B', borderColor: '#2A2B30' }}
    >
      <p className="text-xs font-bold mb-1" style={{ color: '#D7FF3A' }}>
        Demo mode
      </p>
      <p className="text-xs mb-3" style={{ color: '#A1A1AA' }}>
        Scenario:
      </p>
      <RadioGroup
        value={scenario}
        onValueChange={(v) => setScenario(v as Scenario)}
        className="gap-2"
      >
        {scenarios.map((s) => (
          <div key={s.value} className="flex items-center gap-2">
            <RadioGroupItem
              value={s.value}
              id={`scenario-${s.value}`}
              style={{ borderColor: scenario === s.value ? '#D7FF3A' : '#A1A1AA' }}
            />
            <Label
              htmlFor={`scenario-${s.value}`}
              className="text-xs cursor-pointer"
              style={{ color: scenario === s.value ? '#F5F5F7' : '#A1A1AA' }}
            >
              {s.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
      <Button
        onClick={reset}
        variant="outline"
        size="sm"
        className="mt-3 w-full text-xs"
        style={{ borderColor: '#2A2B30', color: '#A1A1AA', background: 'transparent' }}
      >
        Reset flow
      </Button>
    </div>
  );
}
