"use client";

import { useState } from "react";
import { Category } from "@/types";
import CategoriesTable from "./CategoriesTable";
import { UpdateCategoryModal } from "./UpdateCategoryModal";

interface ManageCategoriesClientProps {
  categories: Category[];
}

export default function ManageCategoriesClient({
  categories,
}: ManageCategoriesClientProps) {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const handleEditInitiated = (category: Category) => {
    setSelectedCategory(category);
    setIsUpdateModalOpen(true);
  };

  return (
    <>
      <CategoriesTable categories={categories} onEdit={handleEditInitiated} />

      {selectedCategory && (
        <UpdateCategoryModal
          key={selectedCategory.id}
          isOpen={isUpdateModalOpen}
          onOpenChange={setIsUpdateModalOpen}
          category={selectedCategory}
        />
      )}
    </>
  );
}
