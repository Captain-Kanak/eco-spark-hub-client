import { FolderTree } from "lucide-react";
import CategoriesTable from "@/components/modules/dashboard/admin/CategoriesTable";
import { Category } from "@/types";
import ManageCategoryHeader from "@/components/modules/dashboard/admin/ManageCategoryHeader";

export default function ManageCategoriesPage() {
  const categories: Category[] = [
    {
      id: "019d4972-c759-750f-b4a9-6a967a98cbc0",
      name: "category 2",
      icon: null,
      description: "Resources for urban gardening and local food.",
      isDeleted: false,
      createdAt: "2026-04-01T14:29:12.153Z",
      updatedAt: "2026-04-01T14:29:12.153Z",
      _count: { ideas: 1 },
    },
    {
      id: "019d486e-814d-740c-a789-60a63e2a2264",
      name: "category 1",
      icon: null,
      description: "Renewable energy and smart grid innovations.",
      isDeleted: false,
      createdAt: "2026-04-01T09:44:54.861Z",
      updatedAt: "2026-04-01T09:44:54.861Z",
      _count: { ideas: 2 },
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <ManageCategoryHeader />

      {/* Table Container */}
      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <CategoriesTable categories={categories} />

        {categories.length === 0 && (
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
