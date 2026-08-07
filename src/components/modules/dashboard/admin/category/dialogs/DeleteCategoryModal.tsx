"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteCategoryById } from "@/actions/category";

interface DeleteCategoryModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  categoryId: string;
  categoryName: string;
}

export const DeleteCategoryModal = ({
  isOpen,
  onOpenChange,
  categoryId,
  categoryName,
}: DeleteCategoryModalProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    const toastId = toast.loading("Removing category...");

    try {
      const result = await deleteCategoryById(categoryId);

      if (!result.success) {
        toast.error("Failed to delete category", { id: toastId });
        return;
      }

      toast.success("Category deleted successfully", { id: toastId });
      onOpenChange(false);
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete category", { id: toastId });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-110 rounded-[2rem] border border-slate-200/70 bg-white p-0 shadow-2xl
       dark:border-slate-800 dark:bg-slate-950 overflow-hidden [&>button]:cursor-pointer"
      >
        <div className="p-8">
          <DialogHeader className="items-center text-center">
            {/* Warning Icon */}
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 ring-8 ring-rose-50/60
             dark:bg-rose-950/40 dark:ring-rose-950/20"
            >
              <Trash2 className="h-8 w-8 text-rose-500" />
            </div>

            <DialogTitle className="mt-6 text-2xl font-black tracking-tight text-slate-900  dark:text-white">
              Delete Category?
            </DialogTitle>

            <DialogDescription className="mt-3 max-w-sm text-center text-sm leading-6 text-slate-500 dark:text-slate-400">
              You are about to permanently delete{" "}
              <span className="font-bold text-slate-800 dark:text-slate-200">
                "{categoryName}"
              </span>
              .
              <span className="mt-1 block text-xs text-slate-400 dark:text-slate-500">
                This action cannot be undone.
              </span>
            </DialogDescription>
          </DialogHeader>

          {/* Warning Box */}
          <div
            className="mt-6 rounded-2xl border border-rose-100 bg-rose-50/70 px-4 py-3 dark:border-rose-900/40
           dark:bg-rose-950/20"
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />

              <p className="text-xs leading-5 text-rose-700 dark:text-rose-400">
                Deleting this category may affect the ideas associated with it.
                Make sure you want to continue.
              </p>
            </div>
          </div>

          {/* Actions */}
          <DialogFooter className="mt-7 flex flex-col-reverse gap-3 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isDeleting}
              className="h-12 flex-1 rounded-xl border-slate-200 bg-white font-bold text-slate-700 transition-all
               hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300
                dark:hover:bg-slate-800 cursor-pointer"
            >
              Cancel
            </Button>

            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
              className="h-12 flex-1 rounded-xl bg-rose-600 font-bold text-white shadow-lg shadow-rose-500/20 transition-all hover:bg-rose-700 active:scale-[0.98] cursor-pointer"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Category
                </>
              )}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
