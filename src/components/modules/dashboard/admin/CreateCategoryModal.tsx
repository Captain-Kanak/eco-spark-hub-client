"use client";

import React, { useState, useRef } from "react";
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
import { createCategory } from "@/actions/category.action";
import { useRouter } from "next/navigation";

interface CreateCategoryModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string(),
  icon: z.instanceof(File).nullable(),
});

export const CreateCategoryModal = ({
  isOpen,
  onOpenChange,
}: CreateCategoryModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      icon: null as File | null,
    },
    validators: { onSubmit: CreateCategorySchema },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      const toastId = toast.loading("Creating category...");

      try {
        const formData = new FormData();
        formData.append("name", value.name);
        formData.append("description", value.description);
        if (value.icon) formData.append("file", value.icon);

        const result = await createCategory(formData);

        if (!result.success) {
          toast.error("Failed to create category", { id: toastId });
          return;
        }

        toast.success("Category created successfully", { id: toastId });
        form.reset();
        setPreview(null);
        onOpenChange(false);
        router.refresh();
      } catch (error) {
        toast.error("Failed to create category", { id: toastId });
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
        <div className="h-1.5 bg-emerald-500" />

        <div className="p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-slate-900 dark:text-white">
              Add New Category
            </DialogTitle>
            <DialogDescription>
              Create a new topic to group sustainable ideas and innovations.
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
              {/* Name Field */}
              <form.Field
                name="name"
                children={(field) => (
                  <Field>
                    <FieldLabel>Category Name</FieldLabel>
                    <Input
                      placeholder="e.g. Solar Energy"
                      className="h-11 rounded-xl border-slate-200 focus:ring-emerald-500"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />

              {/* Description Field */}
              <form.Field
                name="description"
                children={(field) => (
                  <Field>
                    <FieldLabel>Category Description</FieldLabel>
                    <Textarea
                      placeholder="Describe what this category covers..."
                      className="min-h-24 rounded-xl border-slate-200 focus:ring-emerald-500 resize-none"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />

              {/* Image Upload Field */}
              <form.Field
                name="icon"
                children={(field) => (
                  <Field>
                    <FieldLabel>Category Icon</FieldLabel>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="relative group cursor-pointer border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-4 transition-all hover:border-emerald-500 hover:bg-emerald-50/30 overflow-hidden"
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, field)}
                      />

                      {preview ? (
                        <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-inner">
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
                            className="absolute top-2 right-2 p-1.5 bg-white/90 dark:bg-slate-900/90 rounded-full text-rose-500 shadow-md hover:scale-110 transition-transform cursor-pointer"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-6 text-slate-500">
                          <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-full mb-3 group-hover:text-emerald-600 transition-colors">
                            <UploadCloud className="h-6 w-6" />
                          </div>
                          <p className="text-sm font-bold">
                            Click to upload image
                          </p>
                          <p className="text-xs text-slate-400 mt-1">
                            PNG, JPG or WebP (max. 2MB)
                          </p>
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
                className="flex-2 h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Create Category"
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
