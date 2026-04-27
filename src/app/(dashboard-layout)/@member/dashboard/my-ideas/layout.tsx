"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Lightbulb, ShoppingBag } from "lucide-react";

export default function MyIdeasLayout({
  shared,
  purchased,
}: Readonly<{ shared: React.ReactNode; purchased: React.ReactNode }>) {
  const pathname = usePathname();

  const isShared =
    pathname.includes("/shared-ideas") || pathname === "/dashboard/my-ideas";
  const isPurchased = pathname.includes("/purchased-ideas");

  return (
    <div className="flex flex-1 flex-col animate-in fade-in duration-500">
      <div className="mx-auto w-full max-w-7xl">
        {/* Tab Switcher */}
        <div className="flex p-1.5 bg-slate-100 dark:bg-slate-900 rounded-[2rem] w-full max-w-md mb-8 border border-slate-200 dark:border-slate-800">
          <Link
            href="/dashboard/my-ideas/shared-ideas"
            className={cn(
              "flex flex-1 items-center justify-center gap-2 py-3 text-sm font-bold transition-all rounded-[1.8rem]",
              isShared
                ? "bg-white dark:bg-slate-800 text-emerald-600 shadow-sm"
                : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300",
            )}
          >
            <Lightbulb className="h-4 w-4" />
            Shared Ideas
          </Link>
          <Link
            href="/dashboard/my-ideas/purchased-ideas"
            className={cn(
              "flex flex-1 items-center justify-center gap-2 py-3 text-sm font-bold transition-all rounded-[1.8rem]",
              isPurchased
                ? "bg-white dark:bg-slate-800 text-amber-600 shadow-sm"
                : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300",
            )}
          >
            <ShoppingBag className="h-4 w-4" />
            Purchased
          </Link>
        </div>

        {/* Parallel Slots Container */}
        <div className="mt-4">
          {isShared ? (
            <div className="animate-in slide-in-from-bottom-4 duration-500">
              {shared}
            </div>
          ) : (
            <div className="animate-in slide-in-from-bottom-4 duration-500">
              {purchased}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
