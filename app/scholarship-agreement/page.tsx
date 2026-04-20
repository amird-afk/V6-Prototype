'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Shell from '@/components/Shell';
import { FileText } from 'lucide-react';

export default function ScholarshipAgreement() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tier = searchParams.get('tier') ?? 'pro';

  const isSelfpay = tier.startsWith('selfpay');
  const isPartial = tier.startsWith('partial');
  const label = isSelfpay ? 'Enrollment' : isPartial ? 'Partial Scholarship' : 'Pro Scholarship';
  const track = isSelfpay ? 'selfpay' : 'scholarship';

  return (
    <Shell track={track}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: '#2E3035' }}>
          <FileText className="w-5 h-5" style={{ color: '#9EA3AE' }} />
        </div>
        <h1 className="text-xl font-bold" style={{ color: '#F5F5F7' }}>
          {label} Agreement
        </h1>
      </div>

      {/* Placeholder doc */}
      <div className="rounded-2xl px-4 py-5 mb-6 space-y-2"
        style={{ background: '#13141A', border: '1px solid #2E3035' }}>
        {[100, 85, 95, 70, 80].map((w, i) => (
          <div key={i} className="h-2 rounded-full" style={{ background: '#2E3035', width: `${w}%` }} />
        ))}
        <div className="pt-2 flex items-center gap-2">
          <div className="w-12 h-12 rounded" style={{ background: '#2E3035' }} />
          <div className="space-y-1.5 flex-1">
            <div className="h-2 rounded-full w-3/4" style={{ background: '#2E3035' }} />
            <div className="h-2 rounded-full w-1/2" style={{ background: '#2E3035' }} />
          </div>
        </div>
      </div>

      <button className="w-full rounded-full py-4 font-semibold text-sm"
        style={{ background: '#FFFFFF', color: '#13141A' }}
        onClick={() => router.push(`/enrollment-documents?track=${track}`)}>
        Sign agreement
      </button>
      <button className="mt-3 w-full text-xs" style={{ color: '#9EA3AE' }}
        onClick={() => router.back()}>← Back</button>
    </Shell>
  );
}
