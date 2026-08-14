import { CheckCircle2 } from "lucide-react";
import Pagination from "@/components/common/Pagination";
import { SearchQueryParams } from "@/types";
import { IdeaStatus } from "@/types/enums";
import { getIdeas } from "@/actions/idea";
import ManageIdeasClient from "@/components/modules/dashboard/shared/ManageIdeasClient";
import { UserRole } from "@/types/enums";

export default async function CompletedIdeasPage({
  searchParams,
}: {
  searchParams: Promise<SearchQueryParams>;
}) {
  const params = await searchParams;

  const page = params.page || "1";
  const limit = "10";

  const { data: completedIdeas, meta } = await getIdeas({
    page,
    limit,
    status: IdeaStatus.COMPLETED,
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div
        className="
          flex flex-col gap-5 rounded-[2rem]
          border border-indigo-100
          bg-linear-to-br from-indigo-50 via-white to-white
          p-6
          dark:border-indigo-500/10
          dark:from-indigo-500/5
          dark:via-slate-950
          dark:to-slate-950
          sm:flex-row sm:items-center sm:justify-between
        "
      >
        <div className="flex items-start gap-4">
          <div
            className="
              flex h-14 w-14 shrink-0 items-center justify-center
              rounded-2xl
              bg-indigo-100 text-indigo-600
              shadow-sm
              dark:bg-indigo-500/10 dark:text-indigo-400
            "
          >
            <CheckCircle2 className="h-6 w-6" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                Completed Ideas
              </h1>

              <span
                className="
                  rounded-full
                  bg-indigo-100
                  px-2.5 py-1
                  text-xs font-bold text-indigo-700
                  dark:bg-indigo-500/10
                  dark:text-indigo-400
                "
              >
                {meta?.total ?? 0} ideas
              </span>
            </div>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
              Browse ideas that have successfully completed their journey. Open
              an idea to view its full public details.
            </p>
          </div>
        </div>
      </div>

      {/* Table */}
      {completedIdeas?.length ? (
        <div
          className="
            overflow-hidden rounded-[2rem]
            border border-slate-200
            bg-white shadow-sm
            dark:border-slate-800
            dark:bg-slate-950
          "
        >
          <ManageIdeasClient
            role={UserRole.ADMIN}
            ideas={completedIdeas}
            categories={[]}
            viewAsLink
          />

          {meta && (
            <div className="border-t border-slate-100 dark:border-slate-800 pb-6">
              <Pagination meta={meta} />
            </div>
          )}
        </div>
      ) : (
        <div
          className="
            flex min-h-80 flex-col items-center justify-center
            rounded-[2rem]
            border-2 border-dashed
            border-indigo-200
            bg-indigo-50/30
            p-12 text-center
            dark:border-indigo-500/10
            dark:bg-indigo-500/3
          "
        >
          <div
            className="
              mb-5 flex h-16 w-16 items-center justify-center
              rounded-2xl
              bg-indigo-100
              dark:bg-indigo-500/10
            "
          >
            <CheckCircle2 className="h-7 w-7 text-indigo-500 dark:text-indigo-400" />
          </div>

          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
            No completed ideas yet
          </h3>

          <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
            Ideas that successfully reach completion will appear here.
          </p>
        </div>
      )}
    </div>
  );
}
