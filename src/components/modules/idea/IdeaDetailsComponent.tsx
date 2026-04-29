import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  CheckCircle2,
  Lightbulb,
  Lock,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IdeaDetailsComponentProps {
  idea: any;
  hasAccess: boolean;
  id: string;
}

export default function IdeaDetailsComponent({
  idea,
  hasAccess,
  id,
}: IdeaDetailsComponentProps) {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10">
      {/* Header / Back Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          asChild
          className="rounded-full gap-2 text-slate-500"
        >
          <Link href="/ideas">
            <ArrowLeft className="h-4 w-4" /> Back to Explore
          </Link>
        </Button>
        <div className="flex gap-2">
          {hasAccess && (
            <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-200 px-4 py-1 rounded-full font-bold">
              <CheckCircle2 className="h-3 w-3 mr-1" /> Full Access
            </Badge>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-tight">
            {idea.title}
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            {idea.description}
          </p>

          {!hasAccess && (
            <div className="p-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30 rounded-[2rem] space-y-4">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-black">
                <Sparkles className="h-5 w-5" />
                <span>Premium Content</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                This sustainability solution includes full implementation steps,
                technical specs, and resource links.
              </p>
              <Button
                asChild
                className="w-full h-14 bg-slate-900 dark:bg-white dark:text-slate-900 rounded-2xl font-black text-lg shadow-xl shadow-slate-200 dark:shadow-none"
              >
                <Link href={`/payments/${id}`}>Unlock for ${idea.price}</Link>
              </Button>
            </div>
          )}
        </div>

        <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white dark:border-slate-900">
          {idea.image ? (
            <Image
              src={idea.image}
              alt={idea.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-300">
              <Lightbulb className="h-20 w-20 opacity-20" />
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative">
        {!hasAccess && (
          <div className="absolute inset-0 z-10 backdrop-blur-xl bg-white/30 dark:bg-slate-950/40 flex flex-col items-center justify-center rounded-[3rem] border border-white/20">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl text-center space-y-4 max-w-sm mx-4 border border-slate-100 dark:border-slate-800">
              <div className="mx-auto w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                <Lock className="h-8 w-8 text-slate-400" />
              </div>
              <h2 className="text-2xl font-black">Content Locked</h2>
              <p className="text-slate-500 text-sm">
                Purchase this idea to view the full details and download
                resources.
              </p>
              <Button
                asChild
                variant="outline"
                className="w-full rounded-xl font-bold"
              >
                <Link href={`/payment/${id}`}>Get Lifetime Access</Link>
              </Button>
            </div>
          </div>
        )}

        <div className="bg-white dark:bg-slate-900/50 p-8 md:p-12 rounded-[3rem] border border-slate-100 dark:border-slate-800 min-h-100">
          <h2 className="text-2xl font-black mb-6">Solution Details</h2>
          <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-loose">
            {hasAccess ? (
              <div dangerouslySetInnerHTML={{ __html: idea.description }} />
            ) : (
              <div className="space-y-4 opacity-20 select-none">
                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                <div className="h-4 bg-slate-200 rounded w-full"></div>
                <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                <div className="h-4 bg-slate-200 rounded w-full"></div>
                <div className="h-4 bg-slate-200 rounded w-2/3"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
