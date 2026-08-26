"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  FileText,
  ImageIcon,
  Lightbulb,
  Loader2,
  MapPin,
  Plus,
  Target,
  Trash2,
  UploadCloud,
  X,
} from "lucide-react";
import { Category } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createIdea } from "@/actions/idea";
import {
  ALLOWED_IMAGE_MIME_TYPES,
  IMAGE_ACCEPT,
  MAX_FILE_SIZE,
} from "@/validations/file";
import { IdeaValidation } from "@/validations/idea";

export default function CreateIdeaForm({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      image: null as File | null,
      problemStatement: "",
      proposedSolution: "",
      expectedImpact: [] as string[],
      location: "",
      estimatedBudget: 0,
      fundingGoal: 0,
      categoryId: "",
    },
    validators: {
      onSubmit: IdeaValidation.createIdeaSchema,
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);

      const toastId = toast.loading("Submitting your idea for review...");

      try {
        const formData = new FormData();

        formData.append("title", value.title);
        formData.append("description", value.description);
        formData.append("problemStatement", value.problemStatement);
        formData.append("proposedSolution", value.proposedSolution);
        formData.append(
          "expectedImpact",
          JSON.stringify(
            value.expectedImpact.filter((impact) => impact.trim().length > 0),
          ),
        );
        formData.append("location", value.location);
        formData.append("estimatedBudget", String(value.estimatedBudget));
        formData.append("fundingGoal", String(value.fundingGoal));
        formData.append("categoryId", value.categoryId);

        if (value.image) {
          formData.append("file", value.image);
        }

        const result = await createIdea(formData);

        if (!result?.success) {
          toast.error(result?.message || "Failed to submit your idea.", {
            id: toastId,
          });

          return;
        }

        toast.success("Idea submitted successfully!", {
          id: toastId,
          description:
            "Your idea has been sent to the administration team for review.",
        });

        form.reset();

        setPreview(null);

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

        router.push("/dashboard/manage-ideas/review");
      } catch (error) {
        console.error("Create idea error:", error);

        toast.error("Something went wrong while submitting your idea.", {
          id: toastId,
        });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: {
      handleChange: (value: File | null) => void;
    },
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!ALLOWED_IMAGE_MIME_TYPES.includes(file.type)) {
      toast.error("Only JPG, JPEG, PNG, GIF, and WEBP images are allowed.");

      e.target.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("Image size cannot exceed 2MB.");

      e.target.value = "";
      return;
    }

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

  return (
    <div className="mx-auto max-w-5xl pb-12">
      {/* ====================================================== */}
      {/* PAGE HEADER */}
      {/* ====================================================== */}

      <div className="mb-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-emerald-100 bg-linear-to-br from-emerald-50 via-white to-white p-6 shadow-sm dark:border-emerald-500/10 dark:from-emerald-500/5 dark:via-slate-950 dark:to-slate-950 sm:p-8">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
              <Lightbulb className="h-8 w-8" />
            </div>

            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                  IDEA SUBMISSION
                </span>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                  Community Innovation
                </span>
              </div>

              <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                Create a New Idea
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                Share your environmental innovation with the EcoSpark community.
                Provide enough detail for our team to understand, evaluate, and
                support your idea.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================== */}
      {/* FORM */}
      {/* ====================================================== */}

      <form
        id="create-idea-form"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-6"
      >
        {/* ==================================================== */}
        {/* BASIC INFORMATION */}
        {/* ==================================================== */}

        <Card className="overflow-hidden rounded-[2rem] border-slate-200 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <CardHeader className="border-b border-slate-100 bg-slate-50/70 p-6 dark:border-slate-800 dark:bg-slate-900/50 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                <FileText className="h-5 w-5" />
              </div>

              <div>
                <CardTitle className="text-lg font-black">
                  Basic Information
                </CardTitle>

                <CardDescription className="mt-1">
                  Give your idea a clear identity and explain it briefly.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 sm:p-8">
            <FieldGroup className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* CATEGORY */}

                <form.Field
                  name="categoryId"
                  validators={{
                    onChange: IdeaValidation.createIdeaSchema.shape.categoryId,
                  }}
                >
                  {(field) => (
                    <Field className="space-y-2">
                      <FieldLabel className="font-bold">Category</FieldLabel>

                      <Select
                        value={field.state.value}
                        onValueChange={field.handleChange}
                      >
                        <SelectTrigger className="h-12 rounded-xl bg-slate-50 dark:bg-slate-900 cursor-pointer">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>

                        <SelectContent className="rounded-xl">
                          {categories.length > 0 ? (
                            categories.map((category) => (
                              <SelectItem
                                key={category.id}
                                value={category.id}
                                className="cursor-pointer"
                              >
                                {category.name}
                              </SelectItem>
                            ))
                          ) : (
                            <div className="px-3 py-6 text-center text-sm text-slate-500">
                              No categories available.
                            </div>
                          )}
                        </SelectContent>
                      </Select>

                      <FieldError errors={field.state.meta.errors} />
                    </Field>
                  )}
                </form.Field>

                {/* TITLE */}

                <form.Field
                  name="title"
                  validators={{
                    onChange: IdeaValidation.createIdeaSchema.shape.title,
                  }}
                >
                  {(field) => (
                    <Field className="space-y-2">
                      <FieldLabel className="font-bold">Idea Title</FieldLabel>

                      <Input
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="e.g. Solar-Powered Water Purification"
                        className="h-12 rounded-xl bg-slate-50 dark:bg-slate-900"
                      />

                      <FieldError errors={field.state.meta.errors} />
                    </Field>
                  )}
                </form.Field>
              </div>

              {/* DESCRIPTION */}

              <form.Field
                name="description"
                validators={{
                  onChange: IdeaValidation.createIdeaSchema.shape.description,
                }}
              >
                {(field) => (
                  <Field className="space-y-2">
                    <div className="flex items-center justify-between">
                      <FieldLabel className="font-bold">
                        Short Description
                      </FieldLabel>

                      <span className="text-xs text-slate-400">
                        {field.state.value.length}/5000
                      </span>
                    </div>

                    <Textarea
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Give readers a concise overview of your idea..."
                      className="min-h-32 resize-none rounded-xl bg-slate-50 dark:bg-slate-900"
                    />

                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              </form.Field>
            </FieldGroup>
          </CardContent>
        </Card>

        {/* ==================================================== */}
        {/* COVER IMAGE */}
        {/* ==================================================== */}

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

        {/* ==================================================== */}
        {/* PROBLEM & SOLUTION */}
        {/* ==================================================== */}

        <Card className="overflow-hidden rounded-[2rem] border-slate-200 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <CardHeader className="border-b border-slate-100 p-6 dark:border-slate-800 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                <Target className="h-5 w-5" />
              </div>

              <div>
                <CardTitle className="text-lg font-black">
                  Problem & Solution
                </CardTitle>

                <CardDescription className="mt-1">
                  Explain the challenge you are addressing and how your proposed
                  solution works.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* PROBLEM */}

              <form.Field
                name="problemStatement"
                validators={{
                  onChange:
                    IdeaValidation.createIdeaSchema.shape.problemStatement,
                }}
              >
                {(field) => (
                  <Field className="space-y-2">
                    <FieldLabel className="font-bold">
                      Problem Statement
                    </FieldLabel>

                    <Textarea
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="What environmental or community problem does your idea address?"
                      className="min-h-48 resize-none rounded-xl bg-slate-50 dark:bg-slate-900"
                    />

                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              </form.Field>

              {/* SOLUTION */}

              <form.Field
                name="proposedSolution"
                validators={{
                  onChange:
                    IdeaValidation.createIdeaSchema.shape.proposedSolution,
                }}
              >
                {(field) => (
                  <Field className="space-y-2">
                    <FieldLabel className="font-bold">
                      Proposed Solution
                    </FieldLabel>

                    <Textarea
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="How does your idea solve the problem?"
                      className="min-h-48 resize-none rounded-xl bg-slate-50 dark:bg-slate-900"
                    />

                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              </form.Field>
            </div>
          </CardContent>
        </Card>

        {/* ==================================================== */}
        {/* IMPACT */}
        {/* ==================================================== */}

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
                  Add the key environmental, social, or economic outcomes you
                  expect from this idea.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 sm:p-8">
            <form.Field
              name="expectedImpact"
              validators={{
                onChange: IdeaValidation.createIdeaSchema.shape.expectedImpact,
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
                        Add the main outcomes your idea is expected to create.
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
                              field.state.value.filter((_, i) => i !== index),
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

        {/* ==================================================== */}
        {/* LOCATION & FUNDING */}
        {/* ==================================================== */}

        <Card className="overflow-hidden rounded-[2rem] border-slate-200 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <CardHeader className="border-b border-slate-100 p-6 dark:border-slate-800 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                <MapPin className="h-5 w-5" />
              </div>

              <div>
                <CardTitle className="text-lg font-black">
                  Project Details
                </CardTitle>

                <CardDescription className="mt-1">
                  Tell us where your idea will have an impact and what resources
                  it may require.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 sm:p-8">
            <FieldGroup className="space-y-6">
              {/* LOCATION */}

              <form.Field
                name="location"
                validators={{
                  onChange: IdeaValidation.createIdeaSchema.shape.location,
                }}
              >
                {(field) => (
                  <Field className="space-y-2">
                    <FieldLabel className="font-bold">Location</FieldLabel>

                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="e.g. Dhaka, Bangladesh"
                      className="h-12 rounded-xl bg-slate-50 dark:bg-slate-900"
                    />

                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              </form.Field>

              {/* BUDGET */}

              <div className="grid gap-6 md:grid-cols-2">
                <form.Field
                  name="estimatedBudget"
                  validators={{
                    onChange:
                      IdeaValidation.createIdeaSchema.shape.estimatedBudget,
                  }}
                >
                  {(field) => (
                    <Field className="space-y-2">
                      <FieldLabel className="font-bold">
                        Estimated Budget
                      </FieldLabel>

                      <Input
                        type="number"
                        min={0}
                        step="0.01"
                        value={field.state.value === 0 ? "" : field.state.value}
                        onChange={(e) =>
                          field.handleChange(Number(e.target.value) || 0)
                        }
                        placeholder="0.00"
                        className="h-12 rounded-xl bg-slate-50 dark:bg-slate-900"
                      />

                      <p className="text-xs text-slate-400">
                        Approximate total cost required to implement your idea.
                      </p>

                      <FieldError errors={field.state.meta.errors} />
                    </Field>
                  )}
                </form.Field>

                {/* FUNDING GOAL */}

                <form.Field
                  name="fundingGoal"
                  validators={{
                    onChange: IdeaValidation.createIdeaSchema.shape.fundingGoal,
                  }}
                >
                  {(field) => (
                    <Field className="space-y-2">
                      <FieldLabel className="font-bold">
                        Funding Goal
                      </FieldLabel>

                      <Input
                        type="number"
                        min={0}
                        step="0.01"
                        value={field.state.value === 0 ? "" : field.state.value}
                        onChange={(e) =>
                          field.handleChange(Number(e.target.value) || 0)
                        }
                        placeholder="0.00"
                        className="h-12 rounded-xl bg-slate-50 dark:bg-slate-900"
                      />

                      <p className="text-xs text-slate-400">
                        Amount you want to raise from supporters.
                      </p>

                      <FieldError errors={field.state.meta.errors} />
                    </Field>
                  )}
                </form.Field>
              </div>
            </FieldGroup>
          </CardContent>
        </Card>

        {/* ==================================================== */}
        {/* SUBMISSION NOTICE */}
        {/* ==================================================== */}

        <div className="flex gap-4 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5 dark:border-emerald-500/10 dark:bg-emerald-500/5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-500/10">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </div>

          <div>
            <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300">
              What happens after submission?
            </p>

            <p className="mt-1 text-sm leading-6 text-emerald-700/70 dark:text-emerald-400/70">
              Your idea will be submitted for administrative review. Once
              approved, it can become visible to the EcoSpark community and
              enter its funding or implementation journey.
            </p>
          </div>
        </div>

        {/* ==================================================== */}
        {/* SUBMIT */}
        {/* ==================================================== */}

        <Card className="rounded-[2rem] border-slate-200 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <CardFooter className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />

              <p className="max-w-md text-xs leading-5 text-slate-500">
                Make sure your information is accurate before submitting. Your
                idea will be reviewed by an administrator.
              </p>
            </div>

            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, formIsSubmitting]) => {
                const submitting = isSubmitting || formIsSubmitting;

                return (
                  <Button
                    form="create-idea-form"
                    type="submit"
                    disabled={!canSubmit || submitting}
                    className="h-13 w-full cursor-pointer rounded-xl bg-emerald-600 px-7 font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 sm:w-auto"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit for Review
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                );
              }}
            </form.Subscribe>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
