import { getCategories } from "@/actions/category.action";
import { getMyIdeas } from "@/actions/idea.action";
import AppPagination from "@/components/layouts/AppPagination";
import MyIdeasClient from "@/components/modules/dashboard/member/MyIdeasClient";
import { GetIdeaSearchParams } from "@/types/idea.type";

export default async function SharedIdeasPage({
  searchParams,
}: {
  searchParams: Promise<GetIdeaSearchParams>;
}) {
  const params = await searchParams;

  const page = params.page || "1";
  const limit = "12";

  const [categoriesPromise, ideasPromise] = await Promise.all([
    getCategories(),
    getMyIdeas({
      page,
      limit,
    }),
  ]);

  const categories = categoriesPromise.data;
  const ideas = ideasPromise?.data;
  const meta = ideasPromise.meta;

  return (
    <div className="max-w-7xl mx-auto">
      <MyIdeasClient ideas={ideas || []} categories={categories || []} />

      <AppPagination
        totalPages={meta?.totalPages || 1}
        currentPage={meta?.currentPage || 1}
      />
    </div>
  );
}
