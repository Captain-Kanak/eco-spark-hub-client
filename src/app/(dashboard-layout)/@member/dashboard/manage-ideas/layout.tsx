"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Archive, CheckCircle2, ClipboardList, Lightbulb } from "lucide-react";
import { MEMBER_ROUTE_PATHS } from "@/routes/routes-constant";

export default function ManageIdeasLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const isReview = pathname.endsWith(
    `${MEMBER_ROUTE_PATHS.MANAGE_IDEAS}/review`,
  );

  const isActive = pathname.endsWith(
    `${MEMBER_ROUTE_PATHS.MANAGE_IDEAS}/active`,
  );

  const isCompleted = pathname.endsWith(
    `${MEMBER_ROUTE_PATHS.MANAGE_IDEAS}/completed`,
  );

  const isArchived = pathname.endsWith(
    `${MEMBER_ROUTE_PATHS.MANAGE_IDEAS}/archived`,
  );

  const tabs = [
    {
      title: "Active",
      description: "Published and ongoing ideas",
      href: `${MEMBER_ROUTE_PATHS.MANAGE_IDEAS}/active`,
      icon: Lightbulb,
      active: isActive,
      activeClass:
        "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
      iconClass:
        "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400",
    },
    {
      title: "Review",
      description: "Ideas waiting for review or rejected",
      href: `${MEMBER_ROUTE_PATHS.MANAGE_IDEAS}/review`,
      icon: ClipboardList,
      active: isReview,
      activeClass:
        "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
      iconClass:
        "bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400",
    },
    {
      title: "Completed",
      description: "Ideas that reached completion",
      href: `${MEMBER_ROUTE_PATHS.MANAGE_IDEAS}/completed`,
      icon: CheckCircle2,
      active: isCompleted,
      activeClass:
        "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
      iconClass:
        "bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400",
    },
    {
      title: "Archived",
      description: "Ideas you have archived",
      href: `${MEMBER_ROUTE_PATHS.MANAGE_IDEAS}/archived`,
      icon: Archive,
      active: isArchived,
      activeClass:
        "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400",
      iconClass:
        "bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400",
    },
  ];

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950 p-5">
        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-500/5 blur-3xl" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Title */}
          <div className="flex items-center gap-3">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-500/10">
              <Lightbulb className="h-16 w-16 text-emerald-600 dark:text-emerald-400" />
            </div>

            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                My Ideas
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                Track, update, and manage your ideas throughout their journey
                from submission to completion.
              </p>
            </div>
          </div>

          {/* Workspace Badge */}
          <div className="flex items-center gap-3 self-start rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-3 dark:border-slate-800 dark:bg-slate-900/60 lg:self-auto">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-500/10">
              <Lightbulb className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </div>

            <div>
              <p className="text-xs font-medium text-slate-500">
                Your Workspace
              </p>

              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Idea Management
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= NAVIGATION ================= */}
      <div className="rounded-[2rem] border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;

            return (
              <Link
                key={tab.title}
                href={tab.href}
                className={cn(
                  "group flex items-center gap-3 rounded-[1.5rem] p-3 transition-all duration-300",
                  tab.active
                    ? tab.activeClass
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white",
                )}
              >
                <div
                  className={cn(
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105",
                    tab.active
                      ? tab.iconClass
                      : "bg-slate-100 text-slate-500 dark:bg-slate-900 dark:text-slate-400",
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <p className="font-bold tracking-tight">{tab.title}</p>

                  <p
                    className={cn(
                      "mt-0.5 truncate text-xs",
                      tab.active
                        ? "opacity-70"
                        : "text-slate-400 dark:text-slate-500",
                    )}
                  >
                    {tab.description}
                  </p>
                </div>

                {tab.active && (
                  <div className="ml-auto h-2 w-2 shrink-0 rounded-full bg-current opacity-70" />
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* ================= CURRENT ROUTE ================= */}
      <div className="relative min-h-100">{children}</div>
    </div>
  );
}
