import { FolderTree } from "lucide-react";
import ManageCategoryHeader from "@/components/modules/dashboard/admin/ManageCategoryHeader";
import ManageCategoriesClient from "@/components/modules/dashboard/admin/ManageCategoriesClient";
import AppPagination from "@/components/layouts/Pagination";
import { SearchQueryParams } from "@/types";
import { getCategories } from "@/actions/category";

export default async function ManageCategoriesPage({
  searchParams,
}: {
  searchParams: Promise<SearchQueryParams>;
}) {
  const params = await searchParams;

  const page = params.page || "1";
  const limit = "6";

  const result = await getCategories({
    page,
    limit,
  });

  const categories = result.data || [];
  const meta = result.meta;

  return (
    <div className="space-y-8">
      <ManageCategoryHeader />

      <div className="rounded-3xl bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
        {categories.length > 0 ? (
          <div>
            <ManageCategoriesClient categories={categories} />

            {meta && <AppPagination meta={meta} />}
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
