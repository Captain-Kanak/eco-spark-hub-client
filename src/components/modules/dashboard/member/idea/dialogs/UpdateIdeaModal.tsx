"use client";

import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category, Idea } from "@/types";
import { useForm } from "@tanstack/react-form";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  ImageIcon,
  Lightbulb,
  Loader2,
  Plus,
  Target,
  Trash2,
  UploadCloud,
  X,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateIdeaById } from "@/actions/idea";
import { IdeaValidation } from "@/validations/idea";
import { IMAGE_ACCEPT } from "@/validations/file";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface UpdateIdeaModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  categories: Category[];
  idea: Idea;
}

export default function UpdateIdeaModal({
  isOpen,
  onOpenChange,
  categories,
  idea,
}: UpdateIdeaModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState<string | null>(
    idea?.coverImage || null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (idea) {
      setPreview(idea.coverImage);
    }
  }, [idea]);

  const form = useForm({
    defaultValues: {
      title: idea?.title || "",
      description: idea?.description || "",
      image: null as File | null,
      problemStatement: idea?.problemStatement || "",
      proposedSolution: idea?.proposedSolution || "",
      expectedImpact: idea?.expectedImpact || [],
      location: idea?.location || "",
      estimatedBudget: Number(idea?.estimatedBudget) || 0,
      fundingGoal: Number(idea?.fundingGoal) || 0,
      categoryId: idea?.categoryId || "",
    },
    validators: {
      onSubmit: IdeaValidation.updateIdeaSchema,
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);

      const toastId = toast.loading("Updating your idea...");

      try {
        const formData = new FormData();

        formData.append("title", value.title);
        formData.append("description", value.description);
        formData.append("problemStatement", value.problemStatement);
        formData.append("proposedSolution", value.proposedSolution);

        // Array → JSON string
        formData.append("expectedImpact", JSON.stringify(value.expectedImpact));

        formData.append("location", value.location);

        // Number → string
        formData.append("estimatedBudget", String(value.estimatedBudget));

        formData.append("fundingGoal", String(value.fundingGoal));

        formData.append("categoryId", value.categoryId);

        // File
        if (value.image) {
          formData.append("coverImage", value.image);
        }

        const result = await updateIdeaById(idea.id, formData);

        if (!result?.success) {
          toast.error(result?.message || "Failed to update your idea.", {
            id: toastId,
          });
          return;
        }

        toast.success("Idea updated successfully!", {
          id: toastId,
          description: "Your idea details have been updated.",
        });

        onOpenChange(false);
        form.reset();
        setPreview(idea.coverImage || null);

        router.refresh();
      } catch (error) {
        console.error(error);

        toast.error("Something went wrong while updating your idea.", {
          id: toastId,
        });
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

    if (!file) return;

    field.handleChange(file);

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const removeImage = (field: {
    handleChange: (value: File | null) => void;
  }) => {
    field.handleChange(null);
    setPreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClose = () => {
    if (isSubmitting) return;

    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className="max-h-[90vh] overflow-y-auto rounded-[2rem] border border-slate-200
       bg-white p-0 shadow-2xl dark:border-slate-800 dark:bg-slate-950 sm:max-w-3xl
        [&>button]:cursor-pointer z-101"
      >
        {/* TOP ACCENT */}
        <div className="h-1.5 w-full bg-linear-to-r from-emerald-500 via-teal-500 to-cyan-500" />

        {/* HEADER */}
        <div className="relative overflow-hidden border-b border-slate-100 px-6 py-7 dark:border-slate-800 sm:px-8">
          <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-1/3 h-40 w-40 rounded-full bg-cyan-500/5 blur-3xl" />

          <DialogHeader className="relative">
            <div className="flex items-start gap-4">
              <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 shadow-sm dark:bg-emerald-500/10 dark:text-emerald-400">
                <Lightbulb className="h-6 w-6" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-black tracking-wider text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                    EDIT IDEA
                  </span>

                  {idea?.category?.name && (
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                      {idea.category.name}
                    </span>
                  )}
                </div>

                <DialogTitle className="truncate text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                  Update Idea
                </DialogTitle>

                <DialogDescription className="mt-1 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Refine your idea details, update the presentation, and keep
                  your submission accurate.
                </DialogDescription>
              </div>
            </div>

            {/* Current idea */}
            <div
              className="mt-5 flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-3
               dark:border-slate-800 dark:bg-slate-900/60"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm dark:bg-slate-800">
                <FileText className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              </div>

              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Currently editing
                </p>

                <p className="truncate text-sm font-bold text-slate-700 dark:text-slate-200">
                  {idea?.title}
                </p>
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* FORM */}
        <form
          id="update-idea-form"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-6 p-6 sm:p-8"
        >
          <FieldGroup className="space-y-6">
            {/* BASIC INFORMATION */}
            <section className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="border-b border-slate-100 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-900/50">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                    <FileText className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="font-black text-slate-900 dark:text-white">
                      Basic Information
                    </h3>

                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Update the identity and classification of your idea.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-5 p-5 sm:p-6">
                <div className="grid gap-5 md:grid-cols-2">
                  {/* Title */}
                  <form.Field
                    name="title"
                    validators={{
                      onChange: IdeaValidation.createIdeaSchema.shape.title,
                    }}
                  >
                    {(field) => (
                      <Field className="space-y-2">
                        <FieldLabel className="text-sm font-bold text-slate-700 dark:text-slate-300">
                          Idea Title
                        </FieldLabel>

                        <Input
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Enter your idea title"
                          className="h-12 rounded-xl border-slate-200 bg-white shadow-sm transition-all focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-900"
                        />

                        <FieldError errors={field.state.meta.errors} />
                      </Field>
                    )}
                  </form.Field>

                  {/* Category */}
                  <form.Field
                    name="categoryId"
                    validators={{
                      onChange:
                        IdeaValidation.createIdeaSchema.shape.categoryId,
                    }}
                  >
                    {(field) => (
                      <Field className="space-y-2">
                        <FieldLabel className="text-sm font-bold text-slate-700 dark:text-slate-300">
                          Category
                        </FieldLabel>

                        <Select
                          value={field.state.value}
                          onValueChange={field.handleChange}
                        >
                          <SelectTrigger className="h-12 w-full rounded-xl border-slate-200 bg-white shadow-sm focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-900">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>

                          <SelectContent className="rounded-xl">
                            {categories.map((category) => (
                              <SelectItem
                                key={category.id}
                                value={category.id}
                                className="cursor-pointer rounded-lg"
                              >
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <FieldError errors={field.state.meta.errors} />
                      </Field>
                    )}
                  </form.Field>
                </div>

                {/* Description */}
                <form.Field
                  name="description"
                  validators={{
                    onChange: IdeaValidation.createIdeaSchema.shape.description,
                  }}
                >
                  {(field) => (
                    <Field className="space-y-2">
                      <div className="flex items-center justify-between">
                        <FieldLabel className="text-sm font-bold text-slate-700 dark:text-slate-300">
                          Short Description
                        </FieldLabel>

                        <span className="text-xs font-medium text-slate-400">
                          {field.state.value.length}/5000
                        </span>
                      </div>

                      <Textarea
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Give a concise overview of your idea..."
                        className="min-h-32 resize-none rounded-xl border-slate-200 bg-white shadow-sm focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-900"
                      />

                      <FieldError errors={field.state.meta.errors} />
                    </Field>
                  )}
                </form.Field>
              </div>
            </section>

            {/* COVER IMAGE */}
            <Card className="overflow-hidden rounded-[2rem] border-slate-200 shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <CardHeader className="border-b border-slate-100 p-6 dark:border-slate-800 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">
                    <ImageIcon className="h-5 w-5" />
                  </div>

                  <div>
                    <CardTitle className="text-lg font-black">
                      Cover Image
                    </CardTitle>

                    <CardDescription className="mt-1">
                      Add a visual that represents your idea.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6 sm:p-8">
                <form.Field name="image">
                  {(field) => (
                    <Field className="space-y-3">
                      <input
                        ref={fileInputRef}
                        type="file"
                        hidden
                        accept={IMAGE_ACCEPT}
                        onChange={(e) => handleImageChange(e, field)}
                      />

                      {preview ? (
                        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
                          <div className="relative aspect-video w-full">
                            <Image
                              src={preview}
                              alt="Idea cover preview"
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-linear-to-t from-black/70 to-transparent p-5 pt-12">
                            <div>
                              <p className="text-sm font-semibold text-white">
                                Cover image selected
                              </p>

                              <p className="mt-1 text-xs text-white/70">
                                Ready to be submitted
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeImage(field)}
                              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl bg-white text-rose-500 shadow-lg transition hover:scale-105"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="group flex w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 px-6 py-12 transition hover:border-emerald-400 hover:bg-emerald-50/30 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-emerald-500/50"
                        >
                          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 transition group-hover:scale-105 dark:bg-emerald-500/10 dark:text-emerald-400">
                            <UploadCloud className="h-7 w-7" />
                          </div>

                          <p className="mt-4 text-sm font-bold text-slate-700 dark:text-slate-200">
                            Upload your cover image
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            JPG, JPEG, PNG, GIF or WEBP · Maximum 2MB
                          </p>
                        </button>
                      )}

                      <FieldError errors={field.state.meta.errors} />
                    </Field>
                  )}
                </form.Field>
              </CardContent>
            </Card>

            {/* PROBLEM & SOLUTION */}
            <section className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="border-b border-slate-100 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-900/50">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                    <Target className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="font-black text-slate-900 dark:text-white">
                      Problem & Solution
                    </h3>

                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Explain the challenge and how your idea addresses it.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-2">
                {/* Problem */}

                <form.Field
                  name="problemStatement"
                  validators={{
                    onChange:
                      IdeaValidation.createIdeaSchema.shape.problemStatement,
                  }}
                >
                  {(field) => (
                    <Field className="space-y-2">
                      <FieldLabel className="text-sm font-bold text-slate-700 dark:text-slate-300">
                        Problem Statement
                      </FieldLabel>

                      <Textarea
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="What environmental or community problem does your idea address?"
                        className="min-h-48 resize-none rounded-xl border-slate-200 bg-white shadow-sm focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 dark:border-slate-700 dark:bg-slate-900"
                      />

                      <FieldError errors={field.state.meta.errors} />
                    </Field>
                  )}
                </form.Field>

                {/* Solution */}

                <form.Field
                  name="proposedSolution"
                  validators={{
                    onChange:
                      IdeaValidation.createIdeaSchema.shape.proposedSolution,
                  }}
                >
                  {(field) => (
                    <Field className="space-y-2">
                      <FieldLabel className="text-sm font-bold text-slate-700 dark:text-slate-300">
                        Proposed Solution
                      </FieldLabel>

                      <Textarea
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="How does your idea solve the problem?"
                        className="min-h-48 resize-none rounded-xl border-slate-200 bg-white shadow-sm focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-900"
                      />

                      <FieldError errors={field.state.meta.errors} />
                    </Field>
                  )}
                </form.Field>
              </div>
            </section>

            {/* EXPECTED IMPACT */}
            <Card className="overflow-hidden rounded-[2rem] border-slate-200 shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <CardHeader className="border-b border-slate-100 p-6 dark:border-slate-800 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>

                  <div>
                    <CardTitle className="text-lg font-black">
                      Expected Impact
                    </CardTitle>

                    <CardDescription className="mt-1">
                      Add the key environmental, social, or economic outcomes
                      you expect from this idea.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6 sm:p-8">
                <form.Field
                  name="expectedImpact"
                  validators={{
                    onChange:
                      IdeaValidation.createIdeaSchema.shape.expectedImpact,
                  }}
                >
                  {(field) => (
                    <Field className="space-y-4">
                      {field.state.value.length === 0 && (
                        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-6 text-center dark:border-slate-800 dark:bg-slate-900/50">
                          <CheckCircle2 className="mx-auto h-8 w-8 text-slate-300 dark:text-slate-700" />

                          <p className="mt-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
                            No impact points added yet
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            Add the main outcomes your idea is expected to
                            create.
                          </p>
                        </div>
                      )}

                      <div className="space-y-3">
                        {field.state.value.map((impact, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                              {index + 1}
                            </div>

                            <Input
                              value={impact}
                              onChange={(e) => {
                                const next = [...field.state.value];

                                next[index] = e.target.value;

                                field.handleChange(next);
                              }}
                              placeholder="e.g. Reduce plastic waste by 30%"
                              className="h-11 rounded-xl bg-slate-50 dark:bg-slate-900"
                            />

                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => {
                                field.handleChange(
                                  field.state.value.filter(
                                    (_, i) => i !== index,
                                  ),
                                );
                              }}
                              className="h-11 w-11 shrink-0 cursor-pointer rounded-xl"
                            >
                              <Trash2 className="h-4 w-4 text-rose-500" />
                            </Button>
                          </div>
                        ))}
                      </div>

                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          field.handleChange([...field.state.value, ""])
                        }
                        className="cursor-pointer rounded-xl"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Expected Impact
                      </Button>

                      <FieldError errors={field.state.meta.errors} />
                    </Field>
                  )}
                </form.Field>
              </CardContent>
            </Card>

            {/* ADDITIONAL DETAILS */}
            <section className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="border-b border-slate-100 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-900/50">
                <div>
                  <h3 className="font-black text-slate-900 dark:text-white">
                    Additional Details
                  </h3>

                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Update the location and financial information.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 p-5 sm:p-6 md:grid-cols-3">
                {/* Location */}

                <form.Field
                  name="location"
                  validators={{
                    onChange: IdeaValidation.createIdeaSchema.shape.location,
                  }}
                >
                  {(field) => (
                    <Field className="space-y-2">
                      <FieldLabel className="text-sm font-bold text-slate-700 dark:text-slate-300">
                        Location
                      </FieldLabel>

                      <Input
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="e.g. Dhaka, Bangladesh"
                        className="h-12 rounded-xl border-slate-200 bg-white shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900"
                      />

                      <FieldError errors={field.state.meta.errors} />
                    </Field>
                  )}
                </form.Field>

                {/* Estimated Budget */}

                <form.Field
                  name="estimatedBudget"
                  validators={{
                    onChange:
                      IdeaValidation.createIdeaSchema.shape.estimatedBudget,
                  }}
                >
                  {(field) => (
                    <Field className="space-y-2">
                      <FieldLabel className="text-sm font-bold text-slate-700 dark:text-slate-300">
                        Estimated Budget
                      </FieldLabel>

                      <Input
                        type="number"
                        min={0}
                        step="0.01"
                        value={field.state.value || ""}
                        onChange={(e) =>
                          field.handleChange(Number(e.target.value) || 0)
                        }
                        placeholder="0.00"
                        className="h-12 rounded-xl border-slate-200 bg-white shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900"
                      />

                      <FieldError errors={field.state.meta.errors} />
                    </Field>
                  )}
                </form.Field>

                {/* Funding Goal */}

                <form.Field
                  name="fundingGoal"
                  validators={{
                    onChange: IdeaValidation.createIdeaSchema.shape.fundingGoal,
                  }}
                >
                  {(field) => (
                    <Field className="space-y-2">
                      <FieldLabel className="text-sm font-bold text-slate-700 dark:text-slate-300">
                        Funding Goal
                      </FieldLabel>

                      <Input
                        type="number"
                        min={0}
                        step="0.01"
                        value={field.state.value || ""}
                        onChange={(e) =>
                          field.handleChange(Number(e.target.value) || 0)
                        }
                        placeholder="0.00"
                        className="h-12 rounded-xl border-slate-200 bg-white shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900"
                      />

                      <FieldError errors={field.state.meta.errors} />
                    </Field>
                  )}
                </form.Field>
              </div>
            </section>
          </FieldGroup>

          {/* FOOTER NOTICE */}
          <div className="flex gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 dark:border-emerald-500/10 dark:bg-emerald-500/5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-500/10">
              <Lightbulb className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </div>

            <div>
              <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                Keep your idea up to date
              </p>

              <p className="mt-1 text-xs leading-5 text-emerald-700/70 dark:text-emerald-400/70">
                Clear and accurate information helps administrators and
                community members better understand your idea.
              </p>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 dark:border-slate-800 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              onClick={handleClose}
              className="h-12 rounded-xl border-slate-200 px-6 font-bold shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-900 sm:min-w-32"
            >
              Cancel
            </Button>

            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, formSubmitting]) => (
                <Button
                  form="update-idea-form"
                  type="submit"
                  disabled={!canSubmit || isSubmitting || formSubmitting}
                  className="h-12 rounded-xl bg-emerald-600 px-7 font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 active:scale-[0.98] sm:min-w-40"
                >
                  {isSubmitting || formSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      Save Changes
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              )}
            </form.Subscribe>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
