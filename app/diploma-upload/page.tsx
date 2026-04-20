'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Shell from '@/components/Shell';
import { FileText } from 'lucide-react';
import type { Track } from '@/lib/flow';

export default function DiplomaUpload() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const track = (searchParams.get('track') ?? 'scholarship') as Track;

  return (
    <Shell track={track}>
      <h1 className="text-2xl font-bold mb-4" style={{ color: '#F5F5F7' }}>
        Upload your high school diploma
      </h1>

      <p className="text-xs mb-4 leading-relaxed" style={{ color: '#9EA3AE' }}>
        Where to find your diploma:
      </p>

      <ul className="space-y-1 mb-5">
        {[
          ['Physical copy', 'The certificate you received at graduation'],
          ['Digital copy', 'Many schools offer a downloadable PDF in your student portal'],
          ['Replacement', 'Request a transcript from your school, Parchment, or the National Student Clearinghouse (usually 1\u20132 weeks)'],
        ].map(([bold, rest]) => (
          <li key={bold} className="text-xs" style={{ color: '#9EA3AE' }}>
            <strong style={{ color: '#F5F5F7' }}>{bold}:</strong> {rest}
          </li>
        ))}
      </ul>

      <div className="rounded-xl px-4 py-4 flex items-center gap-4 mb-5"
        style={{ background: '#13141A', border: '1px solid #2E3035' }}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: '#2E3035' }}>
          <FileText className="w-5 h-5" style={{ color: '#9EA3AE' }} />
        </div>
        <div>
          <p className="text-sm font-semibold" style={{ color: '#F5F5F7' }}>High school diploma</p>
          <p className="text-xs" style={{ color: '#9EA3AE' }}>Approx. 30 sec</p>
        </div>
      </div>

      <button className="w-full rounded-full py-4 font-semibold text-sm"
        style={{ background: '#FFFFFF', color: '#13141A' }}
        onClick={() => router.push(`/q-verification?track=${track}`)}>
        Upload now
      </button>
      <button className="mt-3 w-full text-xs underline underline-offset-2"
        style={{ color: '#9EA3AE' }}>
        I don&apos;t have my diploma
      </button>
    </Shell>
  );
}
