import { Category } from "@/types";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link href={`/ideas?categoryId=${category.id}`} className="group block">
      <div className="flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-500/10 dark:border-slate-800 dark:bg-slate-900 md:flex-row">
        {/* Image */}
        <div className="relative h-56 md:h-auto md:w-80 shrink-0 overflow-hidden">
          <Image
            src={category.icon || "/category-placeholder.jpg"}
            alt={category.name}
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
                {category._count?.ideas || 0} Ideas
              </span>
            </div>

            <h3 className="text-4xl font-black tracking-tight">
              {category.name}
            </h3>

            <p className="mt-5 max-w-2xl leading-8 text-slate-500">
              {category.description ||
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
  );
}
