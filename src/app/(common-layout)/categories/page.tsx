import { getCategories } from "@/actions/category";
import Pagination from "@/components/common/Pagination";
import CategoryCard from "@/components/modules/home/CategoryCard";
import { Button } from "@/components/ui/button";
import { SearchQueryParams } from "@/types";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: Promise<SearchQueryParams>;
}) {
  const params = await searchParams;

  const page = params.page || "1";
  const limit = "5";
  const searchTerm = params.searchTerm || "";

  const { data: categories, meta } = await getCategories({
    page,
    limit,
    searchTerm,
  });

  return (
    <section className="relative overflow-hidden bg-background py-14">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.08),transparent_60%)]" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb20_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb20_1px,transparent_1px)] bg-size-[70px_70px] dark:bg-[linear-gradient(to_right,#1e293b40_1px,transparent_1px),linear-gradient(to_bottom,#1e293b40_1px,transparent_1px)]" />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-4 lg:px-0">
        {/* Header */}
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-emerald-600 dark:border-emerald-900/40 dark:bg-emerald-950/20 dark:text-emerald-400">
            <Sparkles className="h-4 w-4" />
            Explore Categories
          </div>

          <h1 className="mt-6 text-5xl font-black tracking-tight text-slate-900 dark:text-white md:text-7xl">
            Sustainability
            <span className="text-emerald-500 italic"> Categories</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
            Browse environmental innovation across different sectors and
            discover ideas that are creating a greener future.
          </p>
        </div>

        {/* Categories */}
        {categories && categories.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-[2rem] border border-dashed border-slate-300 bg-slate-50/60 px-8 py-24 text-center dark:border-slate-700 dark:bg-slate-900/40">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
              <Sparkles className="h-10 w-10 text-emerald-600" />
            </div>

            <h3 className="text-3xl font-black text-slate-900 dark:text-white">
              No Categories Found
            </h3>

            <p className="mt-4 max-w-xl text-slate-600 dark:text-slate-400">
              Categories organize environmental innovations into meaningful
              sectors. They will appear here once they are created.
            </p>

            <Button
              asChild
              className="mt-8 rounded-full bg-emerald-600 px-8 hover:bg-emerald-700"
            >
              <Link href="/">
                Back to Home
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>

      {meta && <Pagination meta={meta} />}
    </section>
  );
}
