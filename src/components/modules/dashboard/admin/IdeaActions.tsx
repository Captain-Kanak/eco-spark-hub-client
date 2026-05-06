"use client";

import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { updateIdeaStatusById } from "@/actions/idea.action";
import { IdeaStatus } from "@/types/enums";
import { useRouter } from "next/navigation";

interface IdeaActionsProps {
  ideaId: string;
}

export default function IdeaActions({ ideaId }: IdeaActionsProps) {
  const [isPending, startTransition] = useTransition();
  const [actionType, setActionType] = React.useState<
    "approve" | "reject" | null
  >(null);
  const router = useRouter();

  const handleAction = (type: "approve" | "reject") => {
    setActionType(type);
    startTransition(async () => {
      try {
        const statusType =
          type === "approve" ? IdeaStatus.APPROVED : IdeaStatus.REJECTED;

        const result = await updateIdeaStatusById({
          ideaId,
          status: statusType,
        });

        if (result.success) {
          toast.success(
            `Idea ${type === "approve" ? "Approved" : "Rejected"} successfully`,
          );
          router.refresh();
        } else {
          toast.error(result.message || "Something went wrong");
        }
      } catch (error) {
        toast.error("An unexpected error occurred");
      } finally {
        setActionType(null);
      }
    });
  };

  return (
    <div className="flex items-center gap-2">
      {/* Reject Button */}
      <Button
        variant="outline"
        size="sm"
        disabled={isPending}
        onClick={() => handleAction("reject")}
        className="cursor-pointer h-10 px-4 rounded-xl border-rose-100 text-rose-600 hover:bg-rose-50 hover:text-rose-700 dark:border-rose-900/30 dark:hover:bg-rose-950/30 transition-all font-bold"
      >
        {isPending && actionType === "reject" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            <XCircle className="h-4 w-4 mr-2" />
            Reject
          </>
        )}
      </Button>

      {/* Approve Button */}
      <Button
        size="sm"
        disabled={isPending}
        onClick={() => handleAction("approve")}
        className="h-10 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 transition-all font-bold cursor-pointer"
      >
        {isPending && actionType === "approve" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Approve
          </>
        )}
      </Button>
    </div>
  );
}
