"use client";

import {
  CalendarDays,
  FolderTree,
  Lightbulb,
  Pencil,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Category } from "@/types";

interface ViewCategoryModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  category: Category;
}

export function ViewCategoryModal({
  isOpen,
  onOpenChange,
  category,
}: ViewCategoryModalProps) {
  if (!category) return null;

  const ideaCount = category._count?.ideas ?? 0;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-h-[90vh] overflow-y-auto overflow-x-hidden rounded-[2rem] border
       border-slate-200/80 bg-white p-0 shadow-[0_30px_100px_rgba(15,23,42,0.18)] dark:border-slate-800
        dark:bg-slate-950 sm:max-w-xl [&>button]:cursor-pointer"
      >
        <div className="p-6 sm:p-8">
          {/* Header */}
          <DialogHeader className="mb-7">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-500/10">
                  <FolderTree className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>

                <div>
                  <DialogTitle className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                    Category Details
                  </DialogTitle>

                  <DialogDescription className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    View category information and activity.
                  </DialogDescription>
                </div>
              </div>
            </div>
          </DialogHeader>

          {/* Category Hero */}
          <div
            className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-linear-to-br
           from-emerald-50 via-white to-cyan-50 p-6 dark:border-slate-800 dark:from-emerald-950/30
            dark:via-slate-900 dark:to-cyan-950/20"
          >
            {/* Decorative circles */}
            <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-emerald-500/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-10 h-36 w-36 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative flex flex-col items-center text-center">
              {/* Icon */}
              <div className="relative">
                <div className="absolute inset-0 rounded-[1.75rem] bg-emerald-500/20 blur-xl" />

                <div className="relative h-28 w-28 overflow-hidden rounded-[1.75rem] border-4 border-white bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
                  {category.icon ? (
                    <Image
                      src={category.icon}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-emerald-100 dark:bg-emerald-900/30">
                      <span className="text-4xl font-black text-emerald-600 dark:text-emerald-400">
                        {category.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Name */}
              <h2 className="mt-5 text-2xl font-black capitalize tracking-tight text-slate-900 dark:text-white">
                {category.name}
              </h2>

              {/* Description */}
              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
                {category.description ||
                  "No description has been provided for this category."}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-5 grid grid-cols-2 gap-4">
            {/* Ideas */}
            <div
              className="group rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 transition-all
             hover:border-emerald-200 hover:bg-emerald-50/50 dark:border-slate-800 dark:bg-slate-900/50
              dark:hover:border-emerald-900 dark:hover:bg-emerald-950/20"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-500/10">
                  <Lightbulb className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                </div>

                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Total Ideas
                  </p>

                  <p className="mt-0.5 text-xl font-black text-slate-900 dark:text-white">
                    {ideaCount}
                  </p>
                </div>
              </div>
            </div>

            {/* Status */}
            <div
              className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 dark:border-slate-800
             dark:bg-slate-900/50"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-100 dark:bg-cyan-500/10">
                  <Sparkles className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                </div>

                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Status
                  </p>

                  <p className="mt-0.5 text-sm font-black text-emerald-600 dark:text-emerald-400">
                    Active
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div className="mt-5 rounded-2xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900/40">
            <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-5 py-4 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <CalendarDays className="h-4 w-4 text-slate-400" />

                <span className="text-xs font-bold text-slate-500">
                  Created
                </span>
              </div>

              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {format(new Date(category.createdAt), "MMM dd, yyyy")}
              </span>
            </div>

            {category.updatedAt && (
              <div className="flex items-center justify-between gap-4 px-5 py-4">
                <div className="flex items-center gap-3">
                  <CalendarDays className="h-4 w-4 text-slate-400" />

                  <span className="text-xs font-bold text-slate-500">
                    Last Updated
                  </span>
                </div>

                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {format(new Date(category.updatedAt), "MMM dd, yyyy")}
                </span>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="h-11 rounded-xl border-slate-200 px-6 font-bold text-slate-600 transition-all hover:bg-slate-100
               cursor-pointer dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
