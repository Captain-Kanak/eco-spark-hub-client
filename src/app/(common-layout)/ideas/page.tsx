import { getMe } from "@/actions/auth.action";
import { getIdeas, getPurchasedIdeas } from "@/actions/idea.action";
import PublicIdeasClient from "@/components/modules/idea/PublicIdeasClient";
import { Payment } from "@/types";
import { GetIdeaSearchParams } from "@/types/idea.type";

export default async function IdeaPage({
  searchParams,
}: {
  searchParams: Promise<GetIdeaSearchParams>;
}) {
  const params = await searchParams;

  const page = params.page || "1";
  const limit = params.limit || "10";
  const searchTerm = params.searchTerm || "";
  const sortBy = params.sortBy || "createdAt";
  const sortOrder = params.sortOrder || "desc";
  const categoryId = params.categoryId || "";

  const [ideasResult, purchasedResult, userResult] = await Promise.all([
    getIdeas({
      page,
      limit,
      searchTerm,
      sortBy,
      sortOrder,
      categoryId,
    }),
    getPurchasedIdeas(),
    getMe(),
  ]);

  const purchasedIds = new Set(
    purchasedResult?.data?.map((p: Payment) => p.ideaId),
  );
  const user = userResult?.data;

  return (
    <div className="bg-slate-50/50 dark:bg-slate-950 min-h-screen pb-20">
      <div className="">
        <div className="text-center mb-8 space-y-4">
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Explore <span className="text-emerald-600">Sustainable</span> Ideas
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Join the community in sharing and discovering solutions for a
            greener future.
          </p>
        </div>

        <PublicIdeasClient
          ideas={ideasResult.data || []}
          purchasedIds={purchasedIds}
          userId={user?.id || ""}
        />
      </div>
    </div>
  );
}
