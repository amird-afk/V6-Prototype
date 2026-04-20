'use client';

import { useRouter } from 'next/navigation';
import Shell from '@/components/Shell';
import { Button } from '@/components/ui/button';
import { useFlow } from '@/components/FlowProvider';
import { nextFromFafsa } from '@/lib/flow';

export default function FAFSA() {
  const router = useRouter();
  const { scenario } = useFlow();

  function handleSubmit() {
    const next = nextFromFafsa(scenario);
    if (next.modal) {
      router.push(`/fafsa?modal=${next.modal}`);
    } else {
      router.push(next.href);
    }
  }

  return (
    <Shell track="scholarship">
      <h1 className="text-2xl font-bold mb-2" style={{ color: '#F5F5F7' }}>
        Complete your FAFSA
      </h1>
      <p className="mb-8 text-sm" style={{ color: '#A1A1AA' }}>
        We use your FAFSA data to determine scholarship eligibility based on household income.
      </p>
      <Button
        className="w-full font-semibold text-base py-6"
        style={{ background: '#D7FF3A', color: '#0B0B0C' }}
        onClick={handleSubmit}
      >
        Submit FAFSA
      </Button>
      <button
        className="mt-4 w-full text-sm"
        style={{ color: '#A1A1AA' }}
        onClick={() => router.back()}
      >
        ← Back
      </button>
    </Shell>
  );
}
