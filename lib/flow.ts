export type Scenario = 'pro' | 'core' | 'selfpay';
export type Track = 'scholarship' | 'selfpay';
export type ModalId = 'M1' | 'M2' | 'M3' | 'M4' | 'M5';

export interface ModalDef {
  title: string;
  body: string;
  continueHref: string;
}

export const modalRegistry: Record<ModalId, ModalDef> = {
  M1: {
    title: 'Household income above $100K',
    body: "Applicants with reported household income above $100K are not eligible for Masterschool scholarships. You'll continue on the self-pay track.",
    continueHref: '/maestro-plans',
  },
  M2: {
    title: 'ISIR above $100K',
    body: 'Your FAFSA results show household income above the scholarship threshold. Your application is moving to the self-pay track.',
    continueHref: '/signup',
  },
  M3: {
    title: 'You qualify for Pro — full scholarship',
    body: "Based on your ISIR, you're eligible for our Pro tier: full tuition scholarship with ISA repayment terms.",
    continueHref: '/tuition-package?tier=pro',
  },
  M4: {
    title: 'You qualify for Core — partial scholarship',
    body: "Based on your ISIR, you're eligible for our Core tier: partial scholarship with reduced upfront tuition.",
    continueHref: '/tuition-package?tier=core',
  },
  M5: {
    title: 'Self-pay track',
    body: "You're on the self-pay track. After document verification you'll complete payment directly.",
    continueHref: '/q-verification?track=selfpay',
  },
};

export function nextFromFafsa(scenario: Scenario): { modal?: ModalId; href: string } {
  if (scenario === 'selfpay') {
    return { modal: 'M2', href: '/signup' };
  }
  return { href: '/stripe-poe' };
}

export function nextFromQVerification(
  scenario: Scenario,
  track: Track
): { modal?: ModalId; href: string } {
  if (track === 'selfpay') {
    return { href: '/enrollment-documents?track=selfpay' };
  }
  if (scenario === 'core') {
    return { modal: 'M4', href: '/tuition-package?tier=core' };
  }
  return { modal: 'M3', href: '/tuition-package?tier=pro' };
}

export function nextFromProgramSelection(track: Track): { modal?: ModalId; href: string } {
  if (track === 'selfpay') {
    return { modal: 'M5', href: '/q-verification?track=selfpay' };
  }
  return { href: '/fafsa' };
}

// Step counting per track
const scholarshipSteps: Record<string, number> = {
  '/signup-pql': 1,
  '/program-selection': 2,
  '/fafsa': 3,
  '/stripe-poe': 4,
  '/q-verification': 5,
  '/tuition-package': 6,
  '/scholarship-agreement': 7,
  '/enrollment-documents': 8,
  '/pay-flow': 9,
  '/finished': 10,
  '/career-advisor': 11,
  '/apply-scholarship': 12,
};

const selfpaySteps: Record<string, number> = {
  '/maestro-plans': 1,
  '/signup': 2,
  '/program-selection': 3,
  '/q-verification': 4,
  '/enrollment-documents': 5,
  '/pay-flow': 6,
  '/finished': 7,
};

export function getStepInfo(
  pathname: string,
  track: Track | null
): { step: number; total: number; trackLabel: string } {
  const base = pathname.split('?')[0];

  if (track === 'selfpay') {
    const step = selfpaySteps[base] ?? 0;
    return { step, total: 7, trackLabel: 'Self-pay track' };
  }

  if (track === 'scholarship') {
    const step = scholarshipSteps[base] ?? 0;
    return { step, total: 10, trackLabel: 'Scholarship track' };
  }

  // Pre-decision screens
  const preSteps: Record<string, number> = {
    '/': 1,
    '/career-advisor': 2,
    '/apply-scholarship': 3,
  };
  const step = preSteps[base] ?? 0;
  return { step, total: 3, trackLabel: 'Getting started' };
}
