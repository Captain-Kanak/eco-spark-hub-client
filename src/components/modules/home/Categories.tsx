"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Category } from "@/types";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Categories({ categories }: { categories: Category[] }) {
  const displayCategories = categories.slice(0, 6);

  return (
    <section className="py-32 bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header - Centered & Premium */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest">
            <Sparkles className="h-3 w-3" /> Taxonomy of Change
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white">
            The Innovation{" "}
            <span className="text-emerald-500 italic">Spheres.</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">
            A curated ecosystem of {categories.length} sustainability sectors,
            cataloged for rapid implementation and global impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {displayCategories.map((cat, index) => (
            <Link
              href={`/ideas?categoryId=${cat.id}`}
              key={cat.id}
              className={cn(
                "group relative block h-112.5 transition-all duration-500",
                index % 2 === 1 ? "md:translate-y-12" : "",
              )}
            >
              <div className="relative h-full w-full rounded-[3rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 shadow-xl group-hover:shadow-2xl transition-all duration-500">
                {/* Visual Area */}
                <div className="relative h-2/3 w-full rounded-[2.5rem] overflow-hidden">
                  <Image
                    src={cat?.icon || "/category-placeholder.jpg"}
                    alt={cat.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                  />
                  {/* Glassmorphism Badge inside image */}
                  <div className="absolute top-6 left-6 bg-black backdrop-blur-xl border border-white/30 px-4 py-2 rounded-2xl">
                    <span className="text-green-500 text-[10px] font-black tracking-tighter uppercase">
                      Sphere {index + 1}
                    </span>
                  </div>
                </div>

                {/* Text Content */}
                <div className="p-6 space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">
                      {cat.name}
                    </h3>
                    <div className="bg-emerald-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                      {cat._count?.ideas || 0} Ideas
                    </span>
                  </div>

                  <p className="text-slate-500 dark:text-slate-400 text-xs font-medium line-clamp-2 leading-relaxed opacity-80">
                    {cat.description ||
                      "Synthesizing new paradigms in sustainable technology and environmental resource management."}
                  </p>
                </div>

                {/* Bottom Interactive Glow */}
                <div className="absolute -bottom-2 inset-x-10 h-1 bg-emerald-500 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          ))}
        </div>

        {/* Global CTA */}
        {/* <div className="mt-32 text-center">
          <Link
            href="/categories"
            className="px-12 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-black uppercase text-xs tracking-[0.3em] hover:bg-emerald-600 dark:hover:bg-emerald-500 transition-all shadow-2xl"
          >
            Explore Full Catalog
          </Link>
        </div> */}
      </div>
    </section>
  );
}
