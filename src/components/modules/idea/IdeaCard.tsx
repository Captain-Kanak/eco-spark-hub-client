"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Eye,
  Heart,
  MessageCircle,
  Lightbulb,
  MapPin,
} from "lucide-react";

import { Idea } from "@/types";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function IdeaCard({ idea }: { idea: Idea }) {
  const current = Number(idea.currentFunding);
  const goal = Number(idea.fundingGoal);

  const progress = goal > 0 ? Math.min((current / goal) * 100, 100) : 0;

  return (
    <Link href={`/ideas/${idea.slug}`} className="group block">
      <Card className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-0 transition-all duration-500 hover:-translate-y-2 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-500/10 dark:border-slate-800 dark:bg-slate-900">
        {/* ================= IMAGE ================= */}

        <div className="relative aspect-16/10 overflow-hidden">
          {idea.coverImage ? (
            <Image
              src={idea.coverImage}
              alt={idea.title}
              fill
              sizes="(max-width:768px)100vw,(max-width:1200px)50vw,33vw"
              className="object-cover transition duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-slate-100 dark:bg-slate-800">
              <Lightbulb className="h-14 w-14 text-slate-400" />
            </div>
          )}

          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

          {/* Category */}

          {idea.category && (
            <Badge className="absolute left-5 top-5 rounded-full bg-white/90 text-slate-900 backdrop-blur">
              {idea.category.name}
            </Badge>
          )}

          {/* Status */}

          <Badge className="absolute right-5 top-5 rounded-full bg-emerald-500 text-white">
            {idea.status}
          </Badge>

          {/* Title */}

          <div className="absolute bottom-5 left-5 right-5">
            <h3 className="line-clamp-2 text-2xl font-bold text-white">
              {idea.title}
            </h3>
          </div>
        </div>

        {/* ================= CONTENT ================= */}

        <div className="space-y-6 p-6">
          <p className="line-clamp-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
            {idea.description}
          </p>

          {/* Funding */}

          <div className="space-y-3">
            <div className="flex justify-between text-sm font-semibold">
              <span>Funding Progress</span>

              <span>{progress.toFixed(0)}%</span>
            </div>

            <Progress value={progress} className="h-2" />

            <div className="flex justify-between text-sm">
              <div>
                <p className="font-bold text-emerald-600">
                  ${current.toLocaleString()}
                </p>

                <span className="text-slate-500">Raised</span>
              </div>

              <div className="text-right">
                <p className="font-bold">${goal.toLocaleString()}</p>

                <span className="text-slate-500">Goal</span>
              </div>
            </div>
          </div>

          {/* Stats */}

          <div className="flex items-center justify-between border-y border-slate-100 py-4 dark:border-slate-800">
            <div className="flex items-center gap-1 text-sm text-slate-500">
              <Heart className="h-4 w-4 text-rose-500" />
              {idea._count.likes}
            </div>

            <div className="flex items-center gap-1 text-sm text-slate-500">
              <MessageCircle className="h-4 w-4 text-blue-500" />
              {idea._count.comments}
            </div>

            <div className="flex items-center gap-1 text-sm text-slate-500">
              <Eye className="h-4 w-4 text-emerald-500" />
              {idea.views}
            </div>
          </div>

          {/* Footer */}

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">
                {idea.user?.name ?? "Anonymous"}
              </p>

              <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                <MapPin className="h-3 w-3" />

                {idea.location}
              </div>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 transition-all duration-300 group-hover:bg-emerald-500 dark:bg-slate-800">
              <ArrowUpRight className="h-5 w-5 transition-all duration-300 group-hover:rotate-45 group-hover:text-white" />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
