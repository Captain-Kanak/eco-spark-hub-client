"use client";

import { Idea } from "@/types";
import React, { useState } from "react";
import IdeasTable from "./IdeasTable";
import ViewIdeaModal from "./dialogs/ViewIdeaModal";

export default function ManageIdeasClient({ ideas }: { ideas: Idea[] }) {
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
        </>
      )}
    </>
  );
}
