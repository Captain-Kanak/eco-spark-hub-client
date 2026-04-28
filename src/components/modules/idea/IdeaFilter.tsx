"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowDownAZ,
  CalendarClock,
  History,
  ArrowUpNarrowWide,
  ArrowDownWideNarrow,
  ListFilter,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function IdeaFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sortBy = searchParams.get("sortBy") ?? "createdAt";
  const sortOrder = searchParams.get("sortOrder") ?? "desc";
  const current = `${sortBy}:${sortOrder}`;

  const onChange = (value: string) => {
    const [newSortBy, newSortOrder] = value.split(":");
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", newSortBy);
    params.set("sortOrder", newSortOrder);
    router.push(`/ideas?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center gap-3">
      <Select value={current} onValueChange={onChange}>
        <SelectTrigger
          className={cn(
            "w-50 h-12 rounded-2xl border-none shadow-sm",
            "bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100",
            "transition-all hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer",
          )}
        >
          <div className="flex items-center gap-2">
            <ListFilter className="h-4 w-4 text-emerald-600" />
            <SelectValue placeholder="Sort ideas" />
          </div>
        </SelectTrigger>

        <SelectContent
          className={cn(
            "rounded-2xl p-1 shadow-2xl",
            "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800",
          )}
        >
          <SelectItem
            value="createdAt:desc"
            className="rounded-xl focus:bg-emerald-50 focus:text-emerald-700 dark:text-slate-200 dark:focus:bg-slate-800 dark:focus:text-emerald-400 cursor-pointer"
          >
            <div className="flex items-center gap-2 py-1">
              <CalendarClock className="h-4 w-4" />
              <span className="font-medium">Latest Ideas</span>
            </div>
          </SelectItem>

          <SelectItem
            value="createdAt:asc"
            className="rounded-xl focus:bg-emerald-50 focus:text-emerald-700 dark:text-slate-200 dark:focus:bg-slate-800 dark:focus:text-emerald-400 cursor-pointer"
          >
            <div className="flex items-center gap-2 py-1">
              <History className="h-4 w-4" />
              <span className="font-medium">Oldest First</span>
            </div>
          </SelectItem>

          <SelectItem
            value="price:asc"
            className="rounded-xl focus:bg-emerald-50 focus:text-emerald-700 dark:text-slate-200 dark:focus:bg-slate-800 dark:focus:text-emerald-400 cursor-pointer"
          >
            <div className="flex items-center gap-2 py-1">
              <ArrowUpNarrowWide className="h-4 w-4" />
              <span className="font-medium">Price: Low to High</span>
            </div>
          </SelectItem>

          <SelectItem
            value="price:desc"
            className="rounded-xl focus:bg-emerald-50 focus:text-emerald-700 dark:text-slate-200 dark:focus:bg-slate-800 dark:focus:text-emerald-400 cursor-pointer"
          >
            <div className="flex items-center gap-2 py-1">
              <ArrowDownWideNarrow className="h-4 w-4" />
              <span className="font-medium">Price: High to Low</span>
            </div>
          </SelectItem>

          <SelectItem
            value="name:asc"
            className="rounded-xl focus:bg-emerald-50 focus:text-emerald-700 dark:text-slate-200 dark:focus:bg-slate-800 dark:focus:text-emerald-400 cursor-pointer"
          >
            <div className="flex items-center gap-2 py-1">
              <ArrowDownAZ className="h-4 w-4" />
              <span className="font-medium">Title: A–Z</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
