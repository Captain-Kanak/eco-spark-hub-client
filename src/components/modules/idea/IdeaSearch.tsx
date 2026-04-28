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
    <form onSubmit={handleSubmit} className="flex-1">
      <div className="flex items-center gap-2 p-1 pl-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full shadow-sm">
        <Search className="h-4 w-4 text-slate-400 shrink-0" />
        <Input
          placeholder="Search innovative ideas..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 h-10 px-3"
        />
        <Button
          type="submit"
          size="sm"
          className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white transition-all h-9 px-5 cursor-pointer"
        >
          Search
        </Button>
      </div>
    </form>
  );
}
