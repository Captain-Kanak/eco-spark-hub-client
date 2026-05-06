"use client";

import React, { useTransition, useState } from "react";
import { deleteUser } from "@/actions/auth.action";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function DeleteUserButton({
  userId,
  userName,
}: {
  userId: string;
  userName: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteUser(userId);
      if (result.success) {
        toast.success(`User ${userName} removed.`);
        router.refresh();
      } else {
        toast.error(result.message || "Failed to delete user");
        setShowConfirm(false);
      }
    });
  };

  if (showConfirm) {
    return (
      <div className="flex items-center gap-2 animate-in zoom-in duration-200">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setShowConfirm(false)}
          className="h-8 rounded-lg text-xs font-bold cursor-pointer"
        >
          <X size={14} className="mr-1" /> Cancel
        </Button>

        <Button
          size="sm"
          variant="destructive"
          onClick={handleDelete}
          disabled={isPending}
          className="h-8 rounded-lg text-xs font-bold text-white dark:text-white bg-rose-600 dark:bg-rose-600 cursor-pointer hover:bg-rose-700 dark:hover:bg-rose-700 transition-colors"
        >
          {isPending ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : (
            "Confirm Delete"
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
      className="h-10 w-10 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all cursor-pointer"
    >
      <Trash2 size={18} />
    </Button>
  );
}
