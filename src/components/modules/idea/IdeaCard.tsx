"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Idea } from "@/types";
import { ArrowRight, Lightbulb, Lock, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function IdeaCard({ idea }: { idea: Idea }) {
  return (
    <Card className="group relative overflow-hidden rounded-[2.5rem] border-none shadow-xl bg-white dark:bg-slate-900 transition-all hover:shadow-2xl hover:-translate-y-1">
      {/* Header Image / Lock Overlay */}
      <div className="relative aspect-16/10 overflow-hidden">
        {idea.image ? (
          <Image
            src={idea.image}
            alt={idea.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <Lightbulb className="h-10 w-10 mb-2 opacity-20" />
            <span className="text-xs font-medium">No Preview Available</span>
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge
            className={cn(
              "rounded-full px-4 py-1 font-bold",
              idea.isPaid
                ? "bg-amber-500 text-white"
                : "bg-emerald-500 text-white",
            )}
          >
            {idea.isPaid ? "PREMIUM" : "FREE"}
          </Badge>
        </div>

        {/* Lock Icon for Paid Content */}
        {idea.isPaid && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/30 shadow-2xl">
              <Lock className="h-8 w-8 text-white" />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <CardHeader className="p-6 pb-0">
        {/* <div className="text-xs font-bold text-emerald-600 mb-2 uppercase tracking-widest">
              {idea.category?.name || "Innovation"}
            </div> */}
        <h3 className="text-xl font-black text-slate-900 dark:text-white line-clamp-1">
          {idea.title}
        </h3>
      </CardHeader>

      <CardContent className="p-6 pt-2">
        <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-3 leading-relaxed">
          {idea.description}
        </p>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        {idea.isPaid ? (
          <Button
            asChild
            className="w-full h-12 bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 rounded-xl font-bold group/btn"
          >
            <Link href={`/ideas/${idea.id}`}>
              Get Access for ${idea.price}
              <Sparkles className="ml-2 h-4 w-4 text-amber-400" />
            </Link>
          </Button>
        ) : (
          <Button
            variant="outline"
            asChild
            className="w-full h-12 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-xl font-bold transition-all"
          >
            <Link href={`/ideas/${idea.id}`}>
              View Details
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
