import { getCategories } from "@/actions/category";
import { getMyIdeas } from "@/actions/idea";
import Pagination from "@/components/common/Pagination";
import ManageIdeasClient from "@/components/modules/dashboard/shared/ManageIdeasClient";
import { SearchQueryParams } from "@/types";
import { IdeaStatus, UserRole } from "@/types/enums";
import { CheckCircle2, ClipboardList, Clock3 } from "lucide-react";
import React from "react";

export default async function ReviewIdeasPage({
  searchParams,
}: {
  searchParams: Promise<SearchQueryParams>;
}) {
  const params = await searchParams;

  const page = params.page || "1";
  const limit = "10";

  const [ideasResult, categoriesResult] = await Promise.all([
    getMyIdeas({
      page,
      limit,
      status: IdeaStatus.ON_REVIEW,
    }),
    getCategories({
      limit: "100",
    }),
  ]);

  const reviewIdeas = ideasResult.data || [];
  const meta = ideasResult.meta;
  const categories = categoriesResult.data || [];

  return (
    <div className="space-y-6">
      {/* ========================================================= */}
      {/* PAGE HEADER */}
      {/* ========================================================= */}

      <div className="relative overflow-hidden rounded-[2rem] border border-amber-100 bg-linear-to-br from-amber-50 via-white to-white p-6 dark:border-amber-500/10 dark:from-amber-500/5 dark:via-slate-950 dark:to-slate-950 sm:p-8">
        {/* Decorative glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-amber-400/10 blur-3xl dark:bg-amber-500/5" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
          {/* Icon */}
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 shadow-sm dark:bg-amber-500/10 dark:text-amber-400">
            <ClipboardList className="h-6 w-6" />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-xl font-black tracking-tight text-slate-900 dark:text-white sm:text-2xl">
                Ideas Under Review
              </h1>

              <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
                {meta?.total ?? 0} {meta?.total === 1 ? "idea" : "ideas"}
              </span>
            </div>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
              Track the ideas you have submitted that are currently waiting for
              administrative review and approval.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* IDEAS TABLE */}
      {/* ========================================================= */}

      {reviewIdeas.length > 0 ? (
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <ManageIdeasClient
            role={UserRole.MEMBER}
            ideas={reviewIdeas}
            categories={categories}
          />

          {meta && (
            <div className="border-t border-slate-100 pb-6 dark:border-slate-800">
              <Pagination meta={meta} />
            </div>
          )}
        </div>
      ) : (
        /* ======================================================= */
        /* EMPTY STATE */
        /* ======================================================= */

        <div className="relative flex min-h-90 flex-col items-center justify-center overflow-hidden rounded-[2rem] border-2 border-dashed border-amber-200 bg-amber-50/30 p-12 text-center dark:border-amber-500/10 dark:bg-amber-500/5">
          <div className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full bg-amber-400/10 blur-3xl" />

          <div className="relative">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 dark:bg-amber-500/10">
              <ClipboardList className="h-7 w-7 text-amber-600 dark:text-amber-400" />
            </div>

            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              No ideas under review
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
              You don't have any ideas waiting for administrative review. Newly
              submitted ideas will appear here while they are being evaluated.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
