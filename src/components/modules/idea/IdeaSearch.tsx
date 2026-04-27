"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function IdeaSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("searchTerm") ?? "");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());
    value ? params.set("searchTerm", value) : params.delete("searchTerm");

    router.push(`/ideas?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col md:flex-row items-center gap-4 mb-10 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] shadow-sm">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search innovative ideas..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="pl-11 h-12 rounded-2xl border-none bg-slate-50 dark:bg-slate-800/50 focus-visible:ring-emerald-500"
          />
        </div>

        {/* Search Button */}
        <Button
          type="submit"
          className="rounded-full px-5 cursor-pointer hover:bg-green-500 hover:text-white transition-all duration-500"
        >
          Search
        </Button>
      </div>
    </form>
  );
}
