"use client";

import { Idea } from "@/types";
import IdeaCard from "./IdeaCard";
import { Lightbulb } from "lucide-react";

export default function PublicIdeasClient({ ideas }: { ideas: Idea[] }) {
  return (
    <div>
      {ideas.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-full shadow-xl mb-6">
            <Lightbulb className="h-12 w-12 text-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            No ideas yet
          </h2>
          <p className="text-slate-500 mt-1">
            Join the community in sharing and discovering solutions for a
            greener future.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {ideas?.map((idea) => (
          <IdeaCard key={idea.id} idea={idea} />
        ))}
      </div>
    </div>
  );
}
