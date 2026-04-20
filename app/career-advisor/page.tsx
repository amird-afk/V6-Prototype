'use client';

import { useRouter } from 'next/navigation';
import Shell from '@/components/Shell';
import { ArrowUp } from 'lucide-react';

const suggestions = [
  { emoji: '🚀', text: 'Build my dream career as an AI engineer' },
  { emoji: '⚡', text: 'Build AI models at Tesla' },
  { emoji: '🏥', text: 'Save lives developing medical AI tools' },
  { emoji: '🔬', text: 'Optimize machine learning systems at Google' },
];

export default function CareerAdvisor() {
  const router = useRouter();

  return (
    <Shell>
      <h1 className="text-3xl font-bold text-center mb-2 leading-tight" style={{ color: '#F5F5F7' }}>
        The AI<br />university
      </h1>
      <p className="text-sm text-center mb-6" style={{ color: '#9EA3AE' }}>
        Maestro is the #1 way to build your career — with AI.
      </p>

      {/* Chat input */}
      <div className="rounded-2xl px-4 py-3 mb-4 flex items-center justify-between"
        style={{ background: '#13141A', border: '1px solid #2E3035' }}>
        <span className="text-sm" style={{ color: '#555' }}>I want to be...</span>
        <button
          className="rounded-full px-4 py-1.5 text-xs font-semibold flex items-center gap-1"
          style={{ background: '#F5F5F7', color: '#13141A' }}
          onClick={() => router.push('/apply-scholarship')}
        >
          Start now <ArrowUp className="w-3 h-3" />
        </button>
      </div>

      {/* Suggestion chips */}
      <div className="flex flex-col gap-2">
        {suggestions.map((s) => (
          <button
            key={s.text}
            className="rounded-full px-4 py-2 text-xs text-left flex items-center gap-2"
            style={{ background: '#2E3035', color: '#F5F5F7' }}
            onClick={() => router.push('/apply-scholarship')}
          >
            <span>{s.emoji}</span>
            <span>{s.text}</span>
          </button>
        ))}
      </div>

      <button className="mt-4 w-full text-xs" style={{ color: '#9EA3AE' }}
        onClick={() => router.back()}>← Back</button>
    </Shell>
  );
}
