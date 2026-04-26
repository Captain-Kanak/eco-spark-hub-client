import { getCategories } from "@/actions/category.action";
import CreateIdeaForm from "@/components/modules/dashboard/member/CreateIdea";

export default async function CreateIdeaPage() {
  const { data: categories } = await getCategories();

  return (
    <div className="max-w-4xl mx-auto px-4">
      <CreateIdeaForm categories={categories || []} />
    </div>
  );
}
