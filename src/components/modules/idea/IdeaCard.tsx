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
import {
  Lightbulb,
  Lock,
  Eye,
  Sparkles,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface IdeaCardProps {
  idea: Idea;
  isPurchased?: boolean;
  owner: boolean;
}

export default function IdeaCard({ idea, isPurchased, owner }: IdeaCardProps) {
  // Logic to determine the badge status
  const showPurchased = isPurchased || owner;

  return (
    <Card className="group relative overflow-hidden rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl bg-white dark:bg-slate-950 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(16,185,129,0.1)] hover:-translate-y-2">
      {/* Background Glow Effect - Visible on Hover */}
      <div className="absolute -inset-full group-hover:inset-0 bg-linear-to-br from-emerald-500/5 via-transparent to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Image Container with Inset padding for "Card-in-Card" look */}
      <div className="relative aspect-16/10 overflow-hidden m-3 rounded-[2.5rem] bg-slate-100 dark:bg-slate-900">
        {idea.image ? (
          <Image
            src={idea.image}
            alt={idea.title}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <Lightbulb className="h-12 w-12 mb-2 opacity-20 animate-pulse" />
          </div>
        )}

        {/* Dynamic Status Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
          {showPurchased ? (
            <Badge className="bg-emerald-500/90 backdrop-blur-md text-white border-none shadow-xl px-5 py-2 rounded-full font-black text-[10px] tracking-[0.15em] flex items-center gap-2">
              <CheckCircle2 className="h-3 w-3" />{" "}
              {owner ? "OWNED" : "PURCHASED"}
            </Badge>
          ) : (
            <Badge
              className={cn(
                "rounded-full px-5 py-2 font-black text-[10px] tracking-[0.15em] shadow-xl border-none backdrop-blur-md",
                idea.isPaid
                  ? "bg-amber-500/90 text-white"
                  : "bg-emerald-500/90 text-white",
              )}
            >
              {idea.isPaid ? (
                <span className="flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3 fill-white" /> PREMIUM
                </span>
              ) : (
                "FREE"
              )}
            </Badge>
          )}
        </div>

        {/* Fancy Glass Lock Overlay */}
        {idea.isPaid && !showPurchased && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/40 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div className="bg-white/20 backdrop-blur-2xl p-5 rounded-full border border-white/30 shadow-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <Lock className="h-7 w-7 text-white" />
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <CardHeader className="px-7 pt-4 pb-2">
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-2xl font-black text-slate-900 dark:text-slate-50 line-clamp-1 tracking-tight">
            {idea.title}
          </h3>
          {idea.isPaid && !showPurchased && (
            <div className="px-3 py-1 bg-emerald-500/10 rounded-lg">
              <span className="text-emerald-600 dark:text-emerald-400 font-black text-lg italic">
                ${idea.price}
              </span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="px-7">
        <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 font-medium leading-relaxed italic">
          "{idea.description}"
        </p>
      </CardContent>

      <CardFooter className="px-7 pb-8 pt-4">
        <div className="w-full relative z-10">
          {showPurchased ? (
            <Button
              asChild
              className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[1.5rem] font-black transition-all duration-300 shadow-lg shadow-emerald-500/20"
            >
              <Link
                href={`/ideas/${idea.id}`}
                className="flex items-center justify-center gap-2"
              >
                <Eye className="h-5 w-5" /> Open Access
              </Link>
            </Button>
          ) : idea.isPaid ? (
            <Button
              asChild
              className="w-full h-14 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-emerald-600 dark:hover:bg-emerald-500 dark:hover:text-white rounded-[1.5rem] font-black transition-all duration-300 group/btn"
            >
              <Link
                href={`/payments/${idea.id}`}
                className="flex items-center justify-center gap-2"
              >
                Unlock Solution{" "}
                <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </Button>
          ) : (
            <Button
              asChild
              variant="outline"
              className="w-full h-14 rounded-[1.5rem] font-black border-2 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all text-slate-600 dark:text-slate-300"
            >
              <Link href={`/ideas/${idea.id}`}>Explore Free Idea</Link>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
