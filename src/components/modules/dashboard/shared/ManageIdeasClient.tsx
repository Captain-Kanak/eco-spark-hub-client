"use client";

import { Category, Idea } from "@/types";
import React, { useState } from "react";
import { IdeaStatus, UserRole } from "@/types/enums";
import IdeasTable from "./IdeasTable";
import ViewIdeaModal from "./ViewIdeaModal";
import UpdateIdeaModal from "../member/idea/dialogs/UpdateIdeaModal";
import DeleteIdeaModal from "../member/idea/dialogs/DeleteIdeaModal";
import { toast } from "sonner";
import { updateIdeaStatusById } from "@/actions/idea";
import { useRouter } from "next/navigation";

interface ManageIdeasClientProps {
  role: UserRole;
  ideas: Idea[];
  categories: Category[];
  viewAsLink?: boolean;
}

export default function ManageIdeasClient({
  role,
  ideas,
  categories,
  viewAsLink = false,
}: ManageIdeasClientProps) {
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const isAdmin = role === UserRole.ADMIN;
  const isMember = role === UserRole.MEMBER;

  const router = useRouter();

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
    try {
      const result = await updateIdeaStatusById(idea.id, IdeaStatus.PUBLISHED);

      if (result.success) {
        toast.success("Idea approved successfully");
        setIsViewModalOpen(false);
        setIsUpdateModalOpen(false);
        setIsDeleteModalOpen(false);
        router.refresh();
      }
    } catch (error) {
      toast.error("Failed to approve idea");
    }
  };

  const handleReject = async (idea: Idea) => {
    try {
      const result = await updateIdeaStatusById(idea.id, IdeaStatus.REJECTED);

      if (result.success) {
        toast.success("Idea rejected successfully");
        setIsViewModalOpen(false);
        setIsUpdateModalOpen(false);
        setIsDeleteModalOpen(false);
        router.refresh();
      }
    } catch (error) {
      toast.error("Failed to reject idea");
    }
  };

  const handleArchive = async (idea: Idea) => {
    try {
      const result = await updateIdeaStatusById(idea.id, IdeaStatus.ARCHIVED);

      if (result.success) {
        toast.success("Idea archived successfully");
        setIsViewModalOpen(false);
        setIsUpdateModalOpen(false);
        setIsDeleteModalOpen(false);
        router.refresh();
      }
    } catch (error) {
      toast.error("Failed to archive idea");
    }
  };

  return (
    <>
      <IdeasTable
        ideas={ideas}
        onView={handleView}
        onEdit={isMember ? handleEdit : undefined}
        onDelete={isMember ? handleDelete : undefined}
        onArchive={isAdmin ? handleArchive : undefined}
        viewAsLink={viewAsLink}
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
