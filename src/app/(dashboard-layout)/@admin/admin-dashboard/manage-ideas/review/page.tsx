import { ClipboardList, Clock } from "lucide-react";
import { SearchQueryParams } from "@/types";
import AppPagination from "@/components/common/Pagination";
import { IdeaStatus } from "@/types/enums";
import { getIdeas } from "@/actions/idea";
import ManageIdeasClient from "@/components/modules/dashboard/admin/idea/ManageIdeasClient";

export default async function ReviewIdeasPage({
  searchParams,
}: {
  searchParams: Promise<SearchQueryParams>;
}) {
  const params = await searchParams;

  const page = params.page || "1";
  // const limit = "10";

  const { data: reviewIdeas, meta } = await getIdeas({
    page,
    // limit,
    status: [IdeaStatus.ON_REVIEW, IdeaStatus.REJECTED],
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div
        className="flex flex-col gap-5 rounded-[2rem] border border-amber-100 bg-linear-to-br
       from-amber-50 via-white to-white p-6 dark:border-amber-500/10 dark:from-amber-500/5 dark:via-slate-950
        dark:to-slate-950 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 shadow-sm dark:bg-amber-500/10 dark:text-amber-400">
            <ClipboardList className="h-6 w-6" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                Ideas for Review
              </h1>

              <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
                {meta?.total ?? 0} ideas
              </span>
            </div>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
              Review ideas submitted by community members and decide whether
              they should be published or rejected.
            </p>
          </div>
        </div>
      </div>

      {/* Ideas Content */}
      {reviewIdeas && reviewIdeas.length > 0 ? (
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <ManageIdeasClient ideas={reviewIdeas} />

          {meta && (
            <div className="border-t border-slate-100 dark:border-slate-800">
              <AppPagination meta={meta} />
            </div>
          )}
        </div>
      ) : (
        <div className="flex min-h-80 flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-amber-200 bg-amber-50/30 p-12 text-center dark:border-amber-500/10 dark:bg-amber-500/3">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 dark:bg-amber-500/10">
            <Clock className="h-7 w-7 text-amber-500 dark:text-amber-400" />
          </div>

          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
            No ideas waiting for review
          </h3>

          <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
            When users submit new ideas, they will appear here for review.
          </p>
        </div>
      )}
    </div>
  );
}
