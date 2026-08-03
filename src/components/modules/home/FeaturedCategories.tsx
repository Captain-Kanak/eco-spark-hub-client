"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { Category } from "@/types";
import CategoryCard from "./CategoryCard";
import { Button } from "@/components/ui/button";

export default function FeaturedCategories({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <section className="relative overflow-hidden bg-background py-12 lg:py-18">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.08),transparent_60%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-0">
        {/* Header */}
        <div className="mb-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-emerald-600 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-400">
            <Sparkles className="h-3.5 w-3.5" />
            Explore Categories
          </div>

          <h2 className="mt-6 text-5xl font-black tracking-tight md:text-6xl">
            Innovation Domains
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-500">
            Browse ideas across the world's most impactful sustainability
            sectors.
          </p>
        </div>

        {/* Categories */}
        {categories.length > 0 ? (
          <div className="space-y-5">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-[2rem] border border-dashed border-slate-300 bg-slate-50/60 px-8 py-20 text-center dark:border-slate-700 dark:bg-slate-900/40">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
              <Sparkles className="h-10 w-10 text-emerald-600" />
            </div>

            <h3 className="text-3xl font-black text-slate-900 dark:text-white">
              No Categories Available
            </h3>

            <p className="mt-4 max-w-xl text-slate-600 dark:text-slate-400">
              Categories help organize environmental innovations into meaningful
              sectors. New categories will appear here as the platform grows.
            </p>

            <Button
              asChild
              className="mt-8 rounded-full bg-emerald-600 px-8 hover:bg-emerald-700"
            >
              <Link href="/categories">
                Browse Categories
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/categories"
            className="inline-flex items-center rounded-full bg-slate-900 px-8 py-4 font-semibold text-white transition hover:bg-emerald-600 dark:bg-white dark:text-slate-900 dark:hover:bg-emerald-500"
          >
            View All Categories
            <ArrowUpRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
