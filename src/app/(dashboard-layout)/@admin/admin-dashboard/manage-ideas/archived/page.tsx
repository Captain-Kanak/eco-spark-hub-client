import { Archive, Eye, RotateCcw, User, Calendar, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Pagination from "@/components/common/Pagination";
import { SearchQueryParams } from "@/types";
import { IdeaStatus } from "@/types/enums";
import { getIdeas } from "@/actions/idea";
import Link from "next/link";
import { format } from "date-fns";

export default async function ArchiveIdeasPage({
  searchParams,
}: {
  searchParams: Promise<SearchQueryParams>;
}) {
  const params = await searchParams;

  const page = params.page || "1";
  const limit = "10";

  const { data: archivedIdeas, meta } = await getIdeas({
    page,
    limit,
    status: IdeaStatus.ARCHIVED,
  });

  return (
    <div className="space-y-6">
      {/* =====================================================
          HEADER
      ====================================================== */}
      <div className="relative overflow-hidden rounded-[2rem] border border-violet-100 bg-linear-to-br from-violet-50 via-white to-white p-6 dark:border-violet-500/10 dark:from-violet-500/5 dark:via-slate-950 dark:to-slate-950">
        {/* Decorative glow */}
        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-400/10 blur-3xl" />

        <div className="relative flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 shadow-sm dark:bg-violet-500/10 dark:text-violet-400">
            <Archive className="h-6 w-6" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                Archived Ideas
              </h1>

              <span className="rounded-full bg-violet-100 px-2.5 py-1 text-xs font-bold text-violet-700 dark:bg-violet-500/10 dark:text-violet-400">
                {meta?.total ?? 0} ideas
              </span>
            </div>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
              Browse ideas that have been completed and moved to the archive.
              Archived ideas are no longer part of the active idea workflow.
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          EMPTY STATE
      ====================================================== */}
      {!archivedIdeas?.length ? (
        <div className="flex min-h-80 flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-violet-200 bg-violet-50/30 p-12 text-center dark:border-violet-500/10 dark:bg-violet-500/3">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 dark:bg-violet-500/10">
            <Archive
              className="
                h-7 w-7
                text-violet-500
                dark:text-violet-400
              "
            />
          </div>

          <h3
            className="
              text-lg font-bold
              text-slate-800
              dark:text-slate-200
            "
          >
            No archived ideas
          </h3>

          <p
            className="
              mt-2 max-w-sm
              text-sm leading-6
              text-slate-500
              dark:text-slate-400
            "
          >
            Completed ideas that are archived will appear here.
          </p>
        </div>
      ) : (
        <>
          {/* =====================================================
              IDEA LIST
          ====================================================== */}
          <div className="space-y-4">
            {archivedIdeas.map((idea) => (
              <Card
                key={idea.id}
                className="
                  group relative overflow-hidden
                  rounded-[2rem]
                  border border-slate-200
                  bg-white
                  p-6
                  shadow-sm
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:shadow-xl
                  hover:shadow-violet-500/5
                  dark:border-slate-800
                  dark:bg-slate-950
                "
              >
                {/* Decorative glow */}
                <div
                  className="
                    absolute -right-16 -top-16
                    h-40 w-40 rounded-full
                    bg-violet-500/5
                    blur-3xl
                    transition-all duration-500
                    group-hover:bg-violet-500/10
                  "
                />

                <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  {/* =================================================
                      CONTENT
                  ================================================== */}
                  <div className="min-w-0 flex-1 space-y-4">
                    {/* Title + status */}
                    <div className="flex items-start gap-4">
                      <div
                        className="
                          flex h-11 w-11 shrink-0
                          items-center justify-center
                          rounded-2xl
                          bg-violet-100
                          text-violet-600
                          dark:bg-violet-500/10
                          dark:text-violet-400
                        "
                      >
                        <Archive className="h-5 w-5" />
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2
                            className="
                              truncate
                              text-lg font-black
                              tracking-tight
                              text-slate-900
                              transition-colors
                              group-hover:text-violet-600
                              dark:text-white
                              dark:group-hover:text-violet-400
                            "
                          >
                            {idea.title}
                          </h2>

                          <Badge
                            className="
                              rounded-full
                              border-none
                              bg-violet-100
                              px-3 py-1
                              text-[10px]
                              font-black
                              uppercase
                              tracking-wider
                              text-violet-700
                              dark:bg-violet-500/10
                              dark:text-violet-400
                            "
                          >
                            Archived
                          </Badge>
                        </div>

                        {/* Creator */}
                        <div className="mt-1 flex items-center gap-2 text-xs font-semibold text-slate-400">
                          <User className="h-3.5 w-3.5" />

                          <span>{idea.user?.name || "Unknown Creator"}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="line-clamp-2 max-w-3xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                      {idea.description}
                    </p>

                    {/* Meta information */}
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                        <Calendar className="h-3.5 w-3.5" />

                        {format(new Date(idea.createdAt), "MMM dd, yyyy")}
                      </div>

                      {idea.location && (
                        <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                          <MapPin className="h-3.5 w-3.5" />

                          <span className="max-w-40 truncate">
                            {idea.location}
                          </span>
                        </div>
                      )}

                      {idea.category?.name && (
                        <Badge
                          variant="secondary"
                          className="rounded-xl border-none bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600
                           dark:bg-slate-900 dark:text-slate-300"
                        >
                          {idea.category.name}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* =================================================
                      ACTIONS
                  ================================================== */}
                  <div className="flex shrink-0 items-center gap-2 rounded-2xl border border-slate-100 bg-slate-50 p-2 dark:border-slate-800 dark:bg-slate-900/60">
                    {/* View */}
                    <Button
                      asChild
                      variant="ghost"
                      size="icon"
                      title="View idea"
                      className="h-10 w-10 rounded-xl border border-slate-200 bg-white text-slate-500 transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:hover:border-blue-800 dark:hover:bg-blue-950/30"
                    >
                      <Link
                        href={`/ideas/${idea.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>

                    {/* Restore */}
                    <Button
                      variant="ghost"
                      size="icon"
                      title="Restore idea"
                      className="h-10 w-10 rounded-xl border border-slate-200 bg-white text-slate-500 transition-all hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600 dark:border-slate-700 dark:bg-slate-950 dark:hover:border-emerald-800 dark:hover:bg-emerald-950/30 cursor-pointer"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {meta && (
            <div className="border-t border-slate-100 dark:border-slate-800 pb-6">
              <Pagination meta={meta} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
