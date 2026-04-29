"use client";

import { Idea } from "@/types";
import IdeaCard from "./IdeaCard";
import { Lightbulb, X } from "lucide-react";
import IdeaSearch from "./IdeaSearch";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import IdeaFilter from "./IdeaFilter";

interface PublicIdeasClientProps {
  ideas: Idea[];
  purchasedIds: Set<string>;
  userId: string;
}

export default function PublicIdeasClient({
  ideas,
  purchasedIds,
  userId,
}: PublicIdeasClientProps) {
  return (
    <div>
      {ideas.length === 0 ? (
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
      ) : (
        <div>
          <div className="w-full max-w-5xl mx-auto mb-10">
            <div className="flex flex-row items-center gap-3 w-full">
              {/* Search takes up the available space */}
              <IdeaSearch />

              {/* Filter stays at its intrinsic width */}
              <div className="shrink-0">
                <IdeaFilter />
              </div>

              {/* Reset button */}
              <Button
                variant="outline"
                asChild
                className="shrink-0 rounded-full border-slate-200 dark:border-slate-800 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 h-12 px-6"
              >
                <Link
                  href="/ideas"
                  className="flex items-center gap-2 font-bold"
                >
                  Clear <X className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ideas?.map((idea) => {
              const isAlreadyPurchased = purchasedIds.has(idea.id);
              const isOwner = idea.userId === userId;

              return (
                <IdeaCard
                  key={idea.id}
                  idea={idea}
                  isPurchased={isAlreadyPurchased}
                  owner={isOwner}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
