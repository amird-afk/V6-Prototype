'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Shell from '@/components/Shell';
import { ShieldCheck } from 'lucide-react';
import type { Track } from '@/lib/flow';

export default function StripePOE() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const track = (searchParams.get('track') ?? 'scholarship') as Track;

  return (
    <Shell track={track}>
      <h1 className="text-2xl font-bold mb-4" style={{ color: '#F5F5F7' }}>
        Confirm your identity
      </h1>

      <p className="text-sm mb-5" style={{ color: '#9EA3AE' }}>
        We use Stripe, a trusted third party, to securely verify your identity with a photo ID and selfie.
      </p>

      <div className="rounded-xl px-4 py-4 flex items-center gap-4 mb-6"
        style={{ background: '#13141A', border: '1px solid #2E3035' }}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: '#2E3035' }}>
          <ShieldCheck className="w-5 h-5" style={{ color: '#9EA3AE' }} />
        </div>
        <div>
          <p className="text-sm font-semibold" style={{ color: '#F5F5F7' }}>Identity check</p>
          <p className="text-xs" style={{ color: '#9EA3AE' }}>Approx. 2 min · All info encrypted</p>
        </div>
      </div>

      <button className="w-full rounded-full py-4 font-semibold text-sm flex items-center justify-center gap-2"
        style={{ background: '#FFFFFF', color: '#13141A' }}
        onClick={() => router.push(`/diploma-upload?track=${track}`)}>
        Start →
      </button>
      <button className="mt-3 w-full text-xs underline underline-offset-2"
        style={{ color: '#9EA3AE' }}>
        Can&apos;t use Stripe? Upload ID manually
      </button>
    </Shell>
  );
}
