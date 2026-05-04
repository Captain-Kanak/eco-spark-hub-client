import { getPendingIdeas } from "@/actions/idea.action";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, XCircle } from "lucide-react";
import { Idea } from "@/types";
import IdeaActions from "@/components/modules/dashboard/admin/IdeaActions";
import AppPagination from "@/components/layouts/AppPagination";
import { GetIdeaSearchParams } from "@/types/idea.type";

export default async function ManagePendingIdeasPage({
  searchParams,
}: {
  searchParams: Promise<GetIdeaSearchParams>;
}) {
  const params = await searchParams;

  const page = params.page || "1";
  const limit = "12";

  const { data: pendingIdeas, meta } = await getPendingIdeas({
    page,
    limit,
  });

  console.log("pendingIdeas", pendingIdeas);
  console.log("meta", meta);

  if (!pendingIdeas || pendingIdeas.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-[2rem] text-slate-400">
        <Clock size={48} className="mb-4 opacity-20" />
        <p className="font-medium">No pending ideas to review.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-4">
        {pendingIdeas.map((idea: Idea, index) => (
          <Card
            key={idea.id}
            className="p-6 rounded-[2rem] border-slate-200 flex items-center justify-between group hover:border-emerald-200 transition-colors"
          >
            <div className="text-2xl font-bold text-slate-400">#{index + 1}</div>
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h3 className="font-bold text-lg">{idea.title}</h3>
                <Badge
                  variant="secondary"
                  className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none"
                >
                  Pending
                </Badge>
              </div>
              <p className="text-sm text-slate-500 line-clamp-1 max-w-md">
                {idea.description}
              </p>
              <div className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                Submitted by {idea.user?.name || "Anonymous"}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Component to handle the Server Action call */}
              <IdeaActions ideaId={idea.id} />
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
