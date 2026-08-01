"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Idea } from "@/types";
import { Lightbulb } from "lucide-react";
import Image from "next/image";

interface IdeaCardProps {
  idea: Idea;
  isPurchased?: boolean;
  owner: boolean;
}

export default function IdeaCard({ idea }: IdeaCardProps) {
  return (
    <Card className="group relative overflow-hidden rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl bg-white dark:bg-slate-950 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(16,185,129,0.1)] hover:-translate-y-2">
      {/* Background Glow Effect - Visible on Hover */}
      <div className="absolute -inset-full group-hover:inset-0 bg-linear-to-br from-emerald-500/5 via-transparent to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Image Container with Inset padding for "Card-in-Card" look */}
      <div className="relative aspect-16/10 overflow-hidden m-3 rounded-[2.5rem] bg-slate-100 dark:bg-slate-900">
        {idea.coverImage ? (
          <Image
            src={idea.coverImage}
            alt={idea.title}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <Lightbulb className="h-12 w-12 mb-2 opacity-20 animate-pulse" />
          </div>
        )}
      </div>

      {/* Content Section */}
      <CardHeader className="px-7 pt-4 pb-2"></CardHeader>

      <CardContent className="px-7">
        <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 font-medium leading-relaxed italic">
          "{idea.description}"
        </p>
      </CardContent>

      <CardFooter className="px-7 pb-8 pt-4"></CardFooter>
    </Card>
  );
}
