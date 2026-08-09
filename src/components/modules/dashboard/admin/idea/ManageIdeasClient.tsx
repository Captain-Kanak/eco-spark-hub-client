"use client";

import { Category, Idea } from "@/types";
import React, { useState } from "react";
import IdeasTable from "./IdeasTable";
import ViewIdeaModal from "./dialogs/ViewIdeaModal";
import DeleteIdeaModal from "./dialogs/DeleteIdeaModal";
import UpdateIdeaModal from "../../member/idea/dialogs/UpdateIdeaModal";

export default function ManageIdeasClient({
  ideas,
  categories,
}: {
  ideas: Idea[];
  categories: Category[];
}) {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);

  const handleViewInitiated = (idea: Idea) => {
    setSelectedIdea(idea);
    setIsViewModalOpen(true);
  };

  const handleEditInitiated = (idea: Idea) => {
    setSelectedIdea(idea);
    setIsUpdateModalOpen(true);
  };

  const handleDeleteTrigger = (idea: Idea) => {
    setSelectedIdea(idea);
    setIsDeleteModalOpen(true);
  };

  return (
    <>
      <div>
        <IdeasTable
          ideas={ideas}
          onView={handleViewInitiated}
          onEdit={handleEditInitiated}
          onDelete={handleDeleteTrigger}
        />
      </div>

      {selectedIdea && (
        <>
          <ViewIdeaModal
            key={`view-${selectedIdea.id}`}
            isOpen={isViewModalOpen}
            onOpenChange={setIsViewModalOpen}
            idea={selectedIdea}
          />

          <UpdateIdeaModal
            key={`update-${selectedIdea.id}`}
            isOpen={isUpdateModalOpen}
            onOpenChange={setIsUpdateModalOpen}
            categories={categories}
            idea={selectedIdea}
          />

          <DeleteIdeaModal
            key={`delete-${selectedIdea.id}`}
            isOpen={isDeleteModalOpen}
            onOpenChange={setIsDeleteModalOpen}
            idea={selectedIdea}
          />
        </>
      )}
    </>
  );
}
