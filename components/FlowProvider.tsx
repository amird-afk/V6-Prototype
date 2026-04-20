'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import type { Scenario } from '@/lib/flow';

interface FlowContextValue {
  scenario: Scenario;
  setScenario: (s: Scenario) => void;
  reset: () => void;
}

const FlowContext = createContext<FlowContextValue>({
  scenario: 'pro',
  setScenario: () => {},
  reset: () => {},
});

export function FlowProvider({ children }: { children: ReactNode }) {
  const [scenario, setScenarioState] = useState<Scenario>('pro');
  const router = useRouter();

  const setScenario = useCallback((s: Scenario) => {
    setScenarioState(s);
  }, []);

  const reset = useCallback(() => {
    setScenarioState('pro');
    router.push('/');
  }, [router]);

  return (
    <FlowContext.Provider value={{ scenario, setScenario, reset }}>
      {children}
    </FlowContext.Provider>
  );
}

export function useFlow() {
  return useContext(FlowContext);
}
