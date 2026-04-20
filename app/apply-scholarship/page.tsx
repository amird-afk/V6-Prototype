'use client';

import { useRouter } from 'next/navigation';
import { GraduationCap, Sparkles, Globe, Laptop, Diamond } from 'lucide-react';
import Shell from '@/components/Shell';

const features = [
  { icon: GraduationCap, title: 'Accredited degrees', sub: 'Associate (AAS) and Bachelor\u2019s (BS) degrees' },
  { icon: Sparkles, title: 'Maestro \u2014 your AI tutor', sub: 'Personalized support as you learn' },
  { icon: Globe, title: 'Flexible online learning', sub: 'Learn anytime, from anywhere' },
  { icon: Laptop, title: 'Complimentary laptop', sub: 'Included with Pro from term 2' },
  { icon: Diamond, title: 'And much more\u2026', sub: '' },
];

export default function ApplyScholarship() {
  const router = useRouter();

  return (
    <Shell>
      <div className="flex justify-center mb-4">
        <div className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{ background: '#2E3035' }}>
          <GraduationCap className="w-7 h-7" style={{ color: '#D7FF3A' }} />
        </div>
      </div>

      <h1 className="text-2xl font-bold text-center mb-1" style={{ color: '#F5F5F7' }}>
        Maestro scholarships
      </h1>
      <p className="text-sm text-center mb-5" style={{ color: '#9EA3AE' }}>
        Your fastest route to a successful career. Check if you qualify for up to 100% tuition coverage.
      </p>

      <div className="divide-y mb-5" style={{ borderColor: '#2E3035' }}>
        {features.map(({ icon: Icon, title, sub }) => (
          <div key={title} className="flex items-center gap-3 py-2.5">
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: '#2E3035' }}>
              <Icon className="w-4 h-4" style={{ color: '#9EA3AE' }} />
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: '#F5F5F7' }}>{title}</p>
              {sub && <p className="text-xs" style={{ color: '#9EA3AE' }}>{sub}</p>}
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs mb-4 leading-relaxed" style={{ color: '#9EA3AE' }}>
        Answer a few questions about your financial and educational background to see which scholarship you qualify for. It only takes a few minutes!
      </p>

      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm line-through" style={{ color: '#9EA3AE' }}>Up to $29,900</span>
        <span className="text-sm font-bold" style={{ color: '#F5F5F7' }}>100% scholarship</span>
      </div>

      <button
        className="w-full rounded-full py-4 font-semibold text-sm flex items-center justify-center gap-2"
        style={{ background: '#FFFFFF', color: '#13141A' }}
        onClick={() => router.push('/pql')}
      >
        Start →
      </button>

      <button className="w-full mt-3 text-sm underline underline-offset-2"
        style={{ color: '#9EA3AE' }}
        onClick={() => router.push('/apply-scholarship?modal=M1')}>
        Continue without a scholarship
      </button>
    </Shell>
  );
}
