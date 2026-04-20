'use client';

import { useRouter } from 'next/navigation';
import Shell from '@/components/Shell';
import { Button } from '@/components/ui/button';

export default function ApplyScholarship() {
  const router = useRouter();

  return (
    <Shell>
      <h1 className="text-2xl font-bold mb-2" style={{ color: '#F5F5F7' }}>
        Apply for a scholarship
      </h1>
      <p className="mb-8 text-sm" style={{ color: '#A1A1AA' }}>
        Masterschool scholarships cover full or partial tuition based on household income.
      </p>
      <Button
        className="w-full font-semibold text-base py-6"
        style={{ background: '#D7FF3A', color: '#0B0B0C' }}
        onClick={() => router.push('/signup-pql')}
      >
        Apply
      </Button>
      <Button
        variant="outline"
        className="mt-3 w-full text-base py-6"
        style={{ borderColor: '#2A2B30', color: '#F5F5F7', background: 'transparent' }}
        onClick={() => router.push('/apply-scholarship?modal=M1')}
      >
        Continue without scholarship
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
