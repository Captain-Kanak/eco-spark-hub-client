import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Idea } from "@/types";
import React from "react";
import IdeaActions from "./IdeaActions";

export default function ManageIdeasClient({ ideas }: { ideas: Idea[] }) {
  return (
    <div>
      {ideas.map((idea: Idea, index) => (
        <Card
          key={idea.id}
          className="p-6 rounded-[2rem] border-slate-200 flex items-center justify-between group hover:border-emerald-200 transition-colors"
        >
          <div className="text-2xl font-bold text-slate-400">#{index + 1}</div>
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h3 className="font-bold text-lg">{idea.title}</h3>
              <Badge
                variant="secondary"
                className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none"
              >
                Pending
              </Badge>
            </div>
            <p className="text-sm text-slate-500 line-clamp-1 max-w-md">
              {idea.description}
            </p>
            <div className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
              Submitted by {idea.user?.name || "Anonymous"}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Component to handle the Server Action call */}
            <IdeaActions ideaId={idea.id} />
          </div>
        </Card>
      ))}
    </div>
  );
}
