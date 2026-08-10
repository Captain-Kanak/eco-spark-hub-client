"use client";

import { Category, Idea } from "@/types";
import React, { useState } from "react";
import { UserRole } from "@/types/enums";
import IdeasTable from "../admin/idea/IdeasTable";
import ViewIdeaModal from "./ViewIdeaModal";
import UpdateIdeaModal from "../member/idea/dialogs/UpdateIdeaModal";
import DeleteIdeaModal from "../member/idea/dialogs/DeleteIdeaModal";
import { toast } from "sonner";

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

  const handleApprove = async (idea: Idea) => {
    // API call to change status
    console.log("Approve:", idea.id);

    toast.info("Approve button clicked");
  };

  const handleReject = async (idea: Idea) => {
    // API call to change status
    console.log("Reject:", idea.id);

    toast.info("Reject button clicked");
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
            role={role}
            isOpen={isViewModalOpen}
            onOpenChange={setIsViewModalOpen}
            idea={selectedIdea}
            onApprove={handleApprove}
            onReject={handleReject}
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
              ideaId={selectedIdea.id}
              ideaTitle={selectedIdea.title}
            />
          )}
        </>
      )}
    </>
  );
}
