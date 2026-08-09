"use client";

import { Category, Idea } from "@/types";
import React, { useState } from "react";
import IdeasTable from "../admin/idea/IdeasTable";
import ViewIdeaModal from "../admin/idea/dialogs/ViewIdeaModal";
import DeleteIdeaModal from "../admin/idea/dialogs/DeleteIdeaModal";
import UpdateIdeaModal from "../member/idea/dialogs/UpdateIdeaModal";
import { UserRole } from "@/types/enums";

export default function ManageIdeasClient({
  role,
  ideas,
  categories,
}: {
  role: UserRole;
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
          onEdit={role === UserRole.MEMBER ? handleEditInitiated : undefined}
          onDelete={role === UserRole.MEMBER ? handleDeleteTrigger : undefined}
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
