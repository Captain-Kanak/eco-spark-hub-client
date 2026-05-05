"use client";

import React, { useTransition, useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { deleteIdeaById } from "@/actions/idea.action";
import { useRouter } from "next/navigation";

export default function DeleteIdeaButton({ ideaId }: { ideaId: string }) {
  const [isPending, startTransition] = useTransition();
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteIdeaById(ideaId);
      if (result.success) {
        toast.success("Idea deleted permanently");
        router.refresh();
      } else {
        toast.error(result.message || "Failed to delete idea");
        setShowConfirm(false);
      }
    });
  };

  if (showConfirm) {
    return (
      <div className="flex items-center gap-2 animate-in fade-in zoom-in duration-200">
        <span className="text-xs font-bold text-rose-500 flex items-center gap-1">
          <AlertCircle size={14} /> Are you sure?
        </span>

        <Button
          size="sm"
          variant="ghost"
          className="h-8 rounded-lg font-bold cursor-pointer"
          onClick={() => setShowConfirm(false)}
          disabled={isPending}
        >
          Cancel
        </Button>

        <Button
          size="sm"
          variant="destructive"
          className="h-8 rounded-lg font-bold text-white dark:text-white bg-red-500 dark:bg-red-500 cursor-pointer"
          onClick={handleDelete}
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : (
            "Yes, Delete"
          )}
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setShowConfirm(true)}
      className="h-10 w-10 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
    >
      <Trash2 size={20} />
    </Button>
  );
}
