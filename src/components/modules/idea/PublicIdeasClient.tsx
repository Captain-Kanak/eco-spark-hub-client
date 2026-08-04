"use client";

import { Idea } from "@/types";
import IdeaCard from "./IdeaCard";
import { Lightbulb, X } from "lucide-react";
import IdeaSearch from "./IdeaSearch";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import IdeaFilter from "./IdeaFilter";

export default function PublicIdeasClient({ ideas }: { ideas: Idea[] }) {
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
          {/* ================= Toolbar ================= */}
          <div className="mb-12 rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
              {/* Search */}

              <div className="flex-1">
                <IdeaSearch />
              </div>

              {/* Right Controls */}

              <div className="flex items-center gap-3">
                <IdeaFilter />

                <Button
                  variant="outline"
                  asChild
                  className="h-12 rounded-xl border-slate-200 px-5 hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-slate-700 dark:hover:border-red-900 dark:hover:bg-red-950/20"
                >
                  <Link href="/ideas">
                    Clear
                    <X className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ideas?.map((idea) => {
              return <IdeaCard key={idea.id} idea={idea} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
