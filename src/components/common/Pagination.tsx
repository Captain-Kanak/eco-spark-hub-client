"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PaginationMeta } from "@/types";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Pagination({ meta }: { meta: PaginationMeta }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { currentPage, totalPages } = meta;

  if (totalPages <= 1) return null;

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;

    const params = new URLSearchParams(searchParams.toString());

    params.set("page", page.toString());

    router.push(`?${params.toString()}`);
  };

  const generatePages = () => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }

      return pages;
    }

    pages.push(1);

    if (currentPage > 4) {
      pages.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 3) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  return (
    <div className="mt-16 flex flex-col items-center gap-6">
      {/* Info */}
      <p className="text-sm text-muted-foreground">
        Showing page{" "}
        <span className="font-semibold text-foreground">{currentPage}</span> of{" "}
        <span className="font-semibold text-foreground">{totalPages}</span>
      </p>

      {/* Pagination */}
      <div className="relative z-100 mt-4 flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-xl cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {generatePages().map((page, index) =>
          page === "..." ? (
            <div
              key={index}
              className="flex h-10 w-10 items-center justify-center"
            >
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            </div>
          ) : (
            <Button
              key={page}
              onClick={() => handlePageChange(page)}
              variant={page === currentPage ? "default" : "ghost"}
              className={cn(
                "h-10 w-10 rounded-xl font-semibold cursor-pointer transition-all",
                page === currentPage &&
                  "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20",
              )}
            >
              {page}
            </Button>
          ),
        )}

        <Button
          variant="outline"
          size="icon"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded-xl cursor-pointer"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
