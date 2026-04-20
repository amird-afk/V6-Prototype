'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { modalRegistry } from '@/lib/flow';
import type { ModalId } from '@/lib/flow';

interface FlowModalProps {
  modalId: string;
}

export default function FlowModal({ modalId }: FlowModalProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const modal = modalRegistry[modalId as ModalId];
  if (!modal) return null;

  function handleContinue() {
    // Strip 'modal' from current params, then append remaining params to continueHref
    const params = new URLSearchParams(searchParams.toString());
    params.delete('modal');
    const remaining = params.toString();

    // continueHref may already contain '?' — join with '&' if so
    const target = modal.continueHref;
    const separator = target.includes('?') ? '&' : '?';
    const dest = remaining ? `${target}${separator}${remaining}` : target;
    router.push(dest);
  }

  return (
    <Dialog open onOpenChange={() => handleContinue()}>
      <DialogContent
        className="max-w-sm rounded-2xl border-0 p-6"
        style={{ background: '#1E2024', color: '#F5F5F7' }}
      >
        <DialogHeader className="gap-2">
          <DialogTitle className="text-lg font-semibold" style={{ color: '#F5F5F7' }}>
            {modal.title}
          </DialogTitle>
          <DialogDescription className="text-sm leading-relaxed" style={{ color: '#9EA3AE' }}>
            {modal.body}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-2">
          <Button
            onClick={handleContinue}
            className="w-full rounded-full py-5 font-semibold text-sm"
            style={{ background: '#FFFFFF', color: '#0B0B0C' }}
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
