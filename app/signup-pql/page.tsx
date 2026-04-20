'use client';

import { useRouter } from 'next/navigation';
import Shell from '@/components/Shell';
import { useFlow } from '@/components/FlowProvider';

export default function SignupPQL() {
  const router = useRouter();
  const { scenario } = useFlow();
  const track = scenario === 'partial' ? 'partial' : 'scholarship';

  return (
    <Shell track={track}>
      <h1 className="text-2xl font-bold mb-6" style={{ color: '#F5F5F7' }}>
        Create your account
      </h1>

      <div className="space-y-3 mb-6">
        {['Full name', 'Email address', 'Phone number'].map((label) => (
          <div key={label} className="rounded-xl px-4 py-3"
            style={{ background: '#13141A', border: '1px solid #2E3035' }}>
            <p className="text-xs mb-1" style={{ color: '#9EA3AE' }}>{label}</p>
            <div className="h-4 rounded" style={{ background: '#2E3035', width: '60%' }} />
          </div>
        ))}
      </div>

      <button
        className="w-full rounded-full py-4 font-semibold text-sm"
        style={{ background: '#FFFFFF', color: '#13141A' }}
        onClick={() => router.push(`/program-selection?track=${track}`)}
      >
        Continue
      </button>
      <button className="mt-3 w-full text-xs" style={{ color: '#9EA3AE' }}
        onClick={() => router.back()}>← Back</button>
    </Shell>
  );
}
