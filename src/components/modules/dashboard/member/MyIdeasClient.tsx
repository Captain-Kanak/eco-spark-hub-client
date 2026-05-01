"use client";

import { Category, Idea } from "@/types";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import UpdateIdeaModal from "./UpdateIdeaModal";
import MyIdeaCard from "./MyIdeaCard";
import DeleteIdeaModal from "./DeleteIdeaModal";

export default function MyIdeasClient({
  ideas,
  categories,
}: {
  ideas: Idea[];
  categories: Category[];
}) {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);

  const handleEditInitiated = (idea: Idea) => {
    setSelectedIdea(idea);
    setIsUpdateModalOpen(true);
  };

  const handleDeleteTrigger = (idea: Idea) => {
    setSelectedIdea(idea);
    setIsDeleteModalOpen(true);
  };

  if (ideas.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-full shadow-xl mb-6">
          <Lightbulb className="h-12 w-12 text-emerald-500" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          No ideas yet
        </h2>
        <p className="text-slate-500 mt-2 mb-6 text-center max-w-sm">
          You haven't submitted any sustainable solutions. Ready to spark a
          change?
        </p>
        <Button
          asChild
          className="rounded-xl bg-emerald-600 hover:bg-emerald-700 font-bold px-8"
        >
          <Link href="/dashboard/create-idea">Create First Idea</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ideas?.map((idea) => (
          <MyIdeaCard
            key={idea.id}
            idea={idea}
            onEdit={handleEditInitiated}
            onDelete={handleDeleteTrigger}
          />
        ))}
      </div>

      {selectedIdea && (
        <>
          <UpdateIdeaModal
            isOpen={isUpdateModalOpen}
            onOpenChange={setIsUpdateModalOpen}
            idea={selectedIdea}
            categories={categories}
          />

          <DeleteIdeaModal
            isOpen={isDeleteModalOpen}
            onOpenChange={setIsDeleteModalOpen}
            ideaId={selectedIdea.id}
            ideaTitle={selectedIdea.title}
          />
        </>
      )}
    </>
  );
}
