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
    const params = new URLSearchParams(searchParams.toString());
    params.delete('modal');
    const query = params.toString();
    router.push(modal.continueHref + (query ? `?${query}` : ''));
  }

  return (
    <Dialog open onOpenChange={() => handleContinue()}>
      <DialogContent
        className="max-w-md border"
        style={{ background: '#17181B', borderColor: '#2A2B30', color: '#F5F5F7' }}
      >
        <DialogHeader>
          <DialogTitle style={{ color: '#F5F5F7' }}>{modal.title}</DialogTitle>
          <DialogDescription style={{ color: '#A1A1AA' }}>{modal.body}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={handleContinue}
            className="w-full font-semibold"
            style={{ background: '#D7FF3A', color: '#0B0B0C' }}
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
