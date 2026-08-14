"use client";

import { Idea } from "@/types";
import { IdeaStatus, UserRole } from "@/types/enums";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Check,
  Loader2,
  X,
  Calendar,
  User,
  FolderTree,
  MapPin,
  Wallet,
  Target,
  Banknote,
  Lightbulb,
  Eye,
  FileText,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

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
      onOpenChange(false);
    } finally {
      setAction(null);
    }
  };

  const handleReject = async () => {
    if (!onReject) return;

    try {
      setAction("reject");
      await onReject(idea);
      onOpenChange(false);
    } finally {
      setAction(null);
    }
  };

  const isAdmin = role === UserRole.ADMIN;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-h-[90vh] overflow-y-auto rounded-[2rem] border border-slate-200
       bg-white p-0 shadow-2xl dark:border-slate-800 dark:bg-slate-950 sm:max-w-3xl
        [&>button]:cursor-pointer z-101"
      >
        <div className="p-6 sm:p-8">
          {/* ================= HEADER ================= */}
          <DialogHeader className="text-left">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {/* Category */}
              {idea.category && (
                <Badge
                  variant="secondary"
                  className="gap-1.5 rounded-lg bg-emerald-50 px-3 py-1 text-emerald-700 dark:bg-emerald-500/10
                   dark:text-emerald-400"
                >
                  <FolderTree className="h-3.5 w-3.5" />
                  {idea.category.name}
                </Badge>
              )}

              {/* Status */}
              <Badge
                variant="outline"
                className="rounded-lg px-3 py-1 font-semibold uppercase tracking-wide text-[10px]"
              >
                {idea.status.replaceAll("_", " ")}
              </Badge>
            </div>

            <DialogTitle className="text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              {idea.title}
            </DialogTitle>

            <DialogDescription className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
              Review the complete details, content, and activity of this idea.
            </DialogDescription>
          </DialogHeader>

          {/* ================= COVER IMAGE ================= */}
          {idea.coverImage && (
            <div className="relative mt-7 overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-900">
              <div className="relative aspect-video w-full">
                <Image
                  src={idea.coverImage}
                  alt={idea.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {/* ================= CONTENT ================= */}
          <div className="mt-8 space-y-7">
            <DetailSection icon={Lightbulb} title="Description">
              {idea.description || "No description was provided."}
            </DetailSection>

            {/* Problem */}
            <DetailSection icon={FileText} title="Problem Statement">
              {idea.problemStatement || "No problem statement was provided."}
            </DetailSection>

            {/* Solution */}
            <DetailSection icon={Sparkles} title="Proposed Solution">
              {idea.proposedSolution || "No proposed solution was provided."}
            </DetailSection>

            {/* Expected Impact */}
            <DetailSection icon={Target} title="Expected Impact">
              {idea.expectedImpact?.length > 0 ? (
                <ul className="space-y-2">
                  {idea.expectedImpact.map((impact, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />

                      <span>{impact}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                "No expected impact was provided."
              )}
            </DetailSection>
          </div>

          {/* ================= PROJECT DETAILS ================= */}
          <div className="mt-8 space-y-4">
            <h3 className="text-sm font-black uppercase tracking-[0.16em] text-slate-400">
              Project Details
            </h3>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <InfoItem
                icon={MapPin}
                label="Location"
                value={idea.location}
                color="blue"
              />

              <InfoItem
                icon={Wallet}
                label="Estimated Budget"
                value={idea.estimatedBudget}
                color="amber"
              />

              <InfoItem
                icon={Target}
                label="Funding Goal"
                value={idea.fundingGoal}
                color="violet"
              />

              <InfoItem
                icon={Banknote}
                label="Current Funding"
                value={idea.currentFunding}
                color="emerald"
              />
            </div>
          </div>

          {/* ================= SUBMISSION DETAILS ================= */}
          <div className="mt-8 space-y-4">
            <h3 className="text-sm font-black uppercase tracking-[0.16em] text-slate-400">
              Submission Details
            </h3>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <InfoItem
                icon={User}
                label="Submitted By"
                value={idea.user?.name || "Unknown User"}
                color="blue"
              />

              <InfoItem
                icon={FolderTree}
                label="Category"
                value={idea.category?.name || "Uncategorized"}
                color="emerald"
              />

              <InfoItem
                icon={Calendar}
                label="Created"
                value={format(new Date(idea.createdAt), "MMM dd, yyyy")}
                color="violet"
              />

              <InfoItem
                icon={Eye}
                label="Views"
                value={String(idea.views || 0)}
                color="amber"
              />
            </div>
          </div>

          {/* ================= ACTIONS ================= */}
          <DialogFooter
            className="mt-8 border-t border-slate-100 pt-6 dark:border-slate-800 flex
           flex-col gap-3 sm:flex-row sm:items-center sm:justify-end"
          >
            {/* Close */}
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={action !== null}
              className="h-11 rounded-xl border-slate-200 px-6 font-bold text-slate-600 hover:bg-slate-100
               dark:border-slate-700 dark:text-slate-300 cursor-pointer"
            >
              <X className="mr-2 h-4 w-4" />
              Close
            </Button>

            {/* Admin Actions */}
            {isAdmin && onReject && idea.status !== IdeaStatus.REJECTED && (
              <Button
                type="button"
                variant="outline"
                onClick={handleReject}
                disabled={action !== null}
                className="h-11 rounded-xl border-rose-200 bg-rose-50 px-6 font-bold text-rose-600
                 hover:bg-rose-100 hover:text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/20
                  cursor-pointer"
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
            )}

            {isAdmin &&
              onApprove &&
              (idea.status === IdeaStatus.ON_REVIEW ||
                idea.status === IdeaStatus.REJECTED) && (
                <Button
                  type="button"
                  onClick={handleApprove}
                  disabled={action !== null}
                  className="h-11 rounded-xl bg-emerald-600 px-6 font-bold text-white shadow-lg shadow-emerald-500/20
                 hover:bg-emerald-700 cursor-pointer"
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
              )}
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function DetailSection({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-500/10">
          <Icon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
        </div>

        <h3 className="text-sm font-black uppercase tracking-[0.14em] text-slate-700 dark:text-slate-300">
          {title}
        </h3>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 text-sm leading-7 text-slate-600 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-300">
        {children}
      </div>
    </section>
  );
}

function InfoItem({
  icon: Icon,
  label,
  value,
  color = "emerald",
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  color?: "emerald" | "blue" | "amber" | "violet";
}) {
  const colors = {
    emerald:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
    amber:
      "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
    violet:
      "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
  };

  return (
    <div
      className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4
     dark:border-slate-800 dark:bg-slate-900/50"
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${colors[color]}`}
      >
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-400">{label}</p>

        <p className="truncate font-bold text-slate-900 dark:text-white">
          {value || "Not provided"}
        </p>
      </div>
    </div>
  );
}
