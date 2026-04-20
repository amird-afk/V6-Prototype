'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import type { Scenario, Plan } from '@/lib/flow';

interface FlowContextValue {
  scenario: Scenario;
  plan: Plan;
  setScenario: (s: Scenario) => void;
  setPlan: (p: Plan) => void;
  reset: () => void;
}

const FlowContext = createContext<FlowContextValue>({
  scenario: 'full',
  plan: 'pro',
  setScenario: () => {},
  setPlan: () => {},
  reset: () => {},
});

export function FlowProvider({ children }: { children: ReactNode }) {
  const [scenario, setScenarioState] = useState<Scenario>('full');
  const [plan, setPlanState] = useState<Plan>('pro');
  const router = useRouter();

  const setScenario = useCallback((s: Scenario) => setScenarioState(s), []);
  const setPlan = useCallback((p: Plan) => setPlanState(p), []);

  const reset = useCallback(() => {
    setScenarioState('full');
    setPlanState('pro');
    router.push('/');
  }, [router]);

  return (
    <FlowContext.Provider value={{ scenario, plan, setScenario, setPlan, reset }}>
      {children}
    </FlowContext.Provider>
  );
}

export function useFlow() {
  return useContext(FlowContext);
}
