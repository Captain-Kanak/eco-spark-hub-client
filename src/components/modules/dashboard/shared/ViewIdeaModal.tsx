"use client";

import { Idea } from "@/types";
import { UserRole } from "@/types/enums";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check, Loader2, X } from "lucide-react";
import { useState } from "react";

interface ViewIdeaModalProps {
  role: UserRole;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  idea: Idea;

  onApprove?: (idea: Idea) => Promise<void> | void;
  onReject?: (idea: Idea) => Promise<void> | void;
}

export default function ViewIdeaModal({
  role,
  isOpen,
  onOpenChange,
  idea,
  onApprove,
  onReject,
}: ViewIdeaModalProps) {
  const [action, setAction] = useState<"approve" | "reject" | null>(null);

  const handleApprove = async () => {
    if (!onApprove) return;

    try {
      setAction("approve");
      await onApprove(idea);
    } finally {
      setAction(null);
    }
  };

  const handleReject = async () => {
    if (!onReject) return;

    try {
      setAction("reject");
      await onReject(idea);
    } finally {
      setAction(null);
    }
  };

  const isAdmin = role === UserRole.ADMIN;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-[2rem] border border-slate-200 bg-white p-0 shadow-2xl dark:border-slate-800 dark:bg-slate-950 sm:max-w-3xl [&>button]:cursor-pointer">
        {/* Top accent */}
        <div className="h-1.5 w-full bg-linear-to-r from-emerald-500 via-teal-500 to-cyan-500" />

        <div className="p-6 sm:p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              {idea.title}
            </DialogTitle>

            <DialogDescription className="text-slate-500 dark:text-slate-400">
              Review the complete details of this submitted idea.
            </DialogDescription>
          </DialogHeader>

          {/* ================= IDEA CONTENT ================= */}

          <div className="mt-8">{/* Your idea details go here */}</div>

          {/* ================= ACTIONS ================= */}

          <DialogFooter className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
            {/* Close - Common for everyone */}
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={action !== null}
              className="h-11 rounded-xl border-slate-200 px-6 font-bold cursor-pointer dark:border-slate-700"
            >
              <X className="mr-2 h-4 w-4" />
              Close
            </Button>

            {/* Admin Actions */}
            {isAdmin && (
              <>
                {/* Reject */}
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReject}
                  disabled={action !== null}
                  className="h-11 rounded-xl border-rose-200 bg-rose-50 px-6 font-bold text-rose-600 hover:bg-rose-100 hover:text-rose-700 cursor-pointer dark:border-rose-900/50 dark:bg-rose-950/20"
                >
                  {action === "reject" ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Rejecting...
                    </>
                  ) : (
                    <>
                      <X className="mr-2 h-4 w-4" />
                      Reject
                    </>
                  )}
                </Button>

                {/* Approve */}
                <Button
                  type="button"
                  onClick={handleApprove}
                  disabled={action !== null}
                  className="h-11 rounded-xl bg-emerald-600 px-6 font-bold text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-700 cursor-pointer"
                >
                  {action === "approve" ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Approving...
                    </>
                  ) : (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Approve
                    </>
                  )}
                </Button>
              </>
            )}
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
