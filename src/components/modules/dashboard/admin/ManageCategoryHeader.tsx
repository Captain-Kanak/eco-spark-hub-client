"use client";

import { Button } from "@/components/ui/button";
import { FolderTree, Plus } from "lucide-react";

export default function ManageCategoryHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <FolderTree className="h-6 w-6 text-emerald-600" />
          Manage Categories
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Organize and oversee sustainable topics for the EcoSpark community.
        </p>
      </div>
      <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl flex items-center gap-2">
        <Plus className="h-4 w-4" />
        Add Category
      </Button>
    </div>
  );
}
