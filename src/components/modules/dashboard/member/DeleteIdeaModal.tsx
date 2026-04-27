"use client";

import { deleteIdeaById } from "@/actions/idea.action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { AlertTriangle, Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

interface DeleteIdeaModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  ideaId: string;
  ideaTitle: string;
}

export default function DeleteIdeaModal({
  isOpen,
  onOpenChange,
  ideaId,
  ideaTitle,
}: DeleteIdeaModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    const toastId = toast.loading("Removing Idea...");

    try {
      const result = await deleteIdeaById(ideaId);

      if (!result.success) {
        toast.error("Failed to delete idea", { id: toastId });
        return;
      }

      toast.success("Idea deleted successfully", { id: toastId });
      onOpenChange(false);
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete idea", { id: toastId });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-100 rounded-[2rem] p-0 overflow-hidden border-none shadow-2xl [&>button]:cursor-pointer">
        {/* Fancy Top Decorative Bar */}
        <div className="h-2 w-full bg-rose-500" />

        <div className="p-8">
          <DialogHeader className="items-center text-center">
            {/* Animated Warning Icon */}
            <div className="mb-4 relative">
              <div className="absolute inset-0 bg-rose-100 dark:bg-rose-900/30 rounded-full animate-ping opacity-20" />
              <div className="relative flex items-center justify-center w-16 h-16 bg-rose-50 dark:bg-rose-950/40 rounded-full">
                <AlertTriangle className="h-8 w-8 text-rose-600" />
              </div>
            </div>

            <DialogTitle className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Delete Idea?
            </DialogTitle>

            <DialogDescription className="text-slate-500 dark:text-slate-400 text-base mt-2">
              You are about to delete{" "}
              <span className="font-semibold text-rose-600">"{ideaTitle}"</span>
              . This action is permanent and cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="flex-1 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 font-medium transition-all cursor-pointer"
            >
              Keep it
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
              className={cn(
                "flex-1 rounded-2xl bg-rose-600 hover:bg-rose-700 shadow-lg shadow-rose-200 dark:shadow-none font-bold transition-all active:scale-95 cursor-pointer",
                isDeleting && "opacity-80",
              )}
            >
              {isDeleting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Deleting...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Trash2 className="h-4 w-4" />
                  <span>Yes, Delete</span>
                </div>
              )}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
