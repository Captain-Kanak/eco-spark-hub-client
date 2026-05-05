import { getIdeas } from "@/actions/idea.action";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Globe, User, MessageSquare } from "lucide-react";
import DeleteIdeaButton from "@/components/modules/dashboard/admin/DeleteIdeaButton";
import { GetIdeaSearchParams, Idea } from "@/types/idea.type";
import AppPagination from "@/components/layouts/AppPagination";

export default async function ManageApprovedIdeasPage({
  searchParams,
}: {
  searchParams: Promise<GetIdeaSearchParams>;
}) {
  const params = await searchParams;

  const page = params.page || "1";
  const limit = "12";

  const { data: approvedIdeas, meta } = await getIdeas({
    page,
    limit,
  });

  if (!approvedIdeas?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-slate-200 rounded-[3rem] text-slate-400">
        <Globe className="mb-4 opacity-20" size={48} />
        <p className="font-bold">No approved ideas found.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-2xl font-bold">
          {approvedIdeas.length} - Approved Ideas
        </h2>
      </div>

      <div className="space-y-4">
        {approvedIdeas.map((idea: Idea) => (
          <Card
            key={idea.id}
            className="group relative p-8 rounded-[3rem] bg-white dark:bg-slate-950 border-slate-100 dark:border-slate-900 shadow-sm hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-1 transition-all duration-500 overflow-hidden"
          >
            {/* Background Decorative Gradient Glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors duration-500" />

            <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-4 flex-1">
                {/* Header Info */}
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-linear-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black tracking-tight text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                      {idea.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                      <User size={12} className="text-emerald-500" />
                      {idea.user?.name || "Unknown Creator"}
                    </div>
                  </div>
                </div>

                {/* Description with "Quote" styling */}
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-100 dark:bg-slate-800 rounded-full" />
                  <p className="pl-4 text-sm leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-2 italic">
                    "{idea.description}"
                  </p>
                </div>

                {/* Stats Section */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <Badge
                    variant="secondary"
                    className="rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-none px-4 py-1.5 font-bold flex items-center gap-2"
                  >
                    <MessageSquare size={14} className="text-blue-500" />
                    {idea._count.comments}{" "}
                    <span className="font-medium opacity-60">Comments</span>
                  </Badge>

                  <Badge
                    variant="secondary"
                    className="rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-none px-4 py-1.5 font-bold flex items-center gap-2"
                  >
                    <span className="h-5 w-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">
                      $
                    </span>
                    {idea._count.payments}{" "}
                    <span className="font-medium opacity-60">Purchases</span>
                  </Badge>
                </div>
              </div>

              {/* Right Side Action Area */}
              <div className="flex items-center gap-4 self-end md:self-center bg-slate-50 dark:bg-slate-900/50 p-2 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div className="px-3">
                  <DeleteIdeaButton ideaId={idea.id} />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <AppPagination
        totalPages={meta?.totalPages || 1}
        currentPage={meta?.currentPage || 1}
      />
    </div>
  );
}
