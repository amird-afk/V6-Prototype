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
    <div className="flex items-center gap-2 mb-2">
      <span
        className="text-xs font-semibold px-2.5 py-1 rounded-full"
        style={{ background: '#2A2B30', color: '#A1A1AA' }}
      >
        Step {step} of {total} — {trackLabel}
      </span>
    </div>
  );
}
