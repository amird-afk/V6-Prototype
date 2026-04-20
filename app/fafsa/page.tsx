'use client';

import { useRouter } from 'next/navigation';
import Shell from '@/components/Shell';
import { ExternalLink } from 'lucide-react';

export default function FAFSA() {
  const router = useRouter();

  return (
    <Shell track="scholarship">
      <h1 className="text-2xl font-bold mb-4" style={{ color: '#F5F5F7' }}>
        Submit your FAFSA
      </h1>

      <p className="text-sm mb-2" style={{ color: '#9EA3AE' }}>
        Submit the FAFSA for the <strong style={{ color: '#F5F5F7' }}>2026/27</strong> award year and include Masterschool&apos;s school code.
      </p>

      <div className="rounded-xl px-4 py-3 flex items-center justify-between mb-5"
        style={{ background: '#13141A', border: '1px solid #2E3035' }}>
        <div>
          <p className="text-xs mb-0.5" style={{ color: '#9EA3AE' }}>School code</p>
          <p className="text-sm font-mono font-bold" style={{ color: '#F5F5F7' }}>041687</p>
        </div>
        <button className="text-xs px-3 py-1.5 rounded-lg font-medium"
          style={{ background: '#2E3035', color: '#F5F5F7' }}>
          Copy
        </button>
      </div>

      <button className="w-full rounded-full py-4 font-semibold text-sm flex items-center justify-center gap-2 mb-3"
        style={{ background: '#FFFFFF', color: '#13141A' }}>
        <ExternalLink className="w-4 h-4" />
        Start 2026/27 FAFSA form
      </button>

      <button className="w-full rounded-full py-4 font-semibold text-sm"
        style={{ background: '#2E3035', color: '#F5F5F7' }}
        onClick={() => router.push('/stripe-poe?track=scholarship')}>
        I&apos;ve completed my FAFSA
      </button>

      <button className="mt-3 w-full text-xs" style={{ color: '#9EA3AE' }}
        onClick={() => router.back()}>← Back</button>
    </Shell>
  );
}
