import { getCategories } from "@/actions/category.action";
import CreateIdeaForm from "@/components/modules/dashboard/member/CreateIdeaForm";

export default async function CreateIdeaPage() {
  const { data: categories } = await getCategories({ limit: "100" });

  return (
    <div className="max-w-4xl mx-auto px-4">
      <CreateIdeaForm categories={categories || []} />
    </div>
  );
}
