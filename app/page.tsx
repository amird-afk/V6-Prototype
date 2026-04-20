'use client';

import { useRouter } from 'next/navigation';
import Shell from '@/components/Shell';

export default function Home() {
  const router = useRouter();

  return (
    <Shell>
      <div className="flex flex-col items-center text-center py-4">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
          style={{ background: '#2E3035' }}
        >
          <span className="text-2xl font-black" style={{ color: '#D7FF3A' }}>M</span>
        </div>
        <h1 className="text-2xl font-bold mb-2" style={{ color: '#F5F5F7' }}>
          Welcome to Masterschool
        </h1>
        <p className="text-sm mb-8" style={{ color: '#9EA3AE' }}>
          Start your enrollment in minutes
        </p>
        <button
          className="w-full rounded-full py-4 font-semibold text-sm flex items-center justify-center gap-2"
          style={{ background: '#FFFFFF', color: '#13141A' }}
          onClick={() => router.push('/career-advisor')}
        >
          Start →
        </button>
      </div>
    </Shell>
  );
}
