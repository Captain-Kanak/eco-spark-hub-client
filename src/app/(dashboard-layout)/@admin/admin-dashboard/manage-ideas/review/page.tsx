import { Clock } from "lucide-react";
import { SearchQueryParams } from "@/types";
import AppPagination from "@/components/common/Pagination";
import { IdeaStatus } from "@/types/enums";
import { getIdeas } from "@/actions/idea";
import ManageIdeasClient from "@/components/modules/dashboard/admin/idea/ManageIdeasClient";

export default async function PendingIdeasPage({
  searchParams,
}: {
  searchParams: Promise<SearchQueryParams>;
}) {
  const params = await searchParams;

  const page = params.page || "1";
  // const limit = "10";

  const { data: pendingIdeas, meta } = await getIdeas({
    page,
    // limit,
    status: IdeaStatus.ON_REVIEW,
  });

  return (
    <div>
      <div className="grid gap-4">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            Pending Ideas -
            <span className="text-xl text-rose-600">{meta?.total}</span>
          </h2>
          <p className="text-sm text-slate-500">
            These are ideas that have been submitted by users and are waiting
            for approval.
          </p>
        </div>

        <div>
          {pendingIdeas && pendingIdeas?.length > 0 ? (
            <div>
              <ManageIdeasClient ideas={pendingIdeas} />

              {meta && <AppPagination meta={meta} />}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-[2rem] text-slate-400">
              <Clock size={48} className="mb-4 opacity-20" />
              <p className="font-medium">No pending ideas to review.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
