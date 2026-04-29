"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Idea } from "@/types";

interface PurchasedIdeaCardProps {
  idea: Idea;
}

export default function PurchasedIdeaCard({ idea }: PurchasedIdeaCardProps) {
  return (
    <div className="group relative bg-white dark:bg-slate-900 rounded-[2.5rem] p-4 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden">
      <div className="relative aspect-16/10 w-full overflow-hidden rounded-[2rem] bg-slate-100 dark:bg-slate-800">
        {idea.image ? (
          <Image
            src={idea.image}
            alt={idea.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-300">
            <Leaf className="h-12 w-12 opacity-20" />
          </div>
        )}

        <div className="absolute top-4 left-4">
          <Badge className="bg-emerald-500/90 hover:bg-emerald-500 text-white backdrop-blur-md border-none px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">
            Purchased
          </Badge>
        </div>
      </div>

      <div className="mt-6 px-2 space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-black text-slate-900 dark:text-white line-clamp-1 leading-none">
            {idea.title}
          </h3>
        </div>

        <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 font-medium leading-relaxed">
          {idea.description}
        </p>

        <div className="pt-4 flex items-center gap-3">
          <Button
            asChild
            className="flex-1 h-12 rounded-2xl bg-slate-900 dark:bg-white dark:text-slate-900 font-bold hover:bg-emerald-600 dark:hover:bg-emerald-500 dark:hover:text-white transition-all duration-300"
          >
            <Link href={`/ideas/${idea.id}`}>
              <Eye className="mr-2 h-4 w-4" /> View Solution
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
