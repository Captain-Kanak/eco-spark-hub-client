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
import { Loader2, X, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import * as z from "zod";
import { updateCategory } from "@/actions/category.action";
import { useRouter } from "next/navigation";
import { Category } from "@/types";

interface UpdateCategoryModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  category: Category;
}

const UpdateCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string(),
  icon: z.any().nullable(),
});

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
    validators: { onSubmit: UpdateCategorySchema },
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

        const result = await updateCategory(category.id, formData);

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
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg border-slate-200 dark:border-slate-800 rounded-3xl p-0 [&>button]:cursor-pointer">
        <div className="h-1.5 bg-amber-500" />{" "}
        {/* Changed color to amber for "Update" feel */}
        <div className="p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-slate-900 dark:text-white">
              Update Category
            </DialogTitle>
            <DialogDescription>
              Modify the details for{" "}
              <span className="font-bold text-emerald-600">
                {category?.name}
              </span>
              .
            </DialogDescription>
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
                  <Field>
                    <FieldLabel>Category Name</FieldLabel>
                    <Input
                      className="h-11 rounded-xl border-slate-200"
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
                  <Field>
                    <FieldLabel>Category Description</FieldLabel>
                    <Textarea
                      className="min-h-24 rounded-xl border-slate-200 resize-none"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />

              <form.Field
                name="icon"
                children={(field) => (
                  <Field>
                    <FieldLabel>Category Icon</FieldLabel>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="relative group cursor-pointer border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-4 transition-all hover:border-amber-500 hover:bg-amber-50/30 overflow-hidden"
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

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-12 rounded-xl font-bold cursor-pointer"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-2 h-12 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-lg shadow-amber-500/20 cursor-pointer transition-colors"
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
