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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            My Shared Ideas
          </h1>
          <p className="text-slate-500 mt-1">
            Manage and track the sustainable solutions you've shared.
          </p>
        </div>
      </div>

      {/* Passing data to Client Component for better UX */}
      <MyIdeasClient ideas={ideas || []} categories={categories || []} />
    </div>
  );
}
