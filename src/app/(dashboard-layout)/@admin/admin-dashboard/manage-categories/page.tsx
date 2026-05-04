import { FolderTree } from "lucide-react";
import { Category } from "@/types";
import ManageCategoryHeader from "@/components/modules/dashboard/admin/ManageCategoryHeader";
import { getCategories } from "@/actions/category.action";
import ManageCategoriesClient from "@/components/modules/dashboard/admin/ManageCategoriesClient";
import AppPagination from "@/components/layouts/AppPagination";
import { GetIdeaSearchParams } from "@/types/idea.type";

export default async function ManageCategoriesPage({
  searchParams,
}: {
  searchParams: Promise<GetIdeaSearchParams>;
}) {
  const params = await searchParams;

  const page = params.page || "1";
  const limit = "12";

  const { data: categories, meta } = await getCategories({ page, limit });

  if (!categories) return null;

  return (
    <div className="space-y-6">
      <ManageCategoryHeader />

      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        {categories.length > 0 ? (
          <div>
            <ManageCategoriesClient categories={categories} />

            <AppPagination
              totalPages={meta?.totalPages || 1}
              currentPage={meta?.currentPage || 1}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <FolderTree className="h-12 w-12 text-slate-200 mb-4" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              No categories found
            </h3>
            <p className="text-slate-500 text-sm">
              Create your first category to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
