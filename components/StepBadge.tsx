'use client';

import { getStepInfo } from '@/lib/flow';
import type { Track } from '@/lib/flow';

interface StepBadgeProps {
  pathname: string;
  track: Track | null;
}

export default function StepBadge({ pathname, track }: StepBadgeProps) {
  const { step, total, trackLabel } = getStepInfo(pathname, track);

  if (!step) return null;

  return (
    <div className="mb-3 flex items-center gap-2">
      <span className="text-xs px-2.5 py-1 rounded-full font-medium"
        style={{ background: '#2E3035', color: '#9EA3AE' }}>
        {step}/{total} · {trackLabel}
      </span>
    </div>
  );
}
