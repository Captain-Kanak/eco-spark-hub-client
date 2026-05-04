"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Lightbulb } from "lucide-react";

export default function ManageIdeasLayout({
  approved,
  pending,
}: Readonly<{ approved: React.ReactNode; pending: React.ReactNode }>) {
  const pathname = usePathname();

  const isApproved = pathname === "/admin-dashboard/manage-ideas/approved";
  const isPending = pathname === "/admin-dashboard/manage-ideas/pending";

  return (
    <div className="flex flex-1 flex-col animate-in fade-in duration-500">
      <div className="mx-auto w-full max-w-7xl">
        {/* Tab Switcher */}
        <div className="flex p-1.5 bg-slate-100 dark:bg-slate-900 rounded-[2rem] w-full max-w-md mb-8 border border-slate-200 dark:border-slate-800">
          <Link
            href="/admin-dashboard/manage-ideas/approved"
            className={cn(
              "flex flex-1 items-center justify-center gap-2 py-3 text-sm font-bold transition-all rounded-[1.8rem]",
              isApproved
                ? "bg-white dark:bg-slate-800 text-emerald-600 shadow-sm"
                : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300",
            )}
          >
            <Lightbulb className="h-4 w-4" />
            Approved Ideas
          </Link>

          <Link
            href="/admin-dashboard/manage-ideas/pending"
            className={cn(
              "flex flex-1 items-center justify-center gap-2 py-3 text-sm font-bold transition-all rounded-[1.8rem]",
              isPending
                ? "bg-white dark:bg-slate-800 text-amber-600 shadow-sm"
                : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300",
            )}
          >
            <Lightbulb className="h-4 w-4" />
            Pending Ideas
          </Link>
        </div>

        {/* Parallel Slots Container */}
        <div className="relative min-h-100">
          {isApproved && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {approved}
            </div>
          )}

          {isPending && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {pending}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
