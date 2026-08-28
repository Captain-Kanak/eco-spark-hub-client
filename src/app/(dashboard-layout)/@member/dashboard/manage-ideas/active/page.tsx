import { Lightbulb } from "lucide-react";
import Pagination from "@/components/common/Pagination";
import { SearchQueryParams } from "@/types";
import { IdeaStatus, UserRole } from "@/types/enums";
import { getMyIdeas } from "@/actions/idea";
import ManageIdeasClient from "@/components/modules/dashboard/shared/ManageIdeasClient";
import { getCategories } from "@/actions/category";
import { getMe } from "@/actions/auth";

export default async function ActiveIdeasPage({
  searchParams,
}: {
  searchParams: Promise<SearchQueryParams>;
}) {
  const params = await searchParams;

  const page = params.page || "1";
  const limit = "10";

  const [ideasResult, categoriesResult, userResult] = await Promise.all([
    getMyIdeas({
      page,
      limit,
      status: [IdeaStatus.PUBLISHED, IdeaStatus.IN_PROGRESS],
    }),
    getCategories({
      limit: "100",
    }),
    getMe(),
  ]);

  const activeIdeas = ideasResult.data || [];
  const meta = ideasResult.meta;
  const categories = categoriesResult.data || [];
  const user = userResult.data;

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div
        className="relative overflow-hidden rounded-[2rem] border border-emerald-100 bg-linear-to-br from-emerald-50
       via-white to-white p-6 dark:border-emerald-500/10 dark:from-emerald-500/5 dark:via-slate-950
        dark:to-slate-950 sm:p-8"
      >
        {/* Decorative glow */}
        <div
          className="
            pointer-events-none absolute -right-20 -top-20
            h-56 w-56 rounded-full
            bg-emerald-400/10 blur-3xl
            dark:bg-emerald-500/5
          "
        />

        <div className="relative flex items-start gap-4">
          {/* Icon */}
          <div
            className="
              flex h-14 w-14 shrink-0 items-center justify-center
              rounded-2xl
              bg-emerald-100 text-emerald-600
              shadow-sm
              dark:bg-emerald-500/10
              dark:text-emerald-400
            "
          >
            <Lightbulb className="h-6 w-6" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1
                className="
                  text-xl font-black tracking-tight
                  text-slate-900 dark:text-white
                "
              >
                Active Ideas
              </h1>

              <span
                className="
                  rounded-full
                  bg-emerald-100
                  px-2.5 py-1
                  text-xs font-bold
                  text-emerald-700
                  dark:bg-emerald-500/10
                  dark:text-emerald-400
                "
              >
                {meta?.total ?? 0} ideas
              </span>
            </div>

            <p
              className="
                mt-2 max-w-2xl
                text-sm leading-6
                text-slate-500
                dark:text-slate-400
              "
            >
              Manage your published and ongoing ideas, track their progress, and
              keep your community projects moving forward.
            </p>
          </div>
        </div>
      </div>

      {/* ================= IDEAS TABLE ================= */}
      {activeIdeas.length > 0 ? (
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
            role={user?.role || UserRole.MEMBER}
            ideas={activeIdeas}
            categories={categories}
          />

          {meta && (
            <div
              className="
                border-t border-slate-100
                pb-6
                dark:border-slate-800
              "
            >
              <Pagination meta={meta} />
            </div>
          )}
        </div>
      ) : (
        /* ================= EMPTY STATE ================= */
        <div
          className="
            flex min-h-80 flex-col items-center justify-center
            rounded-[2rem]
            border-2 border-dashed
            border-emerald-200
            bg-emerald-50/30
            p-12 text-center
            dark:border-emerald-500/10
            dark:bg-emerald-500/3
          "
        >
          <div
            className="
              mb-5 flex h-16 w-16 items-center justify-center
              rounded-2xl
              bg-emerald-100
              dark:bg-emerald-500/10
            "
          >
            <Lightbulb className="h-7 w-7 text-emerald-500 dark:text-emerald-400" />
          </div>

          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
            No active ideas yet
          </h3>

          <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
            Ideas that are published or currently in progress will appear here.
          </p>
        </div>
      )}
    </div>
  );
}
