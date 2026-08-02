"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Category } from "@/types";

export default function Categories({ categories }: { categories: Category[] }) {
  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-28">
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
        <div className="space-y-5">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/ideas?categoryId=${cat.id}`}
              className="group block"
            >
              <div className="flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-500/10 dark:border-slate-800 dark:bg-slate-900 md:flex-row">
                {/* Image */}
                <div className="relative h-56 md:h-auto md:w-80 shrink-0 overflow-hidden">
                  <Image
                    src={cat.icon || "/category-placeholder.jpg"}
                    alt={cat.name}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 380px"
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-black/20" />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between p-8">
                  <div>
                    <div className="mb-4 flex items-center gap-3">
                      <span className="text-sm text-slate-400">
                        {cat._count?.ideas || 0} Ideas
                      </span>
                    </div>

                    <h3 className="text-4xl font-black tracking-tight">
                      {cat.name}
                    </h3>

                    <p className="mt-5 max-w-2xl leading-8 text-slate-500">
                      {cat.description ||
                        "Discover innovative environmental projects, funding opportunities, and real-world sustainable solutions from creators around the globe."}
                    </p>
                  </div>

                  <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6 dark:border-slate-800">
                    <span className="font-semibold text-emerald-600">
                      Explore Ideas
                    </span>

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 transition duration-300 group-hover:bg-emerald-500 dark:bg-slate-800">
                      <ArrowUpRight className="h-5 w-5 transition duration-300 group-hover:rotate-45 group-hover:text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

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
