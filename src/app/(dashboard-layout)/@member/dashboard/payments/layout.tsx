"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ShoppingBag, DollarSign, ArrowLeftRight } from "lucide-react";

export default function PaymentsHistoryLayout({
  sales,
  purchased,
}: {
  sales: React.ReactNode;
  purchased: React.ReactNode;
}) {
  const pathname = usePathname();

  const isSales = pathname === "/dashboard/payments/sales-history";
  const isPurchased = pathname === "/dashboard/payments/purchased-history";

  return (
    <div className="flex flex-1 flex-col animate-in fade-in duration-700">
      <div className="mx-auto w-full">
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">
            Payment <span className="text-emerald-500 italic">History</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Manage your transactions and access blueprints for purchased
            eco-innovations.
          </p>
        </div>

        {/* Premium Tab Switcher */}
        <div className="flex p-1.5 bg-slate-100 dark:bg-slate-900/50 backdrop-blur-md rounded-[2.5rem] w-full max-w-md mb-12 border border-slate-200 dark:border-slate-800 shadow-inner">
          <Link
            href="/dashboard/payments/sales-history"
            className={cn(
              "flex flex-1 items-center justify-center gap-2 py-3.5 text-xs uppercase tracking-widest font-black transition-all duration-300 rounded-[2.2rem]",
              isSales
                ? "bg-white dark:bg-slate-800 text-emerald-600 shadow-xl"
                : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300",
            )}
          >
            <DollarSign className="h-4 w-4" />
            Sales
          </Link>
          <Link
            href="/dashboard/payments/purchased-history"
            className={cn(
              "flex flex-1 items-center justify-center gap-2 py-3.5 text-xs uppercase tracking-widest font-black transition-all duration-300 rounded-[2.2rem]",
              isPurchased
                ? "bg-white dark:bg-slate-800 text-blue-600 shadow-xl"
                : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300",
            )}
          >
            <ShoppingBag className="h-4 w-4" />
            Purchases
          </Link>
        </div>

        {/* Parallel Slots Container */}
        <div className="relative min-h-100">
          {isSales && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {sales}
            </div>
          )}

          {isPurchased && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {purchased}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
