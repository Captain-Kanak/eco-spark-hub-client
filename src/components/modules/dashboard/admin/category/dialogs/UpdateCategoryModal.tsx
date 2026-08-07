"use client";

import React, { useState, useRef, useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, X, UploadCloud, Edit3 } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Category } from "@/types";
import { updateCategoryById } from "@/actions/category";
import { CategoryValidation } from "@/validations/category";

interface UpdateCategoryModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  category: Category;
}

export const UpdateCategoryModal = ({
  isOpen,
  onOpenChange,
  category,
}: UpdateCategoryModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState<string | null>(category?.icon || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (category) {
      setPreview(category.icon);
    }
  }, [category]);

  const form = useForm({
    defaultValues: {
      name: category?.name || "",
      description: category?.description || "",
      icon: null as File | null,
    },
    validators: { onSubmit: CategoryValidation.updateCategorySchema },
    onSubmit: async ({ value }) => {
      if (!category?.id) return;

      setIsSubmitting(true);
      const toastId = toast.loading("Updating category...");

      try {
        const formData = new FormData();
        formData.append("name", value.name);
        formData.append("description", value.description);

        if (value.icon) {
          formData.append("file", value.icon);
        }

        const result = await updateCategoryById(category.id, formData);

        if (!result.success) {
          toast.error("Failed to update category", { id: toastId });
          return;
        }

        toast.success("Category updated successfully", { id: toastId });
        onOpenChange(false);
        router.refresh();
      } catch (error) {
        toast.error("Failed to update category", { id: toastId });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: any,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      field.handleChange(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-h-[90vh] overflow-y-auto sm:max-w-lg border-slate-200 dark:border-slate-800 rounded-3xl p-0 
      [&>button]:cursor-pointer"
      >
        <div className="h-1.5 bg-amber-500" />{" "}
        {/* Changed color to amber for "Update" feel */}
        <div className="p-8">
          <DialogHeader className="space-y-6 pb-8">
            <div className="mx-auto flex h-18 w-18 items-center justify-center rounded-3xl bg-linear-to-br from-amber-500 to-orange-500 shadow-xl shadow-amber-500/25">
              <Edit3 className="h-9 w-9 text-white" />
            </div>

            <div className="text-center space-y-2">
              <DialogTitle className="text-3xl font-black tracking-tight">
                Update Category
              </DialogTitle>

              <DialogDescription className="mx-auto max-w-md text-base leading-7 text-slate-500">
                Modify the category information. Changes will immediately be
                visible across the platform.
              </DialogDescription>
            </div>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="mt-6 space-y-6"
          >
            <FieldGroup className="space-y-4">
              <form.Field
                name="name"
                children={(field) => (
                  <Field
                    className="rounded-2xl border border-slate-200/70 bg-slate-50/60 p-5 dark:border-slate-800
                   dark:bg-slate-900/40"
                  >
                    <FieldLabel>Category Name</FieldLabel>
                    <Input
                      className="h-13 rounded-xl border-transparent bg-white dark:bg-slate-950 shadow-inner focus:ring-4 focus:ring-amber-500/15 focus:border-amber-500 transition-all"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />

              <form.Field
                name="description"
                children={(field) => (
                  <Field
                    className="rounded-2xl border border-slate-200/70 bg-slate-50/60 p-5 dark:border-slate-800
                   dark:bg-slate-900/40"
                  >
                    <FieldLabel>Category Description</FieldLabel>
                    <Textarea
                      className="min-h-32 rounded-bl-xl border-transparent bg-white dark:bg-slate-950 resize-none shadow-inner      focus:ring-4 focus:ring-amber-500/15 focus:border-amber-500"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />

                    <div className="mt-2 flex justify-end">
                      <span className="text-xs text-slate-400">
                        {field.state.value.length}/1000
                      </span>
                    </div>
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />

              <form.Field
                name="icon"
                children={(field) => (
                  <Field
                    className="rounded-2xl border border-slate-200/70 bg-slate-50/60 p-5 dark:border-slate-800
                   dark:bg-slate-900/40"
                  >
                    <FieldLabel>Category Icon</FieldLabel>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="relative rounded-3xl border-2 border-dashed border-slate-300 bg-linear-to-br from-white
                       to-slate-50 dark:from-slate-900 dark:to-slate-950 hover:border-amber-500 hover:bg-amber-50/30 
                       transition-all duration-300 p-5"
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, field)}
                      />

                      {preview ? (
                        <div className="relative aspect-video w-full rounded-xl overflow-hidden">
                          <Image
                            src={preview}
                            alt="Preview"
                            fill
                            className="object-cover"
                          />

                          <p className="mt-3 text-center font-semibold">
                            Current Category Icon
                          </p>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setPreview(null);
                              field.handleChange(null);
                            }}
                            className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full text-rose-500 shadow-md cursor-pointer"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-6 text-slate-500">
                          <UploadCloud className="h-6 w-6 mb-2" />
                          <p className="text-sm font-bold">Replace Icon</p>
                        </div>
                      )}
                    </div>
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />
            </FieldGroup>

            <div className="mt-8 flex items-center justify-end gap-4 border-t border-slate-200 pt-6 dark:border-slate-800">
              <Button
                type="button"
                variant="outline"
                className="h-12 rounded-xl border-slate-300 px-8 font-semibold hover:bg-slate-100 cursor-pointer"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-12 px-10 rounded-xl bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600
                 hover:to-orange-600 text-white font-bold shadow-xl shadow-amber-500/20 transition-all hover:scale-[1.02] 
                 active:scale-95 cursor-pointer"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
