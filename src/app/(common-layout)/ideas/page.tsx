import { getIdeas } from "@/actions/idea.action";
import PublicIdeasClient from "@/components/modules/idea/PublicIdeasClient";
import { GetIdeaSearchParams } from "@/types/idea.type";

export default async function IdeaPage({
  searchParams,
}: {
  searchParams: Promise<GetIdeaSearchParams>;
}) {
  const params = await searchParams;

  const searchTerm = params.searchTerm || "";

  const { data: ideas } = await getIdeas({ searchTerm });

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

        <PublicIdeasClient ideas={ideas || []} />
      </div>
    </div>
  );
}
