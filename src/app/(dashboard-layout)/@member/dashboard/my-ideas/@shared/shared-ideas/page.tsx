import { getCategories } from "@/actions/category";
import { getIdeas } from "@/actions/idea";
import Pagination from "@/components/common/Pagination";
import MyIdeasClient from "@/components/modules/dashboard/member/idea/MyIdeasClient";
import { SearchQueryParams } from "@/types";

export default async function SharedIdeasPage({
  searchParams,
}: {
  searchParams: Promise<SearchQueryParams>;
}) {
  const params = await searchParams;

  const page = params.page || "1";
  const limit = "12";

  const [categoriesPromise, ideasPromise] = await Promise.all([
    getCategories({}),
    getIdeas({
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

      {meta && <Pagination meta={meta} />}
    </div>
  );
}
