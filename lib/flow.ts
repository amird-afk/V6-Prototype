export type Scenario = 'full' | 'partial' | 'selfpay';
export type Plan = 'core' | 'pro';
export type Track = 'scholarship' | 'partial' | 'selfpay';
export type ModalId = 'M1';

export interface ModalDef {
  title: string;
  body: string;
  continueHref: string;
}

export const modalRegistry: Record<ModalId, ModalDef> = {
  M1: {
    title: "Let's find the right plan for you",
    body: "We'll help you choose a payment option that fits your situation.",
    continueHref: '/maestro-plans',
  },
};

// PQL always goes to eligibility
export function nextFromPQL(): string {
  return '/eligibility';
}

// Income bands → scenario (internal only)
export function scenarioFromIncome(band: string): Scenario {
  if (band === 'over200') return 'selfpay';
  if (band === '100to200') return 'partial';
  return 'full';
}

// After program selection:
// full/partial → both go through FAFSA
// selfpay → skip FAFSA, go to Stripe directly
export function nextFromProgram(track: Track): string {
  if (track === 'selfpay') return '/stripe-poe?track=selfpay';
  if (track === 'partial') return '/fafsa?track=partial';
  return '/fafsa?track=scholarship';
}

// After Q verification:
// scholarship/partial → plan-selection (Core vs Pro split)
// selfpay → enrollment docs
export function nextFromQ(track: Track): string {
  if (track === 'selfpay') return '/enrollment-documents?track=selfpay';
  return `/plan-selection?track=${track}`;
}

// Step maps — full scholarship track (13 steps)
const scholarshipSteps: Record<string, number> = {
  '/pql': 1, '/eligibility': 2, '/signup-pql': 3, '/program-selection': 4,
  '/fafsa': 5, '/stripe-poe': 6, '/diploma-upload': 7, '/q-verification': 8,
  '/plan-selection': 9, '/tuition-package': 10, '/scholarship-agreement': 11,
  '/enrollment-documents': 12, '/finished': 13,
};

// Partial (13 steps — no scholarship-agreement)
const partialSteps: Record<string, number> = {
  '/pql': 1, '/eligibility': 2, '/signup-pql': 3, '/program-selection': 4,
  '/fafsa': 5, '/stripe-poe': 6, '/diploma-upload': 7, '/q-verification': 8,
  '/plan-selection': 9, '/tuition-package': 10,
  '/enrollment-documents': 11, '/pay-flow': 12, '/finished': 13,
};

// Self-pay (9 steps)
const selfpaySteps: Record<string, number> = {
  '/maestro-plans': 1, '/signup': 2, '/program-selection': 3, '/stripe-poe': 4,
  '/diploma-upload': 5, '/q-verification': 6, '/enrollment-documents': 7,
  '/pay-flow': 8, '/finished': 9,
};

export function getStepInfo(pathname: string, track: Track | null) {
  const base = pathname.split('?')[0];
  if (track === 'selfpay') return { step: selfpaySteps[base] ?? 0, total: 9, trackLabel: 'Self-pay' };
  if (track === 'partial') return { step: partialSteps[base] ?? 0, total: 13, trackLabel: 'Partial scholarship' };
  if (track === 'scholarship') return { step: scholarshipSteps[base] ?? 0, total: 13, trackLabel: 'Full scholarship' };
  const pre: Record<string, number> = { '/': 1, '/career-advisor': 2, '/apply-scholarship': 3 };
  return { step: pre[base] ?? 0, total: 3, trackLabel: 'Getting started' };
}
