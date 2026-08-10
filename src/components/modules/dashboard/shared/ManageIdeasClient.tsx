"use client";

import { Category, Idea } from "@/types";
import React, { useState } from "react";
import { UserRole } from "@/types/enums";
import IdeasTable from "../admin/idea/IdeasTable";
import ViewIdeaModal from "../admin/idea/dialogs/ViewIdeaModal";
import DeleteIdeaModal from "../admin/idea/dialogs/DeleteIdeaModal";
import UpdateIdeaModal from "../member/idea/dialogs/UpdateIdeaModal";

interface ManageIdeasClientProps {
  role: UserRole;
  ideas: Idea[];
  categories: Category[];
}

export default function ManageIdeasClient({
  role,
  ideas,
  categories,
}: ManageIdeasClientProps) {
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const isMember = role === UserRole.MEMBER;

  const handleView = (idea: Idea) => {
    setSelectedIdea(idea);
    setIsViewModalOpen(true);
  };

  const handleEdit = (idea: Idea) => {
    if (!isMember) return;

    setSelectedIdea(idea);
    setIsUpdateModalOpen(true);
  };

  const handleDelete = (idea: Idea) => {
    if (!isMember) return;

    setSelectedIdea(idea);
    setIsDeleteModalOpen(true);
  };

  return (
    <>
      <IdeasTable
        ideas={ideas}
        onView={handleView}
        onEdit={isMember ? handleEdit : undefined}
        onDelete={isMember ? handleDelete : undefined}
      />

      {selectedIdea && (
        <>
          {/* View - available for both Admin and Member */}
          <ViewIdeaModal
            key={`view-${selectedIdea.id}`}
            isOpen={isViewModalOpen}
            onOpenChange={setIsViewModalOpen}
            idea={selectedIdea}
          />

          {/* Edit - Member only */}
          {isMember && (
            <UpdateIdeaModal
              key={`update-${selectedIdea.id}`}
              isOpen={isUpdateModalOpen}
              onOpenChange={setIsUpdateModalOpen}
              categories={categories}
              idea={selectedIdea}
            />
          )}

          {/* Delete - Member only */}
          {isMember && (
            <DeleteIdeaModal
              key={`delete-${selectedIdea.id}`}
              isOpen={isDeleteModalOpen}
              onOpenChange={setIsDeleteModalOpen}
              idea={selectedIdea}
            />
          )}
        </>
      )}
    </>
  );
}
