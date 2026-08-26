"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FolderTree, Plus } from "lucide-react";
import { CreateCategoryModal } from "./dialogs/CreateCategoryModal";

export default function ManageCategoryHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-900/20">
            <FolderTree className="h-8 w-8 text-emerald-600" />
          </div>

          <div>
            <h1 className="text-3xl font-black tracking-tight">
              Manage Categories
            </h1>

            <p className="mt-1 text-slate-500">
              Organize sustainable topics for your community.
            </p>
          </div>
        </div>

        <Button
          onClick={() => setOpen(true)}
          className="h-12 rounded-2xl px-6 bg-emerald-600 hover:bg-emerald-700 shadow-lg 
          shadow-emerald-600/20 cursor-pointer text-white"
        >
          <Plus className="mr-2 h-5 w-5" />
          New Category
        </Button>
      </div>

      <CreateCategoryModal isOpen={open} onOpenChange={setOpen} />
    </>
  );
}
