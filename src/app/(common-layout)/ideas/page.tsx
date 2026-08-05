import { getMe } from "@/actions/auth";
import { getIdeas } from "@/actions/idea";
import Pagination from "@/components/layouts/Pagination";
import PublicIdeasClient from "@/components/modules/idea/PublicIdeasClient";
import { SearchQueryParams } from "@/types";
import { IdeaStatus } from "@/types/enums";

export default async function IdeaPage({
  searchParams,
}: {
  searchParams: Promise<SearchQueryParams>;
}) {
  const params = await searchParams;

  const page = params.page || "1";
  const limit = "12";
  const searchTerm = params.searchTerm || "";
  const sortBy = params.sortBy || "createdAt";
  const sortOrder = params.sortOrder || "desc";
  const categoryId = params.categoryId || "";

  const { data: ideasResult, meta } = await getIdeas({
    page,
    limit,
    searchTerm,
    sortBy,
    sortOrder,
    categoryId,
    status: [IdeaStatus.PUBLISHED, IdeaStatus.IN_PROGRESS],
  });

  return (
    <div className="bg-slate-50/50 dark:bg-slate-950 min-h-screen py-8">
      <div className="container mx-auto max-w-7xl px-4 lg:px-0">
        {/* ================= HERO ================= */}
        <div className="relative mb-16 overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white p-10 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-12">
          {/* Background */}

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.12),transparent_45%)]" />

          <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-emerald-600 dark:border-emerald-900 dark:bg-emerald-950/20 dark:text-emerald-400">
              🌱 Innovation Marketplace
            </div>

            <h1 className="mt-8 max-w-4xl text-5xl font-black leading-tight tracking-tight text-slate-900 dark:text-white md:text-7xl">
              Discover Ideas That
              <span className="block text-emerald-500">
                Make Our Planet Better.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
              Explore sustainable innovations from passionate creators around
              the world. Support impactful ideas, discover breakthrough
              solutions, and help shape a greener future.
            </p>
          </div>
        </div>

        <PublicIdeasClient ideas={ideasResult || []} />

        {meta && <Pagination meta={meta} />}
      </div>
    </div>
  );
}
