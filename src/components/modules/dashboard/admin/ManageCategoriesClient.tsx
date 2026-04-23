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
      <CategoriesTable
        categories={categories}
        onEdit={handleEditInitiated}
        onDelete={handleDeleteTrigger}
      />

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
