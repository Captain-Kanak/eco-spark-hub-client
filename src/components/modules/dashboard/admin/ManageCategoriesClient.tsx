"use client";

import { useState } from "react";
import { Category } from "@/types";
import CategoriesTable from "./CategoriesTable";
import { UpdateCategoryModal } from "./UpdateCategoryModal";
import { DeleteCategoryModal } from "./DeleteCategoryModal";

interface ManageCategoriesClientProps {
  categories: Category[];
}

export default function ManageCategoriesClient({
  categories,
}: ManageCategoriesClientProps) {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const handleEditInitiated = (category: Category) => {
    setSelectedCategory(category);
    setIsUpdateModalOpen(true);
  };

  const handleDeleteTrigger = (category: Category) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  return (
    <>
      <div className="overflow-hidden rounded-3xl border border-slate-200/70 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80 shadow-sm">
        <CategoriesTable
          categories={categories}
          onEdit={handleEditInitiated}
          onDelete={handleDeleteTrigger}
        />
      </div>

      {selectedCategory && (
        <>
          <UpdateCategoryModal
            key={`update-${selectedCategory.id}`}
            isOpen={isUpdateModalOpen}
            onOpenChange={setIsUpdateModalOpen}
            category={selectedCategory}
          />

          <DeleteCategoryModal
            key={`delete-${selectedCategory.id}`}
            isOpen={isDeleteModalOpen}
            onOpenChange={setIsDeleteModalOpen}
            categoryId={selectedCategory.id}
            categoryName={selectedCategory.name}
          />
        </>
      )}
    </>
  );
}
