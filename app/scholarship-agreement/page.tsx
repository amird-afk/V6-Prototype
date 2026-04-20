'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Shell from '@/components/Shell';
import { Button } from '@/components/ui/button';

export default function ScholarshipAgreement() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tier = searchParams.get('tier') ?? 'pro';
  const isPro = tier === 'pro';

  return (
    <Shell track="scholarship">
      <h1 className="text-2xl font-bold mb-2" style={{ color: '#F5F5F7' }}>
        {isPro ? 'Pro' : 'Core'} scholarship agreement
      </h1>
      <p className="mb-6 text-sm" style={{ color: '#A1A1AA' }}>
        Review and sign your scholarship agreement to confirm enrollment terms.
      </p>

      {/* Mock agreement box */}
      <div
        className="rounded-lg px-4 py-4 mb-8 text-xs leading-relaxed"
        style={{ background: '#0B0B0C', border: '1px solid #2A2B30', color: '#A1A1AA' }}
      >
        <p className="mb-2 font-semibold" style={{ color: '#F5F5F7' }}>
          Masterschool {isPro ? 'Pro' : 'Core'} Scholarship Agreement
        </p>
        <p>
          This agreement outlines the terms of your Masterschool scholarship, including ISA
          repayment conditions, program requirements, and your obligations as a scholarship
          recipient. [Prototype placeholder — full legal text would appear here.]
        </p>
      </div>

      <Button
        className="w-full font-semibold text-base py-6"
        style={{ background: '#D7FF3A', color: '#0B0B0C' }}
        onClick={() => router.push('/enrollment-documents?track=scholarship')}
      >
        Sign agreement
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
