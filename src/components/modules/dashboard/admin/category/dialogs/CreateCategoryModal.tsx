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
import { Loader2, X, UploadCloud, Plus } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createCategory } from "@/actions/category";
import { CategoryValidation } from "@/validations/category";

interface CreateCategoryModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

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
    validators: { onSubmit: CategoryValidation.createCategorySchema },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      const toastId = toast.loading("Creating category...");

      try {
        const formData = new FormData();
        formData.append("name", value.name);
        if (value.description)
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
      <DialogContent
        className="max-h-[90vh] overflow-y-auto sm:max-w-lg border-slate-200 dark:border-slate-800 rounded-3xl p-0 
      [&>button]:cursor-pointer"
      >
        <div className="flex max-h-[90vh] flex-col">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -right-20 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
          </div>

          <div className="overflow-y-auto px-8 py-8">
            <div className="border-b border-slate-200 pb-8 dark:border-slate-800">
              <DialogHeader className="items-center text-center space-y-3">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-2xl" />

                  <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-500 via-teal-500 to-cyan-500 shadow-xl shadow-emerald-500/30">
                    <Plus className="h-8 w-8 text-white" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <DialogTitle className="text-[32px] leading-none font-black tracking-tight">
                    Create Category
                  </DialogTitle>

                  <DialogDescription className="max-w-sm text-sm leading-6 text-slate-500">
                    Organize sustainable ideas into categories for your
                    community.
                  </DialogDescription>
                </div>
              </DialogHeader>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
              className="mt-6 space-y-6"
            >
              <FieldGroup className="space-y-7">
                {/* Name Field */}
                <form.Field
                  name="name"
                  children={(field) => (
                    <Field>
                      <FieldLabel className="mb-2.5 text-sm font-semibold tracking-tight text-slate-800 dark:text-slate-200">
                        Category Name
                      </FieldLabel>
                      <Input
                        placeholder="Enter category name..."
                        className="h-12 rounded-xl border border-slate-200 bg-white px-4 shadow-sm transition-all duration-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-900"
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
                      <FieldLabel className="mb-2.5 text-sm font-semibold tracking-tight text-slate-800 dark:text-slate-200">
                        Category Description
                      </FieldLabel>
                      <Textarea
                        placeholder="Describe what this category covers..."
                        className="min-h-36 resize-none rounded-xl border border-slate-200 bg-white px-4 shadow-sm transition-all duration-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-900"
                        onBlur={field.handleBlur}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <div className="mt-2 text-right text-xs text-slate-400">
                        {field.state.value?.length ?? 0}/1000
                      </div>
                      <FieldError errors={field.state.meta.errors} />
                    </Field>
                  )}
                />

                {/* Image Upload Field */}
                <form.Field
                  name="icon"
                  children={(field) => (
                    <Field className="space-y-3">
                      <FieldLabel className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Category Icon
                      </FieldLabel>

                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageChange(e, field)}
                      />

                      {!preview ? (
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          className="group relative cursor-pointer overflow-hidden rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50/80 p-8 transition-all duration-300 hover:border-emerald-500 hover:bg-emerald-50/60 dark:border-slate-700 dark:bg-slate-900/50 dark:hover:bg-slate-900"
                        >
                          <div className="flex flex-col items-center text-center">
                            <div className="flex h-18 w-18 items-center justify-center rounded-full bg-emerald-100 transition-all duration-300 group-hover:scale-110 dark:bg-emerald-900/30">
                              <UploadCloud className="h-8 w-8 text-emerald-600" />
                            </div>

                            <h4 className="mt-5 font-bold text-slate-900 dark:text-white">
                              Upload Category Icon
                            </h4>

                            <p className="mt-2 text-sm text-slate-500">
                              Click to browse or drag & drop
                            </p>

                            <span className="mt-4 rounded-full bg-white px-4 py-1 text-xs font-semibold shadow dark:bg-slate-800">
                              PNG • JPG • WEBP
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-700">
                          <Image
                            src={preview}
                            alt="Preview"
                            width={700}
                            height={400}
                            className="h-80 w-full object-cover"
                          />

                          <div className="absolute inset-0 bg-black/20 opacity-0 transition group-hover:opacity-100" />

                          <button
                            type="button"
                            onClick={() => {
                              setPreview(null);
                              field.handleChange(null);

                              if (fileInputRef.current) {
                                fileInputRef.current.value = "";
                              }
                            }}
                            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg transition hover:scale-110 cursor-pointer"
                          >
                            <X className="h-5 w-5 text-rose-500" />
                          </button>
                        </div>
                      )}
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
                      Creating...
                    </>
                  ) : (
                    "Create"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
