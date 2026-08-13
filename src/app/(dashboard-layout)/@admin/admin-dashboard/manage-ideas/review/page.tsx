import { ClipboardList, Clock, XCircle } from "lucide-react";
import { SearchQueryParams } from "@/types";
import Pagination from "@/components/common/Pagination";
import { IdeaStatus, UserRole } from "@/types/enums";
import { getIdeas } from "@/actions/idea";
import ManageIdeasClient from "@/components/modules/dashboard/shared/ManageIdeasClient";
import { getCategories } from "@/actions/category";
import { getMe } from "@/actions/auth";

export default async function ReviewIdeasPage({
  searchParams,
}: {
  searchParams: Promise<SearchQueryParams>;
}) {
  const params = await searchParams;

  const page = params.page || "1";

  const [categoriesResult, reviewIdeasResult, rejectedIdeasResult, userResult] =
    await Promise.all([
      getCategories({
        limit: "100",
      }),

      getIdeas({
        page,
        status: IdeaStatus.ON_REVIEW,
      }),

      getIdeas({
        page,
        status: IdeaStatus.REJECTED,
      }),

      getMe(),
    ]);

  const reviewIdeas = reviewIdeasResult.data || [];
  const reviewMeta = reviewIdeasResult.meta;

  const rejectedIdeas = rejectedIdeasResult.data || [];
  const rejectedMeta = rejectedIdeasResult.meta;

  const categories = categoriesResult.data || [];
  const user = userResult.data;

  return (
    <div className="space-y-10">
      {/* ================= REVIEW SECTION ================= */}
      <section>
        {/* Pending Ideas Header */}
        <div
          className="flex flex-col gap-5 rounded-[2rem] border border-amber-100 bg-linear-to-br from-amber-50 via-white
           to-white p-6 dark:border-amber-500/10 dark:from-amber-500/5 dark:via-slate-950 dark:to-slate-950
            sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-start gap-4">
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-100
             text-amber-600 shadow-sm dark:bg-amber-500/10 dark:text-amber-400"
            >
              <ClipboardList className="h-6 w-6" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                  Pending Ideas
                </h2>

                <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
                  {reviewMeta?.total ?? 0} ideas
                </span>
              </div>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                Review newly submitted ideas and decide whether they should be
                published or rejected.
              </p>
            </div>
          </div>
        </div>

        {reviewIdeas.length > 0 ? (
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <ManageIdeasClient
              role={user?.role || UserRole.MEMBER}
              ideas={reviewIdeas}
              categories={categories}
            />

            {reviewMeta && (
              <div className="border-t border-slate-100 dark:border-slate-800">
                <Pagination meta={reviewMeta} />
              </div>
            )}
          </div>
        ) : (
          <div
            className="flex min-h-72 flex-col items-center justify-center rounded-[2rem] border-2 border-dashed
           border-amber-200 bg-amber-50/30 p-12 text-center dark:border-amber-500/10 dark:bg-amber-500/3"
          >
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 dark:bg-amber-500/10">
              <Clock className="h-7 w-7 text-amber-500 dark:text-amber-400" />
            </div>

            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              No pending ideas
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
              There are currently no ideas waiting for admin review.
            </p>
          </div>
        )}
      </section>

      {/* ================= REJECTED SECTION ================= */}
      <section>
        {/* Rejected Ideas Header */}
        <div
          className="flex flex-col gap-5 rounded-[2rem] border border-rose-100 bg-linear-to-br from-rose-50 via-white
           to-white p-6 dark:border-rose-500/10 dark:from-rose-500/5 dark:via-slate-950 dark:to-slate-950
            sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 shadow-sm dark:bg-rose-500/10 dark:text-rose-400">
              <XCircle className="h-6 w-6" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                  Rejected Ideas
                </h2>

                <span
                  className="rounded-full bg-rose-100 px-2.5 py-1 text-xs font-bold text-rose-700
                   dark:bg-rose-500/10 dark:text-rose-400"
                >
                  {rejectedMeta?.total ?? 0} ideas
                </span>
              </div>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                Ideas that were reviewed and rejected by the administration.
              </p>
            </div>
          </div>
        </div>

        {rejectedIdeas.length > 0 ? (
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <ManageIdeasClient
              role={user?.role || UserRole.MEMBER}
              ideas={rejectedIdeas}
              categories={categories}
            />

            {rejectedMeta && (
              <div className="border-t border-slate-100 dark:border-slate-800">
                <Pagination meta={rejectedMeta} />
              </div>
            )}
          </div>
        ) : (
          <div className="flex min-h-72 flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-rose-200 bg-rose-50/30 p-12 text-center dark:border-rose-500/10 dark:bg-rose-500/3">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-100 dark:bg-rose-500/10">
              <XCircle className="h-7 w-7 text-rose-500 dark:text-rose-400" />
            </div>

            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              No rejected ideas
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
              No ideas have been rejected yet.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
