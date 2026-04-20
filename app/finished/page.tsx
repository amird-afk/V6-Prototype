'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Shell from '@/components/Shell';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import type { Track } from '@/lib/flow';

export default function Finished() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const track = (searchParams.get('track') ?? 'scholarship') as Track;

  function handleHub() {
    alert('Prototype end — redirecting to home.');
    router.push('/');
  }

  return (
    <Shell track={track}>
      <div className="flex flex-col items-center text-center">
        <CheckCircle className="mb-4 h-12 w-12" style={{ color: '#34D399' }} />
        <h1 className="text-2xl font-bold mb-2" style={{ color: '#F5F5F7' }}>
          You&apos;re enrolled!
        </h1>
        <p className="mb-8 text-sm" style={{ color: '#A1A1AA' }}>
          {track === 'scholarship'
            ? "Congratulations! Your scholarship has been confirmed and enrollment is complete."
            : "Congratulations! Your payment was received and enrollment is complete."}
        </p>
        <Button
          className="w-full font-semibold text-base py-6"
          style={{ background: '#D7FF3A', color: '#0B0B0C' }}
          onClick={handleHub}
        >
          Go to Student Hub
        </Button>
      </div>
    </Shell>
  );
}
