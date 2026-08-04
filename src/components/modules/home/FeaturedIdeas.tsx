"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Idea } from "@/types";
import IdeaCard from "../idea/IdeaCard";

export default function FeaturedIdeas({ ideas }: { ideas: Idea[] }) {
  return (
    <section className="relative overflow-hidden bg-background py-14 lg:py-18">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-0 h-125 w-125 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[140px]" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb18_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb18_1px,transparent_1px)] bg-size-[70px_70px] dark:bg-[linear-gradient(to_right,#1e293b40_1px,transparent_1px),linear-gradient(to_bottom,#1e293b40_1px,transparent_1px)]" />
      </div>

      <div className="container relative mx-auto max-w-7xl px-4 lg:px-0">
        {/* Header */}
        <div className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 dark:border-emerald-900/40 dark:bg-emerald-950/30">
              <Sparkles className="h-4 w-4 text-emerald-600" />

              <span className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-600">
                Featured Ideas
              </span>
            </div>

            <h2 className="text-4xl font-black tracking-tight text-slate-900 md:text-6xl dark:text-white">
              Ideas Making
              <span className="block text-emerald-500">
                Real Environmental Impact
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-400">
              Explore community-backed sustainability projects that are solving
              real-world environmental challenges across the globe.
            </p>
          </div>

          <Button
            asChild
            variant="outline"
            className="h-12 rounded-full px-6 font-semibold transition-all hover:border-emerald-500 hover:bg-emerald-500 hover:text-white"
          >
            <Link href="/ideas">
              View All Ideas
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Cards */}
        {ideas.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {ideas.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-[2rem] border border-dashed border-slate-300 bg-slate-50/60 px-8 py-24 text-center dark:border-slate-700 dark:bg-slate-900/40">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
              <Sparkles className="h-10 w-10 text-emerald-600" />
            </div>

            <h3 className="text-3xl font-black text-slate-900 dark:text-white">
              No Ideas Available Yet
            </h3>

            <p className="mt-4 max-w-xl text-slate-600 dark:text-slate-400">
              The community is just getting started. Be the first innovator to
              publish an environmental idea and inspire people around the world.
            </p>

            <Button
              asChild
              className="mt-8 rounded-full bg-emerald-600 px-8 hover:bg-emerald-700"
            >
              <Link href="/dashboard/create-idea">
                Submit the First Idea
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-20 rounded-[2rem] border border-slate-200 bg-white/80 p-8 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/60">
          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
            <div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                Have an environmental solution?
              </h3>

              <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-400">
                Publish your idea, connect with supporters, and secure funding
                to transform your vision into measurable environmental impact.
              </p>
            </div>

            <Button
              asChild
              size="lg"
              className="rounded-full bg-emerald-600 px-8 hover:bg-emerald-700"
            >
              <Link href="/dashboard/create-idea">
                Submit Your Idea
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
