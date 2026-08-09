"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Archive, CheckCircle2, ClipboardList, Lightbulb } from "lucide-react";
import { ADMIN_ROUTE_PATHS } from "@/routes/routes-constant";

export default function ManageIdeasLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const isPending = pathname.endsWith("/manage-ideas/review");
  const isPublished = pathname.endsWith("/manage-ideas/active");
  const isCompleted = pathname.endsWith("/manage-ideas/completed");
  const isArchived = pathname.endsWith("/manage-ideas/archived");

  const tabs = [
    {
      title: "Pending",
      description: "Ideas waiting for review",
      href: `${ADMIN_ROUTE_PATHS.MANAGE_IDEAS}/review`,
      icon: ClipboardList,
      active: isPending,
      activeClass:
        "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
      iconClass:
        "bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400",
    },
    {
      title: "Published",
      description: "Active and completed ideas",
      href: `${ADMIN_ROUTE_PATHS.MANAGE_IDEAS}/active`,
      icon: Lightbulb,
      active: isPublished,
      activeClass:
        "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
      iconClass:
        "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400",
    },
    {
      title: "Completed",
      description: "Ideas that have been completed",
      href: `${ADMIN_ROUTE_PATHS.MANAGE_IDEAS}/completed`,
      icon: CheckCircle2,
      active: isCompleted,
      activeClass:
        "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-white",
      iconClass:
        "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300",
    },
    {
      title: "Archived",
      description: "Previously archived ideas",
      href: `${ADMIN_ROUTE_PATHS.MANAGE_IDEAS}/archived`,
      icon: Archive,
      active: isArchived,
      activeClass:
        "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-white",
      iconClass:
        "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-8">
        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-500/5 blur-3xl" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-500/10">
              <Lightbulb className="h-16 w-16 text-emerald-600 dark:text-emerald-400" />
            </div>

            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                Manage Ideas
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                Review community ideas, manage their progress, and organize
                published and archived submissions.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-3 dark:border-slate-800 dark:bg-slate-900/60 lg:self-auto">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-500/10">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </div>

            <div>
              <p className="text-xs font-medium text-slate-500">
                Administration
              </p>

              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Idea Management
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="rounded-[2rem] border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-4">
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

      {/* Current route */}
      <div className="relative min-h-100">{children}</div>
    </div>
  );
}
