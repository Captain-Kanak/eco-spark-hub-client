"use client";

import { Idea } from "@/types";
import IdeaCard from "./IdeaCard";

export default function PublicIdeasClient({ ideas }: { ideas: Idea[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {ideas?.map((idea) => (
        <IdeaCard key={idea.id} idea={idea} />
      ))}
    </div>
  );
}
