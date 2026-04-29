import { getCategories } from "@/actions/category.action";
import { getMyIdeas } from "@/actions/idea.action";
import MyIdeasClient from "@/components/modules/dashboard/member/MyIdeasClient";

export default async function SharedIdeasPage() {
  const [categoriesPromise, ideasPromise] = await Promise.all([
    getCategories(),
    getMyIdeas(),
  ]);

  const categories = categoriesPromise.data;
  const ideas = ideasPromise.data;

  return (
    <div className="max-w-7xl mx-auto">
      <MyIdeasClient ideas={ideas || []} categories={categories || []} />
    </div>
  );
}
